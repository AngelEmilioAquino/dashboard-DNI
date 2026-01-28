import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DNI Dashboard - Prueba tecnica',
  description: 'Panel de control para gestionar ventas y clientes',
  icons: {
    icon: [
      {
        url: 'public/logoNew.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'public/logoNew.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'public/logoNew.png',
        type: 'image/svg+xml',
      },
    ],
    apple: 'public/logoNew.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
