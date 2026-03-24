'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#050a14]/95 backdrop-blur-md border-b border-blue-500/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 -rotate-45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="rocketGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <path d="M12 2C12 2 7 7 7 13c0 2.5 1 4.5 2.5 6L12 22l2.5-3C16 17.5 17 15.5 17 13c0-6-5-11-5-11z" fill="url(#rocketGrad)" />
              <circle cx="12" cy="12" r="2" fill="#050a14" />
              <path d="M9 15.5C7.5 16.5 6 18 5.5 20c1.5 0 3.5-.5 5-2" fill="#3b82f6" opacity="0.7" />
              <path d="M15 15.5C16.5 16.5 18 18 18.5 20c-1.5 0-3.5-.5-5-2" fill="#3b82f6" opacity="0.7" />
            </svg>
            <span className="font-bold text-white text-lg tracking-tight">ClawReady</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">How it works</a>
            <a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</a>
          </div>

          {/* CTA */}
          <a
            href="#pricing"
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors glow-blue-sm"
          >
            Get ClawReady — $29
          </a>
        </div>
      </div>
    </nav>
  )
}
