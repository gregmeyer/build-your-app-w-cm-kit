import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Welcome to Your Project</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            You&apos;re ready to start building. This is your clean canvas - add your components, pages, and features here.
          </p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Getting Started</h2>
            <p className="text-sm text-gray-600">
              Start by creating your first component or page. The Coffee Money Workflow System is ready to help you build efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1">
                🚀 Start Building
              </Button>
              <a href="/admin/demo" className="flex-1">
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </a>
            </div>
          </div>
        </Card>
        
        <div className="text-sm text-gray-500 space-y-2">
          <p>💡 Tip: Use the CLI tools in the <code className="bg-gray-100 px-1 rounded">utils/</code> directory</p>
          <p>📁 Your components are in <code className="bg-gray-100 px-1 rounded">src/components/</code></p>
          <p>🎨 Styling is set up with Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}