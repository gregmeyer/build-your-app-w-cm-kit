#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Documentation page content (simplified)
const DOCS_CONTENT = {
  'src/app/docs/page.tsx': `import Link from 'next/link';

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
      </div>
    </div>
  );
}`,

  'src/app/docs/cli/page.tsx': `export default function CLIDocs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CLI Reference</h1>
        <p className="text-xl text-gray-600">Command-line interface for CM Kit workflow management.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Commands</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Session Management</h3>
            <div className="bg-gray-50 rounded p-4">
              <code className="text-sm text-gray-800">node utils/cli.js session-start --project="Project Name"</code>
              <p className="text-sm text-gray-600 mt-1">Start a new development session</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">PRD Management</h3>
            <div className="bg-gray-50 rounded p-4">
              <code className="text-sm text-gray-800">node utils/cli.js create-prd "Title" --template="feature"</code>
              <p className="text-sm text-gray-600 mt-1">Create a new Product Requirements Document</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Maintenance</h3>
            <div className="bg-gray-50 rounded p-4">
              <code className="text-sm text-gray-800">node utils/cli.js remove-demo</code>
              <p className="text-sm text-gray-600 mt-1">Remove demo files and sample content</p>
            </div>
            <div className="bg-gray-50 rounded p-4 mt-2">
              <code className="text-sm text-gray-800">node utils/cli.js restore-docs</code>
              <p className="text-sm text-gray-600 mt-1">Restore documentation pages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  'src/app/docs/workflow/page.tsx': `export default function WorkflowDocs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Workflow Guide</h1>
        <p className="text-xl text-gray-600">Step-by-step development process for CM Kit projects.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Development Process</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
            <div className="ml-3">
              <p className="text-gray-900">Start development session</p>
              <code className="text-sm text-gray-600">node utils/cli.js session-start --project="Feature Name"</code>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <div className="ml-3">
              <p className="text-gray-900">Create PRD for new features</p>
              <code className="text-sm text-gray-600">node utils/cli.js create-prd "Feature Title" --template="feature"</code>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <div className="ml-3">
              <p className="text-gray-900">Generate user stories</p>
              <code className="text-sm text-gray-600">node utils/cli.js generate-stories --prd="PRD-001"</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  'src/app/docs/components/page.tsx': `export default function ComponentsDocs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
        <p className="text-xl text-gray-600">Reusable UI components for CM Kit applications.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic Components</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Button</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Primary Button</button>
            <code className="text-sm text-gray-600 mt-2 block">&lt;button className="px-4 py-2 bg-blue-600 text-white rounded-md"&gt;</code>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Card</h3>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h4 className="font-semibold text-gray-900">Card Title</h4>
              <p className="text-gray-600 mt-1">Card content goes here</p>
            </div>
            <code className="text-sm text-gray-600 mt-2 block">&lt;div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"&gt;</code>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  'src/app/docs/api/page.tsx': `export default function APIDocs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
        <p className="text-xl text-gray-600">API endpoints and integration guides for CM Kit.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">CLI API</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Programmatic Usage</h3>
            <div className="bg-gray-50 rounded p-3">
              <code className="text-sm text-gray-800">
                const { run } = require('./utils/commands/create-prd');<br/>
                await run({ title: 'New Feature', template: 'feature' });
              </code>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Commands</h3>
            <div className="bg-gray-50 rounded p-3">
              <code className="text-sm text-gray-800">
                // utils/commands/custom-command.js<br/>
                module.exports = {'{'}<br/>
                &nbsp;&nbsp;description: 'Custom command description',<br/>
                &nbsp;&nbsp;run: async (options) =&gt; {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;// Command implementation<br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'};
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`
};

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`   ✅ Created directory: ${dirPath}`);
  }
}

function restoreDocumentation() {
  console.log('📚 Restoring documentation pages...');
  
  let restoredCount = 0;
  
  Object.entries(DOCS_CONTENT).forEach(([filePath, content]) => {
    try {
      // Ensure directory exists
      const dirPath = path.dirname(filePath);
      ensureDirectoryExists(dirPath);
      
      // Write file
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Restored: ${filePath}`);
      restoredCount++;
    } catch (error) {
      console.log(`   ❌ Error restoring ${filePath}: ${error.message}`);
    }
  });
  
  return restoredCount;
}

async function run(options = {}) {
  console.log('🚀 CM Kit Platform - Restore Documentation');
  console.log('='.repeat(60));
  
  const restoredCount = restoreDocumentation();
  
  console.log(`\n🎉 Documentation restoration completed! Restored ${restoredCount} files.`);
  console.log('\n📝 Available documentation pages:');
  console.log('   • /docs - Main documentation index');
  console.log('   • /docs/cli - CLI reference');
  console.log('   • /docs/workflow - Workflow guide');
  console.log('   • /docs/components - Component library');
  console.log('   • /docs/api - API documentation');
  console.log('');
  console.log('🌐 Access documentation at: http://localhost:3000/docs');
  console.log('');
  console.log('='.repeat(60));
  console.log('🎉 Documentation restored successfully!');
  console.log('   Your documentation is now available and up to date.');
}

// CLI module exports
module.exports = {
  description: 'Restore documentation pages if accidentally removed',
  run
};
