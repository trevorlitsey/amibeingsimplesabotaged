import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { getFullManualText } from "./manual";

const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });

// Cross-region inference profile for Llama 3.3 70B (Bedrock requires this prefix for on-demand)
const MODEL_ID = "us.meta.llama3-3-70b-instruct-v1:0";

const SYSTEM_PROMPT = `You are an expert analyst of workplace dysfunction. Your job is to analyze a user's description of their workplace or life situation and determine whether any of the tactics from the OSS Simple Sabotage Field Manual are being used — intentionally or unintentionally.

Here is the full text of the relevant sections of the manual:

${getFullManualText()}

## Your Task

When the user describes their situation:

1. Carefully analyze their description against EVERY tactic in the manual above.
2. Identify any matching tactics, even partial matches.
3. For each match, explain WHY it matches using specific details from the user's description.
4. Be conversational, slightly humorous, and empathetic. This should feel like talking to a knowledgeable friend, not reading a government report.

## Response Format

You MUST respond with valid JSON in this exact format:

{
  "isMatch": true/false,
  "summary": "A 1-2 sentence overall assessment. Be direct and a bit witty.",
  "sections": [
    {
      "title": "Short descriptive title of the tactic",
      "manualQuote": "The exact or near-exact quote from the manual"
    }
  ]
}

If there are NO matches, return:
{
  "isMatch": false,
  "summary": "A friendly 'all clear' message. Be reassuring but still fun.",
  "sections": []
}

Important:
- Only return valid JSON. No markdown, no code fences, no extra text.
- Rank matches by relevance (most relevant first).
- Limit to the top 5 most relevant matches.`;

const ALLOWED_ORIGINS = new Set([
  "https://amibeingsimplesabotaged.trevorlitsey.com",
  "https://amibeingsimplesabotaged.com",
  "https://www.amibeingsimplesabotaged.com",
  "http://localhost:5173",
]);

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const origin = event.headers?.origin || "";
  const corsOrigin = ALLOWED_ORIGINS.has(origin)
    ? origin
    : "https://amibeingsimplesabotaged.trevorlitsey.com";

  const corsHeaders = {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.requestContext.http.method === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }

  if (event.requestContext.http.method !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const situation = body.situation;

    if (
      !situation ||
      typeof situation !== "string" ||
      situation.trim().length === 0
    ) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Please provide a situation to analyze.",
        }),
      };
    }

    if (situation.length > 10000) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Situation description is too long. Please keep it under 10,000 characters.",
        }),
      };
    }

    // Llama 3 chat template
    const prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>

${SYSTEM_PROMPT}<|eot_id|><|start_header_id|>user<|end_header_id|>

Here's my situation:

${situation}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

`;

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt,
        max_gen_len: 2048,
        temperature: 0.5,
        top_p: 0.9,
      }),
    });

    const response = await bedrock.send(command);
    const payload = JSON.parse(new TextDecoder().decode(response.body));
    const rawGeneration: string = payload.generation ?? "";

    // Strip markdown code fences if present, then parse JSON
    let rawText = rawGeneration.trim();
    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }
    // Llama may include trailing prose after the JSON — try to extract the JSON object
    const firstBrace = rawText.indexOf("{");
    const lastBrace = rawText.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      rawText = rawText.slice(firstBrace, lastBrace + 1);
    }
    const analysis = JSON.parse(rawText);

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analysis),
    };
  } catch (error) {
    console.error("Error:", error);

    const isParseError = error instanceof SyntaxError;
    return {
      statusCode: isParseError ? 502 : 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: isParseError
          ? "Failed to parse AI response. Please try again."
          : "Something went wrong. Please try again.",
      }),
    };
  }
}
