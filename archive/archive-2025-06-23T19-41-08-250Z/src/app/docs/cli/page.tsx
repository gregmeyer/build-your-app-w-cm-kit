import Link from 'next/link';

export default function CLIDocs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CLI Reference</h1>
          <p className="text-xl text-gray-600">
            Complete command-line interface documentation for CM Kit
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Commands</h2>
          <p className="text-gray-600 mb-6">
            Run <code className="bg-gray-100 px-2 py-1 rounded">node utils/cli.js --help</code> to see all available commands.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Session Management</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js session-start</div>
                    <div className="mt-1">🚀 Start a new development session</div>
                    <div className="text-gray-500 text-xs mt-1">Validates project structure and logs session start</div>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js session-wrapup</div>
                    <div className="mt-1">✅ End session and log progress</div>
                    <div className="text-gray-500 text-xs mt-1">Creates session log and generates status report</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">PRD Management</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js create-prd &quot;Feature Title&quot; --template=&quot;feature&quot;</div>
                    <div className="mt-1">📋 Create a new Product Requirements Document</div>
                    <div className="text-gray-500 text-xs mt-1">Templates: feature, bug, enhancement, research</div>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js list-prds</div>
                    <div className="mt-1">📚 List all PRDs with status</div>
                    <div className="text-gray-500 text-xs mt-1">Shows creation date, status, and template type</div>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js generate-stories --prd=&quot;PRD-001&quot;</div>
                    <div className="mt-1">📖 Generate user stories from PRD</div>
                    <div className="text-gray-500 text-xs mt-1">Creates stories/ directory with structured stories</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Management</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js list-tickets</div>
                    <div className="mt-1">🎫 View all current tickets</div>
                    <div className="text-gray-500 text-xs mt-1">Shows status, priority, and assignee</div>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js status-report --format=&quot;markdown&quot;</div>
                    <div className="mt-1">📊 Generate comprehensive progress report</div>
                    <div className="text-gray-500 text-xs mt-1">Formats: markdown, json, console</div>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js list-stories</div>
                    <div className="mt-1">📝 View all user stories</div>
                    <div className="text-gray-500 text-xs mt-1">Shows story points, status, and dependencies</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Maintenance</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js remove-demo</div>
                    <div className="mt-1">🧹 Remove demo files and sample content</div>
                    <div className="text-gray-500 text-xs mt-1">Preserves documentation and core functionality</div>
                  </div>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ node utils/cli.js reset-project</div>
                    <div className="mt-1">🔄 Reset project to clean state</div>
                    <div className="text-gray-500 text-xs mt-1">Removes all sample content and resets structure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Command Options & Flags</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Global Options</h3>
              <div className="bg-gray-50 rounded p-4">
                <code className="text-sm text-gray-800">
                  --help, -h          Show help information<br/>
                  --verbose, -v       Enable verbose output<br/>
                  --quiet, -q         Suppress output<br/>
                  --format=&lt;type&gt;    Output format (markdown, json, console)
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Session Options</h3>
              <div className="bg-gray-50 rounded p-4">
                <code className="text-sm text-gray-800">
                  --project=&lt;name&gt;   Project name for session<br/>
                  --description=&lt;text&gt; Session description<br/>
                  --tags=&lt;tags&gt;      Comma-separated tags
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">PRD Options</h3>
              <div className="bg-gray-50 rounded p-4">
                <code className="text-sm text-gray-800">
                  --template=&lt;type&gt;   Template type (feature, bug, enhancement)<br/>
                  --priority=&lt;level&gt;  Priority (low, medium, high, critical)<br/>
                  --assignee=&lt;name&gt;   Assign to team member
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usage Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Starting a Development Session</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Start a new session with project context</div>
                <div className="mt-2">$ node utils/cli.js session-start --project=&quot;User Authentication&quot; --description=&quot;Implementing OAuth flow&quot;</div>
                <div className="text-gray-500 text-xs mt-1">✅ Session started: User Authentication (2024-01-15 10:30:00)</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Creating a Feature PRD</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Create a new feature PRD</div>
                <div className="mt-2">$ node utils/cli.js create-prd &quot;User Dashboard&quot; --template=&quot;feature&quot; --priority=&quot;high&quot;</div>
                <div className="text-gray-500 text-xs mt-1">✅ Created: docs/prd/active/PRD-002-user-dashboard.md</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Status Report</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Generate a markdown status report</div>
                <div className="mt-2">$ node utils/cli.js status-report --format=&quot;markdown&quot; --output=&quot;status.md&quot;</div>
                <div className="text-gray-500 text-xs mt-1">✅ Report generated: status.md</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">💡 Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Workflow Best Practices</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Always start sessions with <code className="bg-yellow-100 px-1 rounded">session-start</code></li>
                <li>• Use descriptive project names and descriptions</li>
                <li>• Generate status reports before ending sessions</li>
                <li>• Keep PRDs updated as requirements evolve</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Command Efficiency</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Use <code className="bg-yellow-100 px-1 rounded">--help</code> for detailed command info</li>
                <li>• Combine flags for faster execution</li>
                <li>• Use quotes around names with spaces</li>
                <li>• Check the workflow guide for advanced patterns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">🔗 Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/workflow" className="block p-3 bg-white rounded border border-blue-200 hover:border-blue-400 transition-colors">
              <div className="font-medium text-blue-900">🔄 Workflow Guide</div>
              <div className="text-sm text-blue-700">Development process and best practices</div>
            </Link>
            <Link href="/docs/api" className="block p-3 bg-white rounded border border-blue-200 hover:border-blue-400 transition-colors">
              <div className="font-medium text-blue-900">🔌 API Documentation</div>
              <div className="text-sm text-blue-700">Programmatic CLI usage</div>
            </Link>
            <Link href="/docs/components" className="block p-3 bg-white rounded border border-blue-200 hover:border-blue-400 transition-colors">
              <div className="font-medium text-blue-900">🧩 Component Library</div>
              <div className="text-sm text-blue-700">UI components for your app</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}