import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Quick setup and first steps',
      items: [
        { title: 'Installation', description: 'Set up the CM Kit Workflow System', status: 'Complete' },
        { title: 'CLI Setup', description: 'Configure command-line tools', status: 'Complete' },
        { title: 'First Session', description: 'Start your first development session', status: 'Ready' }
      ]
    },
    {
      title: 'Core Concepts',
      description: 'Understanding the workflow system',
      items: [
        { title: 'Tickets', description: 'Task management and tracking', status: 'Complete' },
        { title: 'Stories', description: 'User story management', status: 'Complete' },
        { title: 'Sessions', description: 'Development session tracking', status: 'Complete' },
        { title: 'AI Integration', description: 'Cursor AI workflow optimization', status: 'In Progress' }
      ]
    },
    {
      title: 'CLI Commands',
      description: 'Command-line interface reference',
      items: [
        { title: 'session-start', description: 'Begin a development session', status: 'Complete' },
        { title: 'session-wrapup', description: 'End session and log progress', status: 'Complete' },
        { title: 'list-tickets', description: 'View current tickets', status: 'Complete' },
        { title: 'status-report', description: 'Generate progress report', status: 'Complete' }
      ]
    },
    {
      title: 'Advanced Features',
      description: 'Advanced workflow capabilities',
      items: [
        { title: 'Custom Workflows', description: 'Create custom development workflows', status: 'Planned' },
        { title: 'Team Collaboration', description: 'Multi-developer workflow support', status: 'Planned' },
        { title: 'Analytics Dashboard', description: 'Progress tracking and insights', status: 'Planned' }
      ]
    }
  ];

  const quickLinks = [
    { title: 'CLI Reference', href: '#cli', icon: '🖥️' },
    { title: 'Workflow Guide', href: '#workflow', icon: '🔄' },
    { title: 'Component Library', href: '/admin/components', icon: '🧩' },
    { title: 'API Documentation', href: '#api', icon: '🔌' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Documentation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Complete guide to the CM Kit Workflow System. Learn how to use CLI tools, 
          manage tickets, track stories, and optimize your development workflow.
        </p>
      </div>

      {/* Quick Links */}
      <Card title="Quick Navigation" subtitle="Jump to specific sections">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Button key={link.title} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <span className="text-2xl">{link.icon}</span>
              <span className="text-sm font-medium">{link.title}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Documentation Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title} title={section.title} subtitle={section.description}>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                  <Badge 
                    variant={
                      item.status === 'Complete' ? 'success' : 
                      item.status === 'In Progress' ? 'warning' : 
                      item.status === 'Ready' ? 'info' : 'default'
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* CLI Reference */}
      <Card title="CLI Command Reference" subtitle="Complete command-line interface guide">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Session Management</h3>
              <div className="space-y-3">
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js session-start</div>
                  <div className="mt-1">🚀 Start a new development session</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js session-wrapup</div>
                  <div className="mt-1">✅ End session and log progress</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Project Management</h3>
              <div className="space-y-3">
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js list-tickets</div>
                  <div className="mt-1">🎫 View all current tickets</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                  <div className="text-gray-400">$ node utils/cli.js status-report</div>
                  <div className="mt-1">📊 Generate progress report</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Getting Help */}
      <Card title="Need Help?" subtitle="Resources and support">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 📖 <a href="#" className="text-blue-600 hover:underline">User Guide</a></li>
              <li>• 🎥 <a href="#" className="text-blue-600 hover:underline">Video Tutorials</a></li>
              <li>• 💬 <a href="#" className="text-blue-600 hover:underline">Community Forum</a></li>
              <li>• 🐛 <a href="#" className="text-blue-600 hover:underline">Report Issues</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                📧 Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                📝 Request Feature
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 