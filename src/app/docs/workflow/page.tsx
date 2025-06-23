import Link from 'next/link';

export default function WorkflowDocs() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workflow Guide</h1>
          <p className="text-xl text-gray-600">
            Comprehensive development workflow and best practices for CM Kit projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Development Workflow</h2>
            <p className="text-gray-600 mb-6">
              The complete development process from concept to completion.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Session Start</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mt-2">
                    <div className="text-gray-400">$ node utils/cli.js session-start --project=&quot;Feature Name&quot;</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Initialize development session with project context and validation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Create PRD</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mt-2">
                    <div className="text-gray-400">$ node utils/cli.js create-prd &quot;Feature Title&quot; --template=&quot;feature&quot;</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Define product requirements and specifications with structured templates
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Generate Stories</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mt-2">
                    <div className="text-gray-400">$ node utils/cli.js generate-stories --prd=&quot;PRD-001&quot;</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Create user stories from PRD specifications with acceptance criteria
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">4</div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Create Tickets</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mt-2">
                    <div className="text-gray-400">$ node utils/cli.js create-ticket &quot;Ticket Title&quot; --type=&quot;feature&quot;</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Convert stories into development tickets with proper categorization
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Management</h2>
            <p className="text-gray-600 mb-6">
              Tools and processes for effective project management.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Status Tracking</h3>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js status-report --format=&quot;markdown&quot;</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Generate comprehensive project status reports with metrics and progress
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ticket Management</h3>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js list-tickets --status=&quot;open&quot;</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  View and manage development tickets with filtering and sorting
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Session Wrap-up</h3>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js session-wrapup --summary=&quot;Session summary&quot;</div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Document session progress and plan next steps with automatic logging
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Workflow Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Planning Phase</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Create PRD with clear requirements</li>
                <li>• Define acceptance criteria</li>
                <li>• Estimate story points</li>
                <li>• Identify dependencies</li>
                <li>• Set priorities and deadlines</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Development Phase</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Start development sessions</li>
                <li>• Implement features iteratively</li>
                <li>• Write tests for functionality</li>
                <li>• Update ticket status</li>
                <li>• Document code changes</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Review Phase</h3>
              </div>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Code review and testing</li>
                <li>• Validate against requirements</li>
                <li>• Update documentation</li>
                <li>• Generate status reports</li>
                <li>• Plan next iteration</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Documentation</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Write clear, concise PRDs with measurable outcomes
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use consistent naming conventions across all files
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Include acceptance criteria for every story
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Document technical decisions and architecture choices
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Keep documentation updated as requirements evolve
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Development</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Follow the established workflow consistently
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Create small, focused tickets that can be completed in one session
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Test thoroughly before marking tickets as complete
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Update ticket status regularly throughout development
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use session logging to track progress and decisions
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">🔄 Workflow Automation</h2>
          <p className="text-blue-800 mb-4">
            Automate your workflow with these advanced techniques:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-900 mb-2">CLI Aliases</h3>
              <div className="bg-blue-100 rounded p-3">
                <code className="text-sm text-blue-900">
                  alias cm-start=&quot;node utils/cli.js session-start&quot;<br/>
                  alias cm-prd=&quot;node utils/cli.js create-prd&quot;<br/>
                  alias cm-status=&quot;node utils/cli.js status-report&quot;
                </code>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-2">IDE Integration</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Set up VS Code tasks for common commands</li>
                <li>• Create keyboard shortcuts for workflow steps</li>
                <li>• Use terminal integration for quick access</li>
                <li>• Configure auto-completion for CLI commands</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-900 mb-2">✅ Quality Assurance</h2>
          <p className="text-green-800 mb-4">
            Ensure quality throughout the development process:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-green-900 mb-2">Validation Steps</h3>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• Review PRDs before implementation begins</li>
                <li>• Validate user stories against requirements</li>
                <li>• Test all functionality thoroughly</li>
                <li>• Document changes and decisions</li>
                <li>• Get feedback early and often</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-2">Continuous Improvement</h3>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• Regular retrospectives on workflow effectiveness</li>
                <li>• Update templates based on project learnings</li>
                <li>• Refine CLI commands for better efficiency</li>
                <li>• Share best practices with team members</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">💡 Workflow Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Getting Started</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Start with simple features to learn the workflow</li>
                <li>• Use the admin demo to explore all capabilities</li>
                <li>• Create your first PRD and generate stories</li>
                <li>• Practice session management with real work</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Advanced Techniques</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Customize templates for your project needs</li>
                <li>• Create custom CLI commands for specific workflows</li>
                <li>• Integrate with your existing tools and processes</li>
                <li>• Build automation scripts for repetitive tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}