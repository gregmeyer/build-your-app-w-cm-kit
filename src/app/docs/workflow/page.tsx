import Link from 'next/link';

export default function WorkflowDocs() {
  const workflowSteps = [
    {
      step: 1,
      title: 'Session Start',
      description: 'Begin development with project validation',
      command: 'node utils/cli.js session-start --project="Feature Name"',
      icon: '🚀',
      details: 'Validates project structure, logs session start, and prepares development environment'
    },
    {
      step: 2,
      title: 'Pick Ticket',
      description: 'Select next ticket to work on',
      command: 'node utils/cli.js pick-ticket',
      icon: '🎫',
      details: 'Interactive ticket selection with filtering by status and priority'
    },
    {
      step: 3,
      title: 'Development',
      description: 'Implement features and functionality',
      command: 'npm run dev',
      icon: '💻',
      details: 'Start development server and begin coding features'
    },
    {
      step: 4,
      title: 'Quality Assurance',
      description: 'Run comprehensive tests and checks',
      command: 'node utils/cli.js qa-test',
      icon: '🧪',
      details: 'Runs linting, type checking, unit tests with coverage, and E2E tests'
    },
    {
      step: 5,
      title: 'Status Check',
      description: 'Check project status and progress',
      command: 'node utils/cli.js status-report',
      icon: '📊',
      details: 'Generate comprehensive project status report with metrics'
    },
    {
      step: 6,
      title: 'Session Wrap-up',
      description: 'Complete session with documentation validation',
      command: 'node utils/cli.js session-wrapup',
      icon: '🏁',
      details: 'Validates docs, runs tests, checks git status, and generates session report'
    }
  ];

  const additionalCommands = [
    {
      category: 'Reporting & Analysis',
      commands: [
        {
          name: 'sprint-report',
          description: 'Generate comprehensive sprint report with recommendations',
          command: 'node utils/cli.js sprint-report'
        },
        {
          name: 'list-stories',
          description: 'View all user stories with status and points',
          command: 'node utils/cli.js list-stories'
        },
        {
          name: 'list-issues',
          description: 'List all issues with severity and status',
          command: 'node utils/cli.js list-issues'
        }
      ]
    },
    {
      category: 'Validation & Quality',
      commands: [
        {
          name: 'validate-docs',
          description: 'Validate documentation consistency and completeness',
          command: 'node utils/cli.js validate-docs'
        },
        {
          name: 'validate-structure',
          description: 'Validate project structure and file organization',
          command: 'node utils/cli.js validate-structure'
        },
        {
          name: 'check-deps',
          description: 'Check and validate project dependencies',
          command: 'node utils/cli.js check-deps'
        }
      ]
    },
    {
      category: 'Project Management',
      commands: [
        {
          name: 'update-ticket',
          description: 'Update ticket status and information',
          command: 'node utils/cli.js update-ticket --id=TICKET-001 --status="In Progress"'
        },
        {
          name: 'pick-story',
          description: 'Pick a user story to work on',
          command: 'node utils/cli.js pick-story'
        },
        {
          name: 'archive-project',
          description: 'Archive project or specific components',
          command: 'node utils/cli.js archive-project --type=full'
        }
      ]
    }
  ];

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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">🎯 Core Development Workflow</h2>
          <p className="text-blue-800 text-sm">
            Follow this streamlined 6-step workflow to maximize productivity and maintain code quality. 
            Each step is designed to ensure consistent development practices and project health.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Development Workflow Steps</h2>
          <div className="space-y-6">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Step {step.step}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {step.description}
                  </p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mb-2">
                    <div className="text-gray-400">$ {step.command}</div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Additional Commands</h2>
            <p className="text-gray-600 mb-6">
              Powerful commands to enhance your development workflow.
            </p>
            
            <div className="space-y-6">
              {additionalCommands.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">{category.category}</h3>
                  <div className="space-y-3">
                    {category.commands.map((command, commandIndex) => (
                      <div key={commandIndex} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900">{command.name}</h4>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            CLI
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{command.description}</p>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-800">
                          {command.command}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Workflow Phases</h2>
            <div className="space-y-6">
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
                  <li>• Use <code className="bg-gray-100 px-1 rounded">session-start</code> to begin</li>
                  <li>• Pick tickets with <code className="bg-gray-100 px-1 rounded">pick-ticket</code></li>
                  <li>• Review status with <code className="bg-gray-100 px-1 rounded">status-report</code></li>
                  <li>• Validate structure with <code className="bg-gray-100 px-1 rounded">validate-structure</code></li>
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
                  <li>• Run <code className="bg-gray-100 px-1 rounded">qa-test</code> for quality checks</li>
                  <li>• Update tickets with <code className="bg-gray-100 px-1 rounded">update-ticket</code></li>
                  <li>• Check dependencies with <code className="bg-gray-100 px-1 rounded">check-deps</code></li>
                  <li>• Validate docs with <code className="bg-gray-100 px-1 rounded">validate-docs</code></li>
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
                  <li>• Generate <code className="bg-gray-100 px-1 rounded">sprint-report</code> for analysis</li>
                  <li>• Complete with <code className="bg-gray-100 px-1 rounded">session-wrapup</code></li>
                  <li>• Archive with <code className="bg-gray-100 px-1 rounded">archive-project</code></li>
                  <li>• Plan next iteration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quality Assurance</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Always run <code className="bg-gray-100 px-1 rounded">qa-test</code> before committing
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Use <code className="bg-gray-100 px-1 rounded">validate-docs</code> for documentation checks
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Check dependencies regularly with <code className="bg-gray-100 px-1 rounded">check-deps</code>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Validate project structure with <code className="bg-gray-100 px-1 rounded">validate-structure</code>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Project Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Start every session with <code className="bg-gray-100 px-1 rounded">session-start</code>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Generate <code className="bg-gray-100 px-1 rounded">sprint-report</code> for weekly reviews
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Archive projects regularly with <code className="bg-gray-100 px-1 rounded">archive-project</code>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Always complete sessions with <code className="bg-gray-100 px-1 rounded">session-wrapup</code>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-900 mb-3">🎯 Workflow Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-green-900 mb-2">Core Workflow (6 steps)</h3>
              <ul className="text-green-800 space-y-1">
                <li>1. session-start</li>
                <li>2. pick-ticket</li>
                <li>3. development</li>
                <li>4. qa-test</li>
                <li>5. status-report</li>
                <li>6. session-wrapup</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-2">Additional Commands (9)</h3>
              <ul className="text-green-800 space-y-1">
                <li>• sprint-report</li>
                <li>• validate-docs</li>
                <li>• validate-structure</li>
                <li>• check-deps</li>
                <li>• update-ticket</li>
                <li>• archive-project</li>
                <li>• list-stories</li>
                <li>• list-issues</li>
                <li>• pick-story</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-2">Quality Focus</h3>
              <ul className="text-green-800 space-y-1">
                <li>• Automated testing</li>
                <li>• Documentation validation</li>
                <li>• Structure validation</li>
                <li>• Dependency management</li>
                <li>• Comprehensive reporting</li>
                <li>• Project archiving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}