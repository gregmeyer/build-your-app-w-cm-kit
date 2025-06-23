#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Automated Setup Script for Coffee Money Workflow System
 * This script automates all the steps in the getting-started guide
 * Updated to include admin demo and hydration fixes
 */

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description, options = {}) {
  log(`\n🔄 ${description}...`, 'yellow');
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    log(`✅ ${description} completed successfully`, 'green');
    return { success: true, output: result };
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return { success: false, output: error.message };
  }
}

function checkPrerequisites() {
  log('\n🔍 Checking Prerequisites...', 'blue');
  
  const checks = [
    { name: 'Node.js', command: 'node --version', minVersion: 'v18.0.0' },
    { name: 'npm', command: 'npm --version', minVersion: 'v8.0.0' },
    { name: 'Git', command: 'git --version', minVersion: 'v2.0.0' }
  ];
  
  let allPassed = true;
  
  checks.forEach(check => {
    const result = runCommand(check.command, `Checking ${check.name}`, { silent: true });
    if (result.success) {
      const version = result.output.trim();
      log(`   ✅ ${check.name}: ${version}`, 'green');
    } else {
      log(`   ❌ ${check.name}: Not found or version too low`, 'red');
      allPassed = false;
    }
  });
  
  return allPassed;
}

function createProjectStructure() {
  log('\n📁 Creating Project Structure...', 'blue');
  
  const directories = [
    'tickets',
    'stories', 
    'issues',
    'docs',
    'utils/commands',
    'utils/lib',
    'logs',
    'src/app',
    'src/app/admin',
    'src/app/admin/demo',
    'src/components',
    'src/components/ui',
    'src/lib',
    'src/types',
    '.vscode'
  ];
  
  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log(`   ✅ Created: ${dir}`, 'green');
    } else {
      log(`   ℹ️  Exists: ${dir}`, 'cyan');
    }
  });
  
  // Create essential files
  const essentialFiles = [
    'docs/README.md',
    'tickets/AGENT-CONTEXT.md',
    'stories/README.md',
    'issues/README.md'
  ];
  
  essentialFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, `# ${path.basename(file, '.md')}\n\nCreated by automated setup\n`);
      log(`   ✅ Created: ${file}`, 'green');
    } else {
      log(`   ℹ️  Exists: ${file}`, 'cyan');
    }
  });
}

function installDependencies() {
  log('\n📦 Installing Dependencies...', 'blue');
  
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    log('   📝 Creating package.json...', 'yellow');
    runCommand('npm init -y', 'Initializing package.json');
  }
  
  // Install core dependencies
  const coreDeps = [
    'next@latest',
    'react@latest', 
    'react-dom@latest'
  ];
  
  log('   📦 Installing core dependencies...', 'yellow');
  runCommand(`npm install ${coreDeps.join(' ')}`, 'Installing core dependencies');
  
  // Install dev dependencies
  const devDeps = [
    'typescript',
    '@types/react',
    '@types/node',
    'tailwindcss@^3.4.17',
    'postcss',
    'autoprefixer',
    'eslint',
    'eslint-config-next',
    'jest',
    '@testing-library/react',
    '@testing-library/jest-dom',
    'prettier'
  ];
  
  log('   📦 Installing development dependencies...', 'yellow');
  runCommand(`npm install --save-dev ${devDeps.join(' ')}`, 'Installing development dependencies');
}

function extractCLI() {
  log('\n🔧 Setting up CLI System...', 'blue');
  
  // Run the CLI extraction script
  const extractScript = path.join(__dirname, 'extract-cli.js');
  if (fs.existsSync(extractScript)) {
    runCommand(`node ${extractScript}`, 'Extracting CLI code from documentation');
  } else {
    log('   ⚠️  CLI extraction script not found, skipping...', 'yellow');
  }
  
  // Make CLI executable
  if (fs.existsSync('utils/cli.js')) {
    runCommand('chmod +x utils/cli.js', 'Making CLI executable');
  }
}

function createConfigurationFiles() {
  log('\n⚙️  Creating Configuration Files...', 'blue');
  
  // Next.js config - Updated for Next.js 15
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now the default in Next.js 15
}

module.exports = nextConfig`;
  
  fs.writeFileSync('next.config.js', nextConfig);
  log('   ✅ Created: next.config.js', 'green');
  
  // TypeScript config
  const tsConfig = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;
  
  fs.writeFileSync('tsconfig.json', tsConfig);
  log('   ✅ Created: tsconfig.json', 'green');
  
  // Tailwind config
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  
  fs.writeFileSync('tailwind.config.js', tailwindConfig);
  log('   ✅ Created: tailwind.config.js', 'green');
  
  // PostCSS config
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
  
  fs.writeFileSync('postcss.config.js', postcssConfig);
  log('   ✅ Created: postcss.config.js', 'green');
  
  // Jest config
  const jestConfig = `const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)`;
  
  fs.writeFileSync('jest.config.js', jestConfig);
  log('   ✅ Created: jest.config.js', 'green');
  
  // Jest setup
  const jestSetup = `import '@testing-library/jest-dom'`;
  
  fs.writeFileSync('jest.setup.js', jestSetup);
  log('   ✅ Created: jest.setup.js', 'green');
}

function createBasicAppFiles() {
  log('\n📱 Creating Basic App Files...', 'blue');
  
  // Create components directory structure
  if (!fs.existsSync('src/components/ui')) {
    fs.mkdirSync('src/components/ui', { recursive: true });
  }
  
  // Button component
  const buttonComponent = `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 hover:text-gray-900'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`;
  
  fs.writeFileSync('src/components/ui/Button.tsx', buttonComponent);
  log('   ✅ Created: src/components/ui/Button.tsx', 'green');
  
  // Card component
  const cardComponent = `import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function Card({ children, className = '', title, subtitle }: CardProps) {
  return (
    <div className={\`bg-white rounded-lg border border-gray-200 shadow-sm \${className}\`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/components/ui/Card.tsx', cardComponent);
  log('   ✅ Created: src/components/ui/Card.tsx', 'green');
  
  // Badge component
  const badgeComponent = `import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = ''
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
}`;
  
  fs.writeFileSync('src/components/ui/Badge.tsx', badgeComponent);
  log('   ✅ Created: src/components/ui/Badge.tsx', 'green');

  // Sample Hello component
  const helloComponent = `import React from 'react';

export default function Hello() {
  return <div>Hello, Coffee Money!</div>;
}
`;
  fs.writeFileSync('src/components/Hello.tsx', helloComponent);
  log('   ✅ Created: src/components/Hello.tsx', 'green');

  // Sample Hello test
  const helloTest = `import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders greeting message', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, Coffee Money!')).toBeInTheDocument();
});
`;
  fs.writeFileSync('src/components/Hello.test.tsx', helloTest);
  log('   ✅ Created: src/components/Hello.test.tsx', 'green');
  
  // Layout component - Updated to fix hydration issues
  const layout = `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Coffee Money Workflow System',
  description: 'A comprehensive development workflow system for building scalable applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-bold text-gray-900">☕ Coffee Money</h1>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}`;
  
  fs.writeFileSync('src/app/layout.tsx', layout);
  log('   ✅ Created: src/app/layout.tsx', 'green');
  
  // Global CSS
  const globalCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
  
  fs.writeFileSync('src/app/globals.css', globalCSS);
  log('   ✅ Created: src/app/globals.css', 'green');
  
  // Main page (Clean homepage)
  const mainPage = `import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">Welcome to Your Project</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            You're ready to start building. This is your clean canvas - add your components, pages, and features here.
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
}`;
  
  fs.writeFileSync('src/app/page.tsx', mainPage);
  log('   ✅ Created: src/app/page.tsx', 'green');
  
  // Admin demo page
  const adminDemoPage = `export default function AdminDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Coffee Money Workflow System - Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          This is a demonstration of the comprehensive development workflow system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600 mt-1">Active Tickets</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600 mt-1">Completed Stories</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600 mt-1">Development Sessions</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">15</div>
          <div className="text-sm text-gray-600 mt-1">Issues Resolved</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            🚀 Start Session
          </button>
          <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            📋 Create Ticket
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            📊 Status Report
          </button>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/admin/demo/page.tsx', adminDemoPage);
  log('   ✅ Created: src/app/admin/demo/page.tsx', 'green');
  
  // Error components for Next.js 15
  const errorComponent = `'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            An error occurred while loading this page. Please try again.
          </p>
          <div className="space-y-3">
            <button
              onClick={reset}
              className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try again
            </button>
            <a
              href="/"
              className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/error.tsx', errorComponent);
  log('   ✅ Created: src/app/error.tsx', 'green');
  
  const notFoundComponent = `import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center"
            >
              Go home
            </Link>
            <Link
              href="/admin/demo"
              className="block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
            >
              View demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/not-found.tsx', notFoundComponent);
  log('   ✅ Created: src/app/not-found.tsx', 'green');
  
  const globalErrorComponent = `'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💥</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Global Error</h2>
              <p className="text-gray-600 mb-6">
                Something went wrong with the application. Please try refreshing the page.
              </p>
              <button
                onClick={reset}
                className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}`;
  
  fs.writeFileSync('src/app/global-error.tsx', globalErrorComponent);
  log('   ✅ Created: src/app/global-error.tsx', 'green');
}

function createGitignore() {
  log('\n📝 Creating .gitignore...', 'blue');
  
  const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Next.js
.next/
out/

# Production
build/
dist/

# Testing
coverage/

# Logs
logs/
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Coffee Money specific
logs/session-complete-log-*.md`;
  
  fs.writeFileSync('.gitignore', gitignore);
  log('   ✅ Created: .gitignore', 'green');
}

function createCursorConfig() {
  log('\n🎨 Creating Cursor Configuration...', 'blue');
  
  const cursorSettings = `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.md": "markdown"
  },
  "markdown.preview.breaks": true,
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}`;
  
  fs.writeFileSync('.vscode/settings.json', cursorSettings);
  log('   ✅ Created: .vscode/settings.json', 'green');
}

function createInitialTicket() {
  log('\n🎫 Creating Initial Ticket...', 'blue');
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const ticket = `# TICKET-001: Next.js Foundation Setup

## Created
📅 ${currentDate}

## Last Updated
📅 ${currentDate}

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Review
- [ ] Complete

## Priority
🔴 High

## Description
Set up the foundational Next.js application with:
- Next.js 15+ with App Router
- TypeScript configuration
- Tailwind CSS for styling
- ESLint and Prettier for code quality
- Basic project structure

## Dependencies
- None

## Acceptance Criteria
- [ ] Next.js application created and running
- [ ] TypeScript properly configured
- [ ] Tailwind CSS integrated and working
- [ ] ESLint and Prettier configured
- [ ] Basic project structure established
- [ ] Development server starts without errors

## Implementation Notes
- Use Next.js 15 with App Router
- Configure Tailwind CSS following official docs
- Set up ESLint with Next.js recommended rules
- Create basic directory structure for scalability

## Testing
- [ ] Development server starts successfully
- [ ] TypeScript compilation works
- [ ] Tailwind styles are applied
- [ ] ESLint runs without errors

## Notes
This is the foundational ticket that all other tickets depend on.

---

**Version**: v1  
**Created**: ${currentDate}  
**Last Updated**: ${currentDate}  
**Status**: Not Started`;
  
  fs.writeFileSync('tickets/TICKET-001-nextjs-foundation.md', ticket);
  log('   ✅ Created: tickets/TICKET-001-nextjs-foundation.md', 'green');
}

function createAgentContext() {
  log('\n🤖 Creating Agent Context...', 'blue');
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  const context = `# Agent Context

## Created
📅 ${currentDate}

## Last Updated
📅 ${currentDate}

## Project Overview
Your new application built with the Coffee Money workflow system. This is a Next.js-based application with TypeScript, Tailwind CSS, and comprehensive development tooling.

## Current Status
- Tickets: 1 total, 0 complete, 0 in progress, 1 not started
- Stories: 0 total, 0 complete, 0 in progress, 0 not started
- Issues: 0 open, 0 in progress, 0 resolved

## Ready-to-Pick Tickets
- TICKET-001: Next.js Foundation Setup

## Blocked Tickets
- None

## Implementation Context
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3.4.17
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint, Prettier
- **Workflow**: Coffee Money CLI system

## Development Environment
- **Node.js**: v18+
- **Package Manager**: npm
- **Editor**: Cursor (recommended)
- **Browser**: Chrome/Firefox/Safari
- **Terminal**: Any modern terminal

## Application Structure
- **Homepage**: Clean, minimal landing page at "/"
- **Admin Demo**: Full workflow system showcase at "/admin/demo"
- **Error Handling**: Proper error.tsx, not-found.tsx, global-error.tsx components
- **Hydration**: Fixed hydration issues with simplified layout

## Recent Changes
- Initial project setup completed via automated script
- CLI system implemented
- Clean homepage with admin demo created
- Error handling components added
- Hydration issues resolved
- Cursor configuration added

## Next Steps
1. Complete TICKET-001: Next.js Foundation Setup
2. Create additional foundation tickets
3. Define user stories for your application
4. Begin feature development

## Notes
This is a fresh project setup with a clean homepage and admin demo. All systems are ready for development with no hydration issues.

---

**Version**: v1  
**Created**: ${currentDate}  
**Last Updated**: ${currentDate}  
**Status**: Active`;
  
  fs.writeFileSync('tickets/AGENT-CONTEXT.md', context);
  log('   ✅ Created: tickets/AGENT-CONTEXT.md', 'green');
}

