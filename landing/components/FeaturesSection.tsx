const features = [
  {
    title: 'WSL2 auto-configuration',
    description:
      'Detects if WSL2 is installed. If not, enables it via DISM, installs Ubuntu 22.04, and configures everything — including systemd support.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    tag: 'Core',
  },
  {
    title: 'Node.js via nvm',
    description:
      'Installs nvm inside WSL2, then installs the latest Node.js LTS. No version conflicts, no PATH headaches. Just works.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    tag: 'Core',
  },
  {
    title: 'OpenClaw global install',
    description:
      'Runs `npm install -g openclaw` inside WSL2 with correct permissions. Verified with a health check before proceeding.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    tag: 'Core',
  },
  {
    title: 'Windows boot auto-start',
    description:
      'Creates a Task Scheduler job that launches OpenClaw inside WSL2 every time Windows boots — no manual intervention needed.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    tag: 'Auto-start',
  },
  {
    title: 'Sleep prevention',
    description:
      'Configures Windows power settings to keep your PC awake. Your AI agent stays online 24/7, not just when you\'re at your desk.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    tag: 'Always-on',
  },
  {
    title: 'Telegram bot wizard',
    description:
      'A browser-based setup wizard walks you through creating a Telegram bot and connecting it to OpenClaw — no manual config files.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    tag: 'Setup wizard',
  },
  {
    title: 'Anthropic API key entry',
    description:
      'Securely enter your API key through the local setup wizard. Stored in OpenClaw\'s config — never sent anywhere else.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    tag: 'Setup wizard',
  },
  {
    title: 'Windows Update hardening',
    description:
      'Disables active hours interference so Windows Update doesn\'t restart your machine mid-task while your agent is working.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    tag: 'Stability',
  },
]

const tagColors: Record<string, string> = {
  'Core': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Auto-start': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Always-on': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Setup wizard': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Stability': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-b from-[#050a14] to-[#080f22]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-3">What ClawReady handles</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything. Automatically.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Every step that trips people up during a manual install is handled by the script — silently and correctly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-[#0a1628] border border-slate-800 hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 group hover:bg-[#0d1e3a]"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/15 flex items-center justify-center text-blue-400 mb-4 transition-colors">
                {feature.icon}
              </div>

              {/* Tag */}
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-3 ${tagColors[feature.tag]}`}>
                {feature.tag}
              </span>

              <h3 className="text-white font-semibold mb-2 leading-tight">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
