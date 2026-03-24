'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lines = [
      { text: '> Checking Windows version...', delay: 400, color: 'text-slate-400' },
      { text: '  [OK] Windows 11 22H2 detected', delay: 900, color: 'text-green-400' },
      { text: '> Enabling WSL2...', delay: 1400, color: 'text-slate-400' },
      { text: '  [OK] WSL2 enabled and configured', delay: 2100, color: 'text-green-400' },
      { text: '> Installing Ubuntu 22.04...', delay: 2600, color: 'text-slate-400' },
      { text: '  [OK] Ubuntu ready', delay: 3400, color: 'text-green-400' },
      { text: '> Installing Node.js LTS...', delay: 3900, color: 'text-slate-400' },
      { text: '  [OK] Node v20.11.0 installed', delay: 4700, color: 'text-green-400' },
      { text: '> Installing OpenClaw...', delay: 5200, color: 'text-slate-400' },
      { text: '  [OK] openclaw@latest installed', delay: 6200, color: 'text-green-400' },
      { text: '> Configuring auto-start...', delay: 6700, color: 'text-slate-400' },
      { text: '  [OK] Task Scheduler configured', delay: 7300, color: 'text-green-400' },
      { text: '> Preventing sleep mode...', delay: 7800, color: 'text-slate-400' },
      { text: '  [OK] Power settings updated', delay: 8300, color: 'text-green-400' },
      { text: '', delay: 8800, color: '' },
      { text: '  ClawReady! OpenClaw is running.', delay: 9200, color: 'text-blue-300 font-semibold' },
    ]

    let timeouts: ReturnType<typeof setTimeout>[] = []

    lines.forEach(({ text, delay, color }) => {
      const t = setTimeout(() => {
        if (!terminalRef.current) return
        const line = document.createElement('div')
        line.className = `terminal-text text-sm ${color} leading-6`
        line.textContent = text
        terminalRef.current.appendChild(line)
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }, delay)
      timeouts.push(t)
    })

    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-x-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Windows-ready installer for OpenClaw</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 break-words">
              Get{' '}
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                OpenClaw
              </span>{' '}
              running on Windows{' '}
              <span className="text-white">in 5 minutes.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 break-words">
              ClawReady automates the entire WSL2 setup — so you skip the nightmare and go straight
              to having an AI agent running 24/7 on your PC.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 glow-blue"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h8l-2 8 10-12h-8z" />
                </svg>
                Get ClawReady — $29
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg"
              >
                See how it works
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                One-time payment
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No subscription
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Windows 10/11
              </span>
            </div>
          </div>

          {/* Right: Terminal animation */}
          <div className="relative w-full min-w-0 overflow-hidden">
            <div className="bg-[#0a1628] rounded-2xl border border-blue-500/20 overflow-hidden shadow-2xl glow-blue">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0f2040] border-b border-blue-500/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-slate-500 text-xs terminal-text">ClawReady-install.ps1</span>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="p-6 h-80 overflow-y-auto"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="terminal-text text-sm text-blue-300 mb-2">ClawReady v1.0 — OpenClaw Windows Installer</div>
                <div className="terminal-text text-sm text-slate-600 mb-4">─────────────────────────────────────────</div>
              </div>
            </div>

            {/* Decorative blur */}
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
