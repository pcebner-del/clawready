'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hey. Having trouble with the install? Tell me what's happening.",
}

export default function LokiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Check your connection and try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-[#1a2a4a]"
          style={{ width: 300, height: 400, background: '#050a14' }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-[#1a2a4a]"
            style={{ background: '#0a1628' }}
          >
            <span className="text-sm font-semibold text-white">Loki — Install Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#8899aa] hover:text-white transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#1d4ed8] text-white'
                      : 'bg-[#0a1628] text-[#c8d8e8] border border-[#1a2a4a]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0a1628] border border-[#1a2a4a] rounded-xl px-3 py-2 text-sm text-[#8899aa]">
                  <span className="animate-pulse">thinking…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 border-t border-[#1a2a4a]"
            style={{ background: '#0a1628' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste error or ask anything…"
              disabled={loading}
              className="flex-1 bg-[#050a14] border border-[#1a2a4a] rounded-lg px-3 py-2 text-sm text-white placeholder-[#4a5a6a] outline-none focus:border-[#3b82f6] disabled:opacity-50 transition-colors"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="bg-[#1d4ed8] hover:bg-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border border-[#1a2a4a] hover:scale-105 active:scale-95 transition-transform"
        style={{ background: '#0a1628' }}
        aria-label="Open Loki chat assistant"
      >
        🐍
      </button>
    </div>
  )
}
