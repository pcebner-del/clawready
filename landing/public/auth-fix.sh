#!/bin/bash
source ~/.nvm/nvm.sh 2>/dev/null

echo ""
echo "=== ClawReady Auth Setup ==="
echo "Paste your Anthropic API key and press Enter:"
echo "(starts with sk-ant-api03-)"
read -r APIKEY

if [ -z "$APIKEY" ]; then
  echo "ERROR: No key entered."
  exit 1
fi

if [[ "$APIKEY" != sk-ant-* ]]; then
  echo "ERROR: That doesn't look like an Anthropic API key (should start with sk-ant-)"
  exit 1
fi

echo "Writing auth file..."
python3 - <<PYEOF
import json, os

apikey = """$APIKEY"""
path = os.path.expanduser("~/.openclaw/auth-profiles.json")
os.makedirs(os.path.dirname(path), exist_ok=True)

data = {
  "version": 1,
  "profiles": {
    "anthropic:manual": {
      "type": "api-key",
      "provider": "anthropic",
      "apiKey": apikey.strip()
    }
  }
}

json.dump(data, open(path, "w"), indent=2)
print("Auth saved to", path)
PYEOF

echo "Restarting gateway..."
openclaw gateway restart

echo ""
echo "Done! Try messaging your bot now."
