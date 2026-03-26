'use client'

export default function AuthPaths() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-3">How Claude access works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Pick your path — either one works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            OpenClaw runs on Claude AI. You need one of these two options — pick whichever fits you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Path A */}
          <div className="bg-gradient-to-b from-[#0d1e3a] to-[#0a1628] rounded-2xl border border-blue-500/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0">
                A
              </span>
              <h3 className="text-white font-bold text-lg leading-tight">Already pay for Claude Pro or Max?</h3>
            </div>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Use your existing subscription — no API key needed, and no extra monthly cost.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-slate-300">No API key required</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-slate-300">Zero extra monthly cost</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-slate-300">
                  During setup, just run:{' '}
                  <code className="bg-[#050a14] border border-blue-500/20 rounded px-1.5 py-0.5 text-blue-300 font-mono text-xs">
                    claude setup-token
                  </code>
                </span>
              </li>
            </ul>
          </div>

          {/* Path B */}
          <div className="bg-gradient-to-b from-[#0d1e3a] to-[#0a1628] rounded-2xl border border-slate-700/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-slate-300 font-bold text-sm flex-shrink-0">
                B
              </span>
              <h3 className="text-white font-bold text-lg leading-tight">No Claude subscription?</h3>
            </div>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Get an Anthropic API key and pay only for what you use — no subscription needed at all.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                <span className="text-slate-300">
                  Get a free key at{' '}
                  <span className="text-blue-400 font-medium">console.anthropic.com</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                <span className="text-slate-300">Typical cost: $5–20/month for normal use</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                <span className="text-slate-300">No subscription required — pay as you go</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          The ClawReady setup wizard walks you through whichever path you choose.
        </p>
      </div>
    </section>
  )
}
