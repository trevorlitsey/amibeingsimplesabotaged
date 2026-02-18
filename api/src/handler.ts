import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";
import { getFullManualText } from "./manual";

const anthropic = new AnthropicBedrock({ awsRegion: "us-east-1" });

const MODEL_ID = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";

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

export async function handler(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
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

    const message = await anthropic.messages.create({
      model: MODEL_ID,
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here's my situation:\n\n${situation}`,
        },
      ],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from Claude");
    }

    // Strip markdown code fences if present, then parse JSON
    let rawText = textContent.text.trim();
    if (rawText.startsWith("```")) {
      rawText = rawText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
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
