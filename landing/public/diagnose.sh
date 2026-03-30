#!/bin/bash
source ~/.nvm/nvm.sh 2>/dev/null

echo "=== GATEWAY STATUS ==="
openclaw gateway status

echo ""
echo "=== AUTH CHECK ==="
if [ -f ~/.openclaw/auth-profiles.json ]; then
  cat ~/.openclaw/auth-profiles.json
else
  echo "No auth-profiles.json found!"
fi

echo ""
echo "=== TELEGRAM CONFIG ==="
python3 -c "
import json, os
d = json.load(open(os.path.expanduser('~/.openclaw/openclaw.json')))
tg = d.get('channels', {}).get('telegram', {})
print('botToken:', tg.get('botToken', 'MISSING')[:20] + '...' if tg.get('botToken') else 'MISSING')
print('enabled:', tg.get('enabled', 'MISSING'))
print('dmPolicy:', tg.get('dmPolicy', 'MISSING'))
print('allowFrom:', tg.get('allowFrom', 'MISSING'))
"

echo ""
echo "=== GATEWAY PROCESS ==="
ps aux | grep openclaw | grep -v grep || echo "No openclaw process found"
