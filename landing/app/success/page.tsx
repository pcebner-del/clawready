import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="bg-[#050a14] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Payment confirmed!
        </h1>
        <p className="text-xl text-slate-400 mb-10">
          You&apos;re one step away from a fully running OpenClaw on Windows.
        </p>

        {/* Download box */}
        <div className="bg-[#0a1628] border border-blue-500/30 rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
            Download the installer
          </h2>
          <a
            href="/install.ps1"
            download="ClawReady-install.ps1"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-4 rounded-xl transition-colors w-full justify-center mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download ClawReady-install.ps1
          </a>
          <p className="text-slate-500 text-sm text-center">
            SHA-256 checksum will be shown after download
          </p>
        </div>

        <div className="bg-[#0a1628] border border-slate-700/50 rounded-2xl p-8 mb-8 text-left">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">2</span>
            Run it in PowerShell as Administrator
          </h2>
          <div className="bg-[#050a14] rounded-xl p-4 font-mono text-sm">
            <p className="text-slate-500 mb-1"># Right-click PowerShell &rarr; &quot;Run as Administrator&quot;, then:</p>
            <p className="text-blue-300">Set-ExecutionPolicy Bypass -Scope Process -Force</p>
            <p className="text-green-300">.\ClawReady-install.ps1</p>
          </div>
        </div>

        <div className="bg-[#0a1628] border border-slate-700/50 rounded-2xl p-8 text-left">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
            Follow the setup wizard
          </h2>
          <p className="text-slate-400">
            The installer will open a browser-based wizard to enter your Anthropic API key,
            configure Telegram, and name your agent. Everything else is automatic.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
