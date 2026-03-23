import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Loki 🐍, the AI install assistant for ClawReady. You help Windows users install OpenClaw using the ClawReady installer. You are sharp, direct, a little mischievous, and genuinely helpful. You know everything about: WSL2, Ubuntu, Node.js, OpenClaw setup, systemd, Windows Task Scheduler, PowerShell, common install errors. Keep answers concise — users are mid-install and stressed. If they paste an error, diagnose it. Never say you cannot help.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Loki chat error:', error)
    return NextResponse.json({ reply: 'Something went wrong on my end. Try again.' }, { status: 500 })
  }
}
