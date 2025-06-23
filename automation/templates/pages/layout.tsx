import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'CM Kit Workflow System',
  description: 'A comprehensive development workflow system for building scalable applications',
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
          <nav className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-bold text-gray-900">☕ CM Kit</h1>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 