'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-40 sm:hidden
        bg-[#0d1e3a] border border-blue-500/30 text-blue-300
        text-xs font-semibold px-3 py-2 rounded-full shadow-lg
        hover:bg-blue-600/20 transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      ↑ Top
    </button>
  )
}
