import Link from 'next/link';

export default function CLIDocs() {
  const cliCommands = [
    {
      category: 'Session Management',
      commands: [
        {
          name: 'session-start',
          description: 'Start a development session with project validation',
          example: 'node utils/cli.js session-start --project="Feature Name"',
          details: 'Validates project structure, logs session start, and prepares development environment'
        },
        {
          name: 'session-wrapup',
          description: 'Complete development session with documentation validation',
          example: 'node utils/cli.js session-wrapup',
          details: 'Validates docs, runs tests, checks git status, and generates comprehensive session report'
        }
      ]
    },
    {
      category: 'Reporting & Status',
      commands: [
        {
          name: 'status-report',
          description: 'Generate comprehensive project status report',
          example: 'node utils/cli.js status-report',
          details: 'Shows project health, ticket status, git status, and development metrics'
        },
        {
          name: 'sprint-report',
          description: 'Generate a comprehensive sprint report',
          example: 'node utils/cli.js sprint-report',
          details: 'Analyzes tickets, stories, issues, and provides recommendations with metrics'
        }
      ]
    },
    {
      category: 'Ticket & Issue Management',
      commands: [
        {
          name: 'list-tickets',
          description: 'List all tickets with their status and priority',
          example: 'node utils/cli.js list-tickets',
          details: 'Shows all tickets with status, priority, assignee, and creation date'
        },
        {
          name: 'list-stories',
          description: 'List all user stories',
          example: 'node utils/cli.js list-stories',
          details: 'Displays user stories with status, story points, and dependencies'
        },
        {
          name: 'list-issues',
          description: 'List all issues',
          example: 'node utils/cli.js list-issues',
          details: 'Shows all issues with severity, status, and resolution status'
        },
        {
          name: 'pick-ticket',
          description: 'Pick a ticket to work on',
          example: 'node utils/cli.js pick-ticket',
          details: 'Interactive ticket selection with filtering by status and priority'
        },
        {
          name: 'pick-story',
          description: 'Pick a user story to work on',
          example: 'node utils/cli.js pick-story',
          details: 'Interactive story selection with filtering by status and story points'
        },
        {
          name: 'update-ticket',
          description: 'Update ticket status and information',
          example: 'node utils/cli.js update-ticket --id=TICKET-001 --status="In Progress"',
          details: 'Update ticket status, name, description, or rename ticket ID'
        }
      ]
    },
    {
      category: 'Validation & Quality',
      commands: [
        {
          name: 'validate-structure',
          description: 'Validate project structure and file organization',
          example: 'node utils/cli.js validate-structure',
          details: 'Checks directory structure, required files, and project organization'
        },
        {
          name: 'validate-docs',
          description: 'Validate documentation consistency and completeness',
          example: 'node utils/cli.js validate-docs',
          details: 'Validates README, getting-started, docs, and sample content completeness'
        },
        {
          name: 'check-deps',
          description: 'Check and validate project dependencies',
          example: 'node utils/cli.js check-deps',
          details: 'Analyzes package.json, checks for updates, and validates dependency health'
        },
        {
          name: 'qa-test',
          description: 'Run QA tests and quality assurance checks',
          example: 'node utils/cli.js qa-test',
          details: 'Runs linting, type checking, unit tests with coverage, and E2E tests'
        }
      ]
    },
    {
      category: 'Testing',
      commands: [
        {
          name: 'test',
          description: 'Run tests and provide testing utilities',
          example: 'node utils/cli.js test',
          details: 'Executes Jest unit tests and provides testing utilities'
        }
      ]
    },
    {
      category: 'Archiving',
      commands: [
        {
          name: 'archive-project',
          description: 'Archive project or specific components with timestamp',
          example: 'node utils/cli.js archive-project --type=full',
          details: 'Creates timestamped backups of full project, config, docs, CLI, or templates'
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CLI Reference</h1>
          <p className="text-xl text-gray-600">
            Complete command-line interface documentation for CM Kit - 15 powerful commands for streamlined development
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">🚀 Quick Start</h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Run <code className="bg-blue-100 px-1 rounded">node utils/cli.js help</code> to see all commands</p>
            <p>• Start with <code className="bg-blue-100 px-1 rounded">node utils/cli.js session-start</code> to begin development</p>
            <p>• Use <code className="bg-blue-100 px-1 rounded">node utils/cli.js status-report</code> to check project health</p>
            <p>• Complete sessions with <code className="bg-blue-100 px-1 rounded">node utils/cli.js session-wrapup</code></p>
          </div>
        </div>

        <div className="space-y-8">
          {cliCommands.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {category.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {category.commands.map((command, commandIndex) => (
                  <div key={commandIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {command.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        CLI
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {command.description}
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mb-3">
                      <div className="text-gray-400">$ {command.example}</div>
                    </div>
                    <p className="text-gray-500 text-xs">
                      {command.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Command Options & Flags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ticket Options</h3>
              <div className="bg-gray-50 rounded p-4">
                <code className="text-sm text-gray-800">
                  --id=&lt;ticket-id&gt;   Ticket identifier<br/>
                  --status=&lt;status&gt;  Update ticket status<br/>
                  --name=&lt;name&gt;      Update ticket name<br/>
                  --description=&lt;text&gt; Update description
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Archive Options</h3>
              <div className="bg-gray-50 rounded p-4">
                <code className="text-sm text-gray-800">
                  --type=&lt;type&gt;      Archive type (full, config, docs, cli, templates)<br/>
                  --timestamp         Include timestamp in archive name
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Usage Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Complete Development Workflow</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Start development session</div>
                <div className="mt-2">$ node utils/cli.js session-start --project="User Authentication"</div>
                <div className="text-gray-400"># Pick a ticket to work on</div>
                <div className="mt-2">$ node utils/cli.js pick-ticket</div>
                <div className="text-gray-400"># Run QA tests</div>
                <div className="mt-2">$ node utils/cli.js qa-test</div>
                <div className="text-gray-400"># Generate sprint report</div>
                <div className="mt-2">$ node utils/cli.js sprint-report</div>
                <div className="text-gray-400"># Complete session</div>
                <div className="mt-2">$ node utils/cli.js session-wrapup</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Management</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Check project status</div>
                <div className="mt-2">$ node utils/cli.js status-report</div>
                <div className="text-gray-400"># List all tickets</div>
                <div className="mt-2">$ node utils/cli.js list-tickets</div>
                <div className="text-gray-400"># Update ticket status</div>
                <div className="mt-2">$ node utils/cli.js update-ticket --id=TICKET-001 --status="In Progress"</div>
                <div className="text-gray-400"># Validate documentation</div>
                <div className="mt-2">$ node utils/cli.js validate-docs</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Archiving</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="text-gray-400"># Archive full project</div>
                <div className="mt-2">$ node utils/cli.js archive-project --type=full</div>
                <div className="text-gray-400"># Archive only configuration</div>
                <div className="mt-2">$ node utils/cli.js archive-project --type=config</div>
                <div className="text-gray-400"># Archive documentation</div>
                <div className="mt-2">$ node utils/cli.js archive-project --type=docs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-900 mb-3">💡 Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Workflow Best Practices</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Always start sessions with <code className="bg-yellow-100 px-1 rounded">session-start</code></li>
                <li>• Use <code className="bg-yellow-100 px-1 rounded">qa-test</code> before committing changes</li>
                <li>• Generate <code className="bg-yellow-100 px-1 rounded">sprint-report</code> for weekly reviews</li>
                <li>• Archive projects regularly with <code className="bg-yellow-100 px-1 rounded">archive-project</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Quality Assurance</h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Run <code className="bg-yellow-100 px-1 rounded">validate-docs</code> before releases</li>
                <li>• Use <code className="bg-yellow-100 px-1 rounded">check-deps</code> to maintain dependencies</li>
                <li>• Validate structure with <code className="bg-yellow-100 px-1 rounded">validate-structure</code></li>
                <li>• Complete sessions with <code className="bg-yellow-100 px-1 rounded">session-wrapup</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-900 mb-3">🎯 Command Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-green-900 mb-2">Session (2)</h3>
              <ul className="text-green-800 space-y-1">
                <li>• session-start</li>
                <li>• session-wrapup</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-2">Reporting (2)</h3>
              <ul className="text-green-800 space-y-1">
                <li>• status-report</li>
                <li>• sprint-report</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-2">Management (6)</h3>
              <ul className="text-green-800 space-y-1">
                <li>• list-tickets</li>
                <li>• list-stories</li>
                <li>• list-issues</li>
                <li>• pick-ticket</li>
                <li>• pick-story</li>
                <li>• update-ticket</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-2">Quality (5)</h3>
              <ul className="text-green-800 space-y-1">
                <li>• validate-structure</li>
                <li>• validate-docs</li>
                <li>• check-deps</li>
                <li>• qa-test</li>
                <li>• test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 