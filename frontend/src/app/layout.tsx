import type { Metadata, Viewport } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const lexend = Lexend({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-lexend'
})

export const metadata: Metadata = {
  title: 'MentorMe - Unlock Your Learning Potential',
  description: 'Transform your study notes into interactive flashcards and discover effortless learning techniques with MentorMe. AI-powered learning with interactive chatbot tutor and quiz generator.',
  authors: [{ name: 'MentorMe Team' }],
  keywords: ['AI', 'education', 'chatbot', 'quiz', 'learning', 'flashcards', 'study', 'smart learning', 'Next.js'],
  robots: 'index, follow',
  openGraph: {
    title: 'MentorMe - Unlock Your Learning Potential',
    description: 'Transform your study notes into interactive flashcards and discover effortless learning techniques with MentorMe.',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MentorMe - Unlock Your Learning Potential',
    description: 'Transform your study notes into interactive flashcards and discover effortless learning techniques with MentorMe.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#112022',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lexend.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#112022" />
      </head>
      <body className={`${lexend.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
} 