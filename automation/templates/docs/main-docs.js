import Link from 'next/link';

export default function DocsPage() {
  const docSections = [
    {
      title: 'CLI Reference',
      description: 'Complete command-line interface documentation with examples',
      href: '/docs/cli',
      icon: '⚡'
    },
    {
      title: 'Workflow Guide',
      description: 'Step-by-step workflow processes and best practices',
      href: '/docs/workflow',
      icon: '🔄'
    },
    {
      title: 'Component Library',
      description: 'UI components, their props, and usage examples',
      href: '/docs/components',
      icon: '🛩️'
    },
    {
      title: 'API Documentation',
      description: 'API endpoints, authentication, and integration guides',
      href: '/docs/api',
      icon: '🔌'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CM Kit Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides and references for building with CM Kit
          </p>
        </div>
        {/* ...rest of the template omitted for brevity... */}
      </div>
    </div>
  );
} 