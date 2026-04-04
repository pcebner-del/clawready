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

echo "Applying API key via openclaw onboard..."
openclaw onboard --non-interactive --accept-risk --mode local \
  --auth-choice apiKey \
  --anthropic-api-key "$APIKEY" \
  --secret-input-mode plaintext \
  --skip-skills --skip-channels --skip-daemon --skip-health --skip-ui

if [ $? -ne 0 ]; then
  echo "ERROR: openclaw onboard failed. Check your API key and try again."
  exit 1
fi

echo "Restarting gateway..."
openclaw gateway restart
sleep 3
echo ""
echo "Auth saved and gateway restarted. Try messaging your bot now!"
