'use client'

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
                <span className="text-6xl font-extrabold text-white">$29</span>
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
                href="https://buy.stripe.com/test_clawready"
                className="block w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl text-center transition-all duration-200 glow-blue-sm"
              >
                Get ClawReady — $29
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
                a: 'No. You only need to right-click PowerShell and run as Administrator. The script handles everything else.',
              },
              {
                q: 'What Windows versions are supported?',
                a: 'Windows 10 version 2004 (May 2020 Update) or newer, and all versions of Windows 11. WSL2 requires these minimum versions.',
              },
              {
                q: 'What if something goes wrong?',
                a: 'The installer checks each step before proceeding and tells you exactly what failed. It\'s idempotent — you can run it again safely.',
              },
              {
                q: 'Do I still need an Anthropic API key?',
                a: 'Yes — OpenClaw uses the Claude API to power your AI agent. The setup wizard helps you enter your key, but you need to get one from console.anthropic.com first.',
              },
              {
                q: 'Is this affiliated with Anthropic?',
                a: 'No. ClawReady is an independent tool that automates the OpenClaw installation process on Windows. OpenClaw is a separate open-source project.',
              },
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-800 pb-6">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
