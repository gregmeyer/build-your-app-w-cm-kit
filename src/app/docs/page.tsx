import Link from 'next/link';

export default function DocsIndex() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CM Kit Documentation</h1>
        <p className="text-xl text-gray-600">Comprehensive documentation for the CM Kit workflow system.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/docs/cli" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">CLI Reference</h3>
          <p className="text-gray-600">Command-line interface commands and usage</p>
        </Link>
        <Link href="/docs/workflow" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">🔄</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Workflow Guide</h3>
          <p className="text-gray-600">Development process and best practices</p>
        </Link>
        <Link href="/docs/components" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">🧩</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Component Library</h3>
          <p className="text-gray-600">UI components and usage examples</p>
        </Link>
        <Link href="/docs/api" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">🔌</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">API Documentation</h3>
          <p className="text-gray-600">API endpoints and integration guides</p>
        </Link>
        <div className="block p-6 bg-green-50 rounded-lg border border-green-200 shadow-sm">
          <div className="text-3xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Archive System</h3>
          <p className="text-gray-600">Project backup and configuration management</p>
          <div className="mt-3 text-sm text-green-700">
            <code className="bg-green-100 px-2 py-1 rounded">node utils/cli.js archive-config</code>
          </div>
        </div>
      </div>

      {/* License Information */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">📄 License Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">MIT License</h3>
            <p className="text-gray-600 mb-3">
              CM Kit is released under the MIT License, which is a permissive open-source license that allows you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Use the software for any purpose</li>
              <li>Modify and distribute the software</li>
              <li>Use it commercially</li>
              <li>Distribute modified versions</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
            <p className="text-sm text-gray-600">
              The only requirement is that you include the original copyright notice and license text in any copies or substantial portions of the software.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Copyright Notice:</h4>
            <p className="text-sm text-blue-800">
              Copyright (c) 2025 Greg Meyer
            </p>
            <p className="text-xs text-blue-700 mt-1">
              For the complete license text, see the LICENSE file in the project root.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}