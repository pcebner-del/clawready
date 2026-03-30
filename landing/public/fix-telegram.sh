#!/bin/bash
# ClawReady — Telegram config fixer
# Fixes dmPolicy and allowFrom for user 8660980566

CONFIG="$HOME/.openclaw/openclaw.json"

if [ ! -f "$CONFIG" ]; then
  echo "ERROR: Config not found at $CONFIG"
  exit 1
fi

python3 - <<'PYEOF'
import json, os

path = os.path.expanduser('~/.openclaw/openclaw.json')
d = json.load(open(path))

tg = d.setdefault('channels', {}).setdefault('telegram', {})
tg['allowFrom'] = ['8660980566']
tg['dmPolicy'] = 'allowlist'

json.dump(d, open(path, 'w'), indent=2)
print('Config updated: dmPolicy=allowlist, allowFrom=[8660980566]')
PYEOF

# Restart gateway
source ~/.nvm/nvm.sh 2>/dev/null
openclaw gateway restart
echo "Done! Try messaging your bot now."
