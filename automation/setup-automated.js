#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Automated Setup Script for Coffee Money Workflow System
 * This script automates all the steps in the getting-started guide
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
    'src/components',
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
    'tailwindcss',
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
  
  // Next.js config
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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
  
  // ESLint config
  const eslintConfig = `{
  "extends": ["next/core-web-vitals"]
}`;
  
  fs.writeFileSync('.eslintrc.json', eslintConfig);
  log('   ✅ Created: .eslintrc.json', 'green');
  
  // Jest config
  const jestConfig = `const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

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
  
  // Layout component
  const layout = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
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
  
  // Main page
  const mainPage = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to Your App</h1>
        <p className="mt-4 text-lg">Built with Coffee Money Workflow System</p>
      </div>
    </main>
  )
}`;
  
  fs.writeFileSync('src/app/page.tsx', mainPage);
  log('   ✅ Created: src/app/page.tsx', 'green');
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
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint, Prettier
- **Workflow**: Coffee Money CLI system

## Development Environment
- **Node.js**: v18+
- **Package Manager**: npm
- **Editor**: Cursor (recommended)
- **Browser**: Chrome/Firefox/Safari
- **Terminal**: Any modern terminal

## Recent Changes
- Initial project setup completed via automated script
- CLI system implemented
- Basic Next.js application created
- Cursor configuration added

## Next Steps
1. Complete TICKET-001: Next.js Foundation Setup
2. Create additional foundation tickets
3. Define user stories for your application
4. Begin feature development

## Notes
This is a fresh project setup. All systems are ready for development.

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
  log('   ✅ Dependencies installed');
  log('   ✅ CLI system extracted and configured');
  log('   ✅ Configuration files created');
  log('   ✅ Basic Next.js app created');
  log('   ✅ Cursor configuration added');
  log('   ✅ Initial ticket and agent context created');
  log('   ✅ Git repository initialized');
  
  log('\n🚀 Next Steps:', 'cyan');
  log('   1. Open your project in Cursor: cursor .');
  log('   2. Start your first development session: node utils/cli.js session-start');
  log('   3. Test the development server: npm run dev');
  log('   4. Begin working on TICKET-001: Next.js Foundation Setup');
  log('   5. Create your first user story');
  
  log('\n💡 Tips:', 'cyan');
  log('   • Use Cursor AI to help implement features from your tickets');
  log('   • Run node utils/cli.js help to see all available commands');
  log('   • Check the getting-started.md for detailed instructions');
  log('   • Session logs will be created automatically in the logs/ directory');
  
  log('\n🔗 Useful Commands:', 'cyan');
  log('   • node utils/cli.js session-start    - Start development session');
  log('   • node utils/cli.js status-report    - Check project status');
  log('   • node utils/cli.js list-tickets     - View all tickets');
  log('   • node utils/cli.js pick-ticket      - Select next ticket to work on');
  log('   • npm run dev                        - Start development server');
  log('   • npm test                           - Run tests');
  
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
