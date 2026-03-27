'use client'

import Link from 'next/link'
import { useState } from 'react'

const INSTALL_COMMAND = `Set-ExecutionPolicy Bypass -Scope Process -Force; cd "$HOME\\Downloads"; .\\ClawReady-install.ps1`

export default function SuccessPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

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
          You&apos;re in. Let&apos;s get you set up.
        </h1>
        <p className="text-xl text-slate-400 mb-10">
          Three steps. Under 5 minutes.
        </p>

        {/* Step 1 — Download */}
        <div className="bg-[#0a1628] border border-blue-500/30 rounded-2xl p-8 mb-6 text-left">
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">1</span>
            Download the installer
          </h2>
          <p className="text-slate-400 text-sm mb-5">Click the button below. The file will land in your Downloads folder.</p>
          <a
            href="/install.ps1"
            download="ClawReady-install.ps1"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-4 rounded-xl transition-colors w-full justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download ClawReady-install.ps1
          </a>
        </div>

        {/* Step 2 — Run */}
        <div className="bg-[#0a1628] border border-slate-700/50 rounded-2xl p-8 mb-6 text-left">
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">2</span>
            Open PowerShell and run the installer
          </h2>

          <ol className="text-slate-400 text-sm space-y-2 mb-5 list-none">
            <li className="flex gap-2"><span className="text-blue-400 font-bold">a.</span> Press the <kbd className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">Windows</kbd> key, type <strong className="text-white">PowerShell</strong></li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">b.</span> Right-click <strong className="text-white">Windows PowerShell</strong> → click <strong className="text-white">&ldquo;Run as Administrator&rdquo;</strong></li>
            <li className="flex gap-2"><span className="text-blue-400 font-bold">c.</span> Copy the command below, paste it into PowerShell, and hit <kbd className="bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">Enter</kbd></li>
          </ol>

          {/* Command + copy button */}
          <div className="bg-[#050a14] border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50">
              <span className="text-slate-500 text-xs font-mono">PowerShell command</span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  copied
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="px-4 py-4 font-mono text-sm text-green-300 break-all">
              {INSTALL_COMMAND}
            </div>
          </div>
        </div>

        {/* Step 3 — Wizard */}
        <div className="bg-[#0a1628] border border-slate-700/50 rounded-2xl p-8 text-left">
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
            Follow the setup wizard
          </h2>
          <p className="text-slate-400 text-sm">
            A setup wizard will open in your browser. It will walk you through entering your Anthropic API key,
            connecting Telegram, and naming your AI agent. Everything else is automatic.
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
