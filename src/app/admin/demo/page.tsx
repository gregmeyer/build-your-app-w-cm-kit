// src/app/admin/demo/page.tsx template
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDemo() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastCommand, setToastCommand] = useState('');

  const showInfoToast = (message, command) => {
    setToastMessage(message);
    setToastCommand(command);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          CM Kit Admin Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          This is a demonstration of the complete development toolkit. From idea to deployment with proven workflows, powerful CLI tools, and Cursor-powered development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600 mt-1">Active Tickets</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600 mt-1">Completed Stories</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600 mt-1">Development Sessions</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">15</div>
          <div className="text-sm text-gray-600 mt-1">Issues Resolved</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => showInfoToast(
              'Start a new development session using the CLI:',
              'node utils/cli.js session-start --project="Your Project Name"'
            )}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            🚀 Start Session
          </button>
          <button 
            onClick={() => showInfoToast(
              'Create a new development ticket using the CLI:',
              'node utils/cli.js create-prd "Ticket Title" --template="feature"'
            )}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            📋 Create Ticket
          </button>
          <button 
            onClick={() => showInfoToast(
              'Generate a status report using the CLI:',
              'node utils/cli.js status-report --format=markdown'
            )}
            className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            📊 Status Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
        <p className="text-gray-600 mb-4">
          Explore the comprehensive documentation for CM Kit workflow system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/docs"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Documentation Index</h3>
            <p className="text-sm text-gray-600 mt-1">Overview of all documentation</p>
          </Link>
          <Link 
            href="/docs/cli"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">CLI Reference</h3>
            <p className="text-sm text-gray-600 mt-1">Command-line interface guide</p>
          </Link>
          <Link 
            href="/docs/workflow"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Workflow Guide</h3>
            <p className="text-sm text-gray-600 mt-1">Development process steps</p>
          </Link>
          <Link 
            href="/docs/components"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="text-2xl mb-2">🧩</div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Component Library</h3>
            <p className="text-sm text-gray-600 mt-1">UI components and usage</p>
          </Link>
        </div>
        <div className="mt-4">
          <Link 
            href="/docs/api"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            🔌 API Documentation
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Info Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-md z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-blue-800 mb-2">{toastMessage}</p>
              <div className="bg-blue-100 rounded p-2 mb-3">
                <code className="text-xs text-blue-900 break-all">{toastCommand}</code>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(toastCommand)}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Copy Command
                </button>
                <button
                  onClick={() => setShowToast(false)}
                  className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300 transition-colors"
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