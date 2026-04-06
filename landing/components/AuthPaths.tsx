'use client'

export default function AuthPaths() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-3">Getting started with Claude</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            You'll need an Anthropic API key
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Free to set up. Takes 2 minutes. You pay Claude directly.
          </p>
        </div>

        <div className="bg-gradient-to-b from-[#0d1e3a] to-[#0a1628] rounded-2xl border border-blue-500/30 p-8 max-w-2xl mx-auto">
          <ol className="space-y-5">
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0 mt-0.5">
                1
              </span>
              <div>
                <p className="text-white font-medium mb-0.5">Go to console.anthropic.com and sign up</p>
                <p className="text-slate-400 text-sm">Creating an account is free — no credit card required to get started.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0 mt-0.5">
                2
              </span>
              <div>
                <p className="text-white font-medium mb-0.5">Create an API key under "API Keys"</p>
                <p className="text-slate-400 text-sm">It'll look like <code className="bg-[#050a14] border border-blue-500/20 rounded px-1.5 py-0.5 text-blue-300 font-mono text-xs">sk-ant-api03-...</code></p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0 mt-0.5">
                3
              </span>
              <div>
                <p className="text-white font-medium mb-0.5">Paste it into the ClawReady setup wizard</p>
                <p className="text-slate-400 text-sm">The installer walks you through exactly where to put it.</p>
              </div>
            </li>
          </ol>

          <p className="text-slate-500 text-xs mt-8 pt-6 border-t border-slate-800 leading-relaxed">
            Typical usage costs $5–20/month depending on how much you chat with your agent. You're billed directly by Anthropic — no markup.
          </p>
        </div>
      </div>
    </section>
  )
}
