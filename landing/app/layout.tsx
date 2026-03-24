import type { Metadata } from 'next'
import './globals.css'
import LokiChat from '../components/LokiChat'

export const metadata: Metadata = {
  title: 'ClawReady — OpenClaw for Windows in One Click',
  description: 'Skip the nightmare WSL2 setup. ClawReady installs OpenClaw on your Windows PC automatically — WSL2, Node.js, systemd, auto-start, everything. Done in 5 minutes.',
  keywords: ['OpenClaw', 'Windows installer', 'WSL2', 'AI agent', 'automation'],
  openGraph: {
    title: 'ClawReady — OpenClaw for Windows in One Click',
    description: 'Skip the nightmare WSL2 setup. ClawReady installs OpenClaw on Windows automatically in 5 minutes.',
    url: 'https://clawreadyapp.com',
    siteName: 'ClawReady',
    type: 'website',
  },
  metadataBase: new URL('https://clawreadyapp.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased overflow-x-hidden">{children}<LokiChat /></body>
    </html>
  )
}
