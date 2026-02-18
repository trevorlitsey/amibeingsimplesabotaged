import http from "http";
import { handler } from "./handler";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", async () => {
    // Build a minimal API Gateway v2 event
    const event = {
      requestContext: {
        http: {
          method: req.method || "GET",
          path: req.url || "/",
        },
      },
      body,
      headers: req.headers as Record<string, string>,
    } as unknown as APIGatewayProxyEventV2;

    const result = await handler(event);
    const statusCode = typeof result === "object" && "statusCode" in result ? result.statusCode : 200;
    const headers = (typeof result === "object" && "headers" in result ? result.headers : {}) as Record<string, string>;
    const responseBody = typeof result === "object" && "body" in result ? result.body : "";

    res.writeHead(statusCode as number, headers);
    res.end(responseBody);
  });
});

server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
