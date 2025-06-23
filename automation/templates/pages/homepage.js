// src/app/page.tsx template
'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  const [showToast, setShowToast] = useState(false);

  const showStartBuildingCommand = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 8000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Welcome to Your Project</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            You&apos;re ready to start building. This is your clean canvas - add your components, pages, and features here.
          </p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Getting Started</h2>
            <p className="text-sm text-gray-600">
              Start by creating your first component or page. The CM Kit Workflow System is ready to help you build efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" onClick={showStartBuildingCommand}>
                🚀 Start Building
              </Button>
              <a href="/admin/demo" className="flex-1">
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </a>
            </div>
          </div>
        </Card>
        
        <div className="text-sm text-gray-500 space-y-2">
          <p>💡 Tip: Use the CLI tools in the <code className="bg-gray-100 px-1 rounded">utils/</code> directory</p>
          <p>📁 Your components are in <code className="bg-gray-100 px-1 rounded">src/components/</code></p>
          <p>🎨 Styling is set up with Tailwind CSS</p>
        </div>
      </div>

      {/* Command Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-lg max-w-md z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-medium text-blue-900 mb-2">🚀 Ready to Start Building?</h3>
              <p className="text-sm text-blue-800 mb-3">
                To remove all demo content and documentation, run this command:
              </p>
              <div className="bg-blue-100 rounded p-3 mb-4">
                <code className="text-sm text-blue-900 break-all">node utils/cli.js remove-demo</code>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                ⚠️ This will remove demo pages, sample content, and documentation. Your core project structure will remain intact.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard('node utils/cli.js remove-demo')}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Copy Command
                </button>
                <button
                  onClick={() => setShowToast(false)}
                  className="text-sm bg-blue-200 text-blue-800 px-3 py-1 rounded hover:bg-blue-300 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 