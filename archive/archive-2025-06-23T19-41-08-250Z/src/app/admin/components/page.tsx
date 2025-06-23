import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function ComponentsLibrary() {
  const components = [
    {
      name: 'Button',
      description: 'Versatile button component with multiple variants',
      variants: ['default', 'secondary', 'outline', 'ghost'],
      usage: '<Button variant="primary">Click me</Button>'
    },
    {
      name: 'Card',
      description: 'Container component for content organization',
      variants: ['default', 'with-title', 'with-subtitle'],
      usage: '<Card title="Title" subtitle="Subtitle">Content</Card>'
    },
    {
      name: 'Badge',
      description: 'Small status indicators and labels',
      variants: ['default', 'success', 'warning', 'error', 'info'],
      usage: '<Badge variant="success">Success</Badge>'
    }
  ];

  const buttonVariants = [
    { variant: 'default', label: 'Primary Button', className: 'bg-blue-600 hover:bg-blue-700' },
    { variant: 'secondary', label: 'Secondary Button', className: 'bg-gray-600 hover:bg-gray-700' },
    { variant: 'outline', label: 'Outline Button', className: 'border border-gray-300 hover:bg-gray-50' },
    { variant: 'ghost', label: 'Ghost Button', className: 'hover:bg-gray-100' }
  ];

  const badgeVariants = [
    { variant: 'default', label: 'Default', className: 'bg-gray-100 text-gray-800' },
    { variant: 'success', label: 'Success', className: 'bg-green-100 text-green-800' },
    { variant: 'warning', label: 'Warning', className: 'bg-yellow-100 text-yellow-800' },
    { variant: 'error', label: 'Error', className: 'bg-red-100 text-red-800' },
    { variant: 'info', label: 'Info', className: 'bg-blue-100 text-blue-800' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Component Library
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Reusable UI components built with Tailwind CSS. These components provide a consistent 
          design system for your application.
        </p>
      </div>

      {/* Component Overview */}
      <Card title="Available Components" subtitle="Ready-to-use UI elements">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <div key={component.name} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{component.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{component.description}</p>
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500">Variants:</div>
                <div className="flex flex-wrap gap-1">
                  {component.variants.map((variant) => (
                    <Badge key={variant} variant="default" className="text-xs">
                      {variant}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Button Examples */}
      <Card title="Button Component" subtitle="Multiple variants and styles">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {buttonVariants.map((button) => (
              <div key={button.variant} className="text-center">
                <Button variant={button.variant as any} className="mb-2">
                  {button.label}
                </Button>
                <div className="text-xs text-gray-500 font-mono">
                  variant=&quot;{button.variant}&quot;
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-2">Usage:</div>
            <code className="text-sm text-gray-600">
              {`<Button variant="primary">Click me</Button>`}
            </code>
          </div>
        </div>
      </Card>

      {/* Badge Examples */}
      <Card title="Badge Component" subtitle="Status indicators and labels">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {badgeVariants.map((badge) => (
              <div key={badge.variant} className="text-center">
                <Badge variant={badge.variant as any} className="mb-2">
                  {badge.label}
                </Badge>
                <div className="text-xs text-gray-500 font-mono">
                  variant=&quot;{badge.variant}&quot;
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-2">Usage:</div>
            <code className="text-sm text-gray-600">
              {`<Badge variant="success">Success</Badge>`}
            </code>
          </div>
        </div>
      </Card>

      {/* Card Examples */}
      <Card title="Card Component" subtitle="Content containers with optional headers">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <p className="text-gray-600">Basic card with content only.</p>
          </Card>
          <Card title="Card with Title" subtitle="Optional subtitle">
            <p className="text-gray-600">Card with title and subtitle.</p>
          </Card>
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-2">Usage:</div>
          <code className="text-sm text-gray-600">
            {`<Card title="Title" subtitle="Subtitle">Content</Card>`}
          </code>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title="Get Started" subtitle="Start using these components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="w-full">
            📁 View Source Code
          </Button>
          <Button variant="outline" className="w-full">
            📖 Documentation
          </Button>
        </div>
      </Card>
    </div>
  );
} 