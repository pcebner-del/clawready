'use client'

import { useState } from 'react'

const included = [
  'ClawReady-install.ps1 installer script',
  'WSL2 auto-enable & Ubuntu setup',
  'Node.js LTS via nvm (inside WSL2)',
  'OpenClaw global install & verification',
  'systemd service configuration',
  'Task Scheduler boot auto-start',
  'Sleep prevention power settings',
  'Windows Update hardening',
  'Browser-based setup wizard',
  'Anthropic API key configuration',
  'Telegram bot setup assistant',
  'Agent name & personality quick setup',
]

function RestartCommand() {
  const [copied, setCopied] = useState(false)
  const cmd = 'wsl -d Ubuntu -e bash -c "sudo systemctl restart openclaw"'

  const copy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-[#050a14] border border-yellow-500/15 rounded-lg p-3 mb-4">
      <p className="text-slate-500 text-xs mb-1 font-mono">PowerShell restart command:</p>
      <div className="flex items-center gap-2">
        <code className="text-yellow-300 font-mono text-xs break-all flex-1">
          wsl -d Ubuntu -e bash -c &quot;sudo systemctl restart openclaw&quot;
        </code>
        <button
          onClick={copy}
          aria-label="Copy command"
          title={copied ? 'Copied!' : 'Copy to clipboard'}
          className="flex-shrink-0 text-slate-400 hover:text-yellow-300 transition-colors duration-150 p-1 rounded"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-3">Simple pricing</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            One price. Everything included.
          </h2>
          <p className="text-xl text-slate-400">
            No subscription. No upsells. You own it.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Pricing card */}
          <div className="bg-gradient-to-b from-[#0d1e3a] to-[#0a1628] rounded-3xl border border-blue-500/30 overflow-hidden glow-blue">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 border-b border-blue-500/10">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-6xl font-extrabold text-white">$19</span>
                <span className="text-slate-400 pb-2">one-time</span>
              </div>
              <p className="text-slate-400">
                Get OpenClaw running on Windows — permanently. No recurring fees ever.
              </p>
            </div>

            {/* Features list */}
            <div className="px-8 py-6">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-4">Everything included</p>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <a
                href="https://buy.stripe.com/test_fZueVc44n7Dv3VP6j31RC01"
                className="block w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl text-center transition-all duration-200 glow-blue-sm"
              >
                Get ClawReady — $19
              </a>
              <p className="text-center text-slate-600 text-xs mt-3">
                Secure checkout via Stripe. Instant download after payment.
              </p>
            </div>
          </div>

          {/* Reassurance */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { icon: '🔒', text: 'Stripe\nsecure checkout' },
              { icon: '⚡', text: 'Instant\ndownload' },
              { icon: '💻', text: 'Windows\n10 & 11' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-slate-500 text-xs whitespace-pre-line leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-10">Common questions</h3>
          <div className="space-y-6">
            {[
              {
                q: 'Do I need to know Linux or command line?',
                a: 'No. You only need to open PowerShell and paste one command. The script handles everything else.',
              },
              {
                q: 'How do I open PowerShell?',
                a: null,
                custom: (
                  <div className="text-slate-400 text-sm leading-relaxed space-y-2">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Press the <span className="text-white font-medium">Windows key</span></li>
                      <li>Type <span className="text-white font-medium">PowerShell</span></li>
                      <li>Click <span className="text-white font-medium">Windows PowerShell</span> and press Enter</li>
                      <li>Paste the install command when prompted</li>
                    </ol>
                    <div className="mt-3 bg-[#050a14] border border-blue-500/20 rounded-lg p-3">
                      <p className="text-slate-500 text-xs mb-1">Paste this command:</p>
                      <code className="text-blue-300 font-mono text-xs break-all">
                        irm clawreadyapp.com/install.ps1 | iex
                      </code>
                    </div>
                  </div>
                ),
              },
              {
                q: 'What Windows versions are supported?',
                a: null,
                custom: (
                  <div className="text-slate-400 text-sm leading-relaxed space-y-2">
                    <p>Windows 10 version 2004 (May 2020 Update) or newer, and all versions of Windows 11.</p>
                    <p>
                      <span className="text-slate-300 font-medium">To check your version:</span> Press{' '}
                      <span className="text-white">Windows key + R</span>, type{' '}
                      <code className="bg-[#050a14] border border-blue-500/20 rounded px-1.5 py-0.5 text-blue-300 font-mono">winver</code>
                      , press Enter. If you&apos;re on an older version, visit{' '}
                      <span className="text-blue-400">Windows Update</span> to upgrade.
                    </p>
                  </div>
                ),
              },
              {
                q: 'How much disk space do I need?',
                a: 'ClawReady installs Ubuntu via WSL2, which requires 2–4 GB of disk space. We recommend having at least 5 GB free to be safe before running the installer.',
              },
              {
                q: 'Do I need to download Claude Code separately?',
                a: 'No — you do NOT need to download Claude Code separately. ClawReady handles everything, including Claude Code installation.',
              },
              {
                q: 'What if something goes wrong during install?',
                a: 'The installer checks each step before proceeding and tells you exactly what failed. It\'s idempotent — you can run it again safely. Loki (the chat widget below) can also help troubleshoot.',
              },
              {
                q: 'Do I still need an Anthropic API key?',
                a: 'Only if you don\'t have a Claude Pro or Max subscription. If you do, run "claude setup-token" during setup and use your existing account at no extra cost. If not, get an API key at console.anthropic.com — typical usage runs $5–20/month.',
              },
              {
                q: 'Is this affiliated with Anthropic?',
                a: 'No. ClawReady is an independent tool that automates the OpenClaw installation process on Windows. OpenClaw is a separate open-source project.',
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-800 pb-6">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                {faq.custom ? faq.custom : (
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-[#0d1e3a] to-[#0a1628] rounded-2xl border border-yellow-500/20 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-lg mb-2">What if my agent stops responding?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  The OpenClaw service may have stopped. Open PowerShell and run this command to restart it:
                </p>
                <RestartCommand />
                <p className="text-slate-500 text-xs">
                  Loki (the chat widget in the bottom-right) can also walk you through troubleshooting step by step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
