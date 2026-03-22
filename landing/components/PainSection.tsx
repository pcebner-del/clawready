const beforeSteps = [
  'Enable Hyper-V in BIOS (pray it\'s not greyed out)',
  'Run obscure DISM commands and reboot twice',
  'Figure out why WSL won\'t install from the Store',
  'Manually configure /etc/wsl.conf for systemd',
  'Install nvm, then node, then deal with PATH issues',
  'npm install -g openclaw → permission errors',
  'Create a Task Scheduler job that actually works',
  'Stop Windows from sleeping every 20 minutes',
  'Debug why OpenClaw dies after a Windows Update',
  'Google the same error three times over two weeks',
  'Give up. Close the laptop. Blame Microsoft.',
]

const afterSteps = [
  'Download ClawReady-install.ps1',
  'Right-click PowerShell → Run as Administrator',
  'Run the script — watch everything configure itself',
]

export default function PainSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Installing OpenClaw on Windows is a{' '}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              nightmare.
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            The official docs assume you&apos;re a Linux sysadmin. Most people give up before they get anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-[#0a1628] rounded-2xl border border-red-500/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-red-400 font-semibold uppercase tracking-wider">Before ClawReady</p>
                <h3 className="text-white font-bold text-lg">The manual way</h3>
              </div>
            </div>

            <ul className="space-y-3">
              {beforeSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-slate-400 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-red-500/10">
              <p className="text-red-400/70 text-sm italic">Average time: 4–8 hours. Success rate: ~30%</p>
            </div>
          </div>

          {/* After */}
          <div className="bg-[#0a1628] rounded-2xl border border-blue-500/30 p-8 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">After ClawReady</p>
                <h3 className="text-white font-bold text-lg">Three steps. Done.</h3>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {afterSteps.map((step, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 text-blue-300 font-bold text-sm">
                    {i + 1}
                  </span>
                  <span className="text-white font-medium">{step}</span>
                </li>
              ))}
            </ul>

            {/* Success terminal snippet */}
            <div className="bg-[#050a14] rounded-xl p-4 border border-blue-500/10">
              <p className="terminal-text text-xs text-slate-500 mb-2"># 5 minutes later...</p>
              <p className="terminal-text text-sm text-green-400">[OK] OpenClaw is running!</p>
              <p className="terminal-text text-sm text-blue-300">Your AI agent is live at localhost:3000</p>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-500/10">
              <p className="text-blue-400/70 text-sm italic">Average time: 5 minutes. Success rate: 100%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
