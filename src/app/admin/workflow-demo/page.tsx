import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function WorkflowDemo() {
  const workflowSteps = [
    {
      step: 1,
      title: 'Session Start',
      description: 'Begin a development session with CLI command',
      command: 'node utils/cli.js session-start',
      output: '🚀 Session started: 2025-06-23 14:30\n📋 Active tickets: 3\n⏱️  Timer started'
    },
    {
      step: 2,
      title: 'List Tickets',
      description: 'View current development tickets',
      command: 'node utils/cli.js list-tickets',
      output: '🎫 Found 3 tickets:\n  TICKET-001: Next.js Foundation Setup [In Progress]\n  TICKET-002: User Authentication System [Not Started]\n  TICKET-003: Database Schema Design [Review]'
    },
    {
      step: 3,
      title: 'Status Report',
      description: 'Generate progress report',
      command: 'node utils/cli.js status-report',
      output: '📊 Status Report:\n✅ Completed: 12 stories\n🔄 In Progress: 3 tickets\n⏳ Pending: 5 tasks\n📈 Velocity: 2.3 stories/day'
    },
    {
      step: 4,
      title: 'Session Wrap-up',
      description: 'End session and log progress',
      command: 'node utils/cli.js session-wrapup',
      output: '✅ Session completed: 2h 15m\n📝 Progress logged\n🎯 Next session planned'
    }
  ];

  const features = [
    {
      icon: '🛠️',
      title: 'CLI Integration',
      description: 'Command-line tools for session management and project tracking'
    },
    {
      icon: '📋',
      title: 'Ticket Management',
      description: 'Structured task tracking with dependencies and priorities'
    },
    {
      icon: '📖',
      title: 'Story Tracking',
      description: 'User story management with acceptance criteria'
    },
    {
      icon: '🤖',
      title: 'AI Workflow',
      description: 'Cursor AI integration for enhanced development workflow'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Workflow Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See how the Coffee Money Workflow System streamlines your development process 
          with CLI tools, session management, and AI integration.
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Development Workflow</h2>
        {workflowSteps.map((step) => (
          <Card key={step.step} className="overflow-hidden">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                    <div className="text-gray-400">$ {step.command}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm text-gray-700">
                    {step.output}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">System Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card title="Try It Out" subtitle="Experience the workflow yourself">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="w-full">
            🚀 Start Demo Session
          </Button>
          <Button variant="outline" className="w-full">
            📖 View Documentation
          </Button>
        </div>
      </Card>
    </div>
  );
} 