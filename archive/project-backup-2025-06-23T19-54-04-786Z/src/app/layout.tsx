import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'CM Kit Workflow System',
  description: 'A comprehensive development workflow framework',
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
          <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}