import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'CM Kit Workflow System',
  description: 'Build better apps faster with our complete development toolkit. From idea to deployment with proven workflows, powerful CLI tools, and Cursor-powered development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 