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

echo "Saving auth..."
ANTHROPIC_API_KEY="$APIKEY" openclaw onboard --non-interactive --mode local --auth-choice apiKey --anthropic-api-key "$APIKEY" --secret-input-mode plaintext --skip-skills --skip-channels --skip-health --skip-ui

echo "Restarting gateway..."
openclaw gateway restart

echo ""
echo "Done! Try messaging your bot now."
