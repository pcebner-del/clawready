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

echo "Writing auth files..."
python3 - <<PYEOF
import json, os

apikey = """$APIKEY""".strip()
base = os.path.expanduser("~/.openclaw")
os.makedirs(base, exist_ok=True)

# Write auth-profiles.json
profiles_path = os.path.join(base, "auth-profiles.json")
profiles = {
  "version": 1,
  "profiles": {
    "anthropic:manual": {
      "type": "api_key",
      "provider": "anthropic",
      "apiKey": apikey
    }
  }
}
json.dump(profiles, open(profiles_path, "w"), indent=2)
print("auth-profiles.json saved")

# Update openclaw.json auth mode to api-key
config_path = os.path.join(base, "openclaw.json")
if os.path.exists(config_path):
    d = json.load(open(config_path))
    if "auth" not in d:
        d["auth"] = {}
    if "profiles" not in d["auth"]:
        d["auth"]["profiles"] = {}
    d["auth"]["profiles"]["anthropic:manual"] = {
        "provider": "anthropic",
        "mode": "api_key"
    }
    json.dump(d, open(config_path, "w"), indent=2)
    print("openclaw.json auth mode updated to api-key")
else:
    print("WARNING: openclaw.json not found")

print("All done!")
PYEOF

echo "Restarting gateway..."
openclaw gateway restart
sleep 3
echo ""
echo "Auth saved and gateway restarted. Try messaging your bot now!"
