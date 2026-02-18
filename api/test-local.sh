#!/bin/bash
lsof -ti:3001 | xargs kill -9 2>/dev/null
npx tsx src/local.ts &
SERVER_PID=$!
sleep 3
echo "--- Testing API ---"
curl -s -X POST http://localhost:3001/analyze \
  -H 'Content-Type: application/json' \
  -d '{"situation":"my boss holds meetings all day when we have deadlines"}'
echo ""
echo "--- Done ---"
kill $SERVER_PID 2>/dev/null