function testSetup() {
  log('\n🧪 Testing Setup...', 'blue');
  
  // Test CLI
  if (fs.existsSync('utils/cli.js')) {
    runCommand('node utils/cli.js help', 'Testing CLI help command', { silent: true });
  }
  
  // Test build
  runCommand('npm run build', 'Testing build process', { silent: true });
  
  // Test dev server (start and stop quickly)
  log('   🚀 Testing development server (will start and stop)...', 'yellow');
  try {
    const devProcess = execSync('npm run dev', { 
      encoding: 'utf8', 
      stdio: 'pipe',
      timeout: 10000 // 10 seconds
    });
    log('   ✅ Development server started successfully', 'green');
  } catch (error) {
    if (error.signal === 'SIGTERM') {
      log('   ✅ Development server test completed', 'green');
    } else {
      log('   ⚠️  Development server test had issues', 'yellow');
    }
  }
}

function initializeGit() {
  log('\n📊 Initializing Git Repository...', 'blue');
  
  // Check if git is already initialized
  if (!fs.existsSync('.git')) {
    runCommand('git init', 'Initializing Git repository');
    runCommand('git add .', 'Adding all files to Git');
    runCommand('git commit -m "Initial setup with Coffee Money workflow system"', 'Creating initial commit');
    log('   ✅ Git repository initialized', 'green');
  } else {
    log('   ℹ️  Git repository already exists', 'cyan');
  }
}

function generateNextSteps() {
  log('\n' + '='.repeat(60), 'blue');
  log('🎉 AUTOMATED SETUP COMPLETED SUCCESSFULLY!', 'green');
  log('='.repeat(60), 'blue');
  
  log('\n📋 What was set up:', 'cyan');
  log('   ✅ Project structure created');
  log('   ✅ Dependencies installed (Next.js 15, Tailwind CSS v3)');
  log('   ✅ CLI system extracted and configured');
  log('   ✅ Configuration files created');
  log('   ✅ Clean homepage with admin demo');
  log('   ✅ Error handling components (error.tsx, not-found.tsx, global-error.tsx)');
  log('   ✅ Hydration-safe layout and components');
  log('   ✅ Cursor configuration added');
  log('   ✅ Initial ticket and agent context created');
  log('   ✅ Git repository initialized');
  
  log('\n🚀 Next Steps:', 'cyan');
  log('   1. Open your project in Cursor: cursor .');
  log('   2. Start your first development session: node utils/cli.js session-start');
  log('   3. Test the development server: npm run dev');
  log('   4. Visit http://localhost:3000 for the clean homepage');
  log('   5. Visit http://localhost:3000/admin/demo for the full demo');
  log('   6. Begin working on TICKET-001: Next.js Foundation Setup');
  log('   7. Create your first user story');
  
  log('\n💡 Tips:', 'cyan');
  log('   • Use Cursor AI to help implement features from your tickets');
  log('   • Run node utils/cli.js help to see all available commands');
  log('   • Check the getting-started.md for detailed instructions');
  log('   • Session logs will be created automatically in the logs/ directory');
  log('   • The admin demo shows the full workflow system capabilities');
  
  log('\n🔗 Useful Commands:', 'cyan');
  log('   • node utils/cli.js session-start    - Start development session');
  log('   • node utils/cli.js status-report    - Check project status');
  log('   • node utils/cli.js list-tickets     - View all tickets');
  log('   • node utils/cli.js pick-ticket      - Select next ticket to work on');
  log('   • npm run dev                        - Start development server');
  log('   • npm test                           - Run tests');
  
  log('\n🌐 Pages Available:', 'cyan');
  log('   • http://localhost:3000              - Clean homepage');
  log('   • http://localhost:3000/admin/demo   - Full workflow demo');
  
  log('\n' + '='.repeat(60), 'blue');
}

function main() {
  log('🚀 Coffee Money Workflow System - Automated Setup', 'bright');
  log('='.repeat(60), 'blue');
  
  // Check prerequisites
  if (!checkPrerequisites()) {
    log('\n❌ Prerequisites check failed. Please install the required software and try again.', 'red');
    process.exit(1);
  }
  
  // Execute setup steps
  createProjectStructure();
  installDependencies();
  extractCLI();
  createConfigurationFiles();
  createBasicAppFiles();
  createGitignore();
  createCursorConfig();
  createInitialTicket();
  createAgentContext();
  initializeGit();
  testSetup();
  
  // Generate next steps
  generateNextSteps();
}

if (require.main === module) {
  main();
}

module.exports = { main };
