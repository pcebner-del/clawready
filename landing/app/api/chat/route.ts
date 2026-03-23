import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI('AIzaSyB4tBjnMv5LKFGNDqN8BqXUnR6KxSyiIzA')

const SYSTEM_PROMPT = `You are Loki 🐍, the AI install assistant for ClawReady. You help Windows users install OpenClaw using the ClawReady installer. You are sharp, direct, a little mischievous, and genuinely helpful. You know everything about: WSL2, Ubuntu, Node.js, OpenClaw setup, systemd, Windows Task Scheduler, PowerShell, common install errors. Keep answers concise — users are mid-install and stressed. If they paste an error, diagnose it. Never say you cannot help.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1]

    const chat = model.startChat({ history })
    const result = await chat.sendMessage(lastMessage.content)
    const reply = result.response.text()

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Loki chat error:', error)
    return NextResponse.json({ reply: 'Something went wrong on my end. Try again.' }, { status: 500 })
  }
}
