export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-white">ClawReady</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#features" className="hover:text-slate-300 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a>
            <a href="https://www.trustpilot.com/review/clawreadyapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Leave a review
            </a>
            <span className="text-slate-700">|</span>
            <span>Not affiliated with Anthropic</span>
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} ClawReady
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 text-center">
          <p className="text-slate-700 text-xs max-w-2xl mx-auto">
            ClawReady is an independent product and is not affiliated with, endorsed by, or associated
            with Anthropic PBC. OpenClaw is a separate open-source project. ClawReady automates its
            installation on Windows.
          </p>
        </div>
      </div>
    </footer>
  )
}
