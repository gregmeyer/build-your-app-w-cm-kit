# Getting Started with CM Kit Workflow System

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-23

---

# Quick Start Guide

This guide will help you get up and running with the CM Kit workflow system for your new application. This assumes you've cloned the repository from GitHub and are ready to set up your development environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **GitHub CLI** (optional but recommended) - [Download here](https://cli.github.com/)
- **Cursor** (recommended IDE) - [Download here](https://cursor.sh/)

### Verify Installation
```bash
# Check Node.js version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be v8.0.0 or higher

# Check Git version
git --version   # Should be v2.0.0 or higher

# Check GitHub CLI (optional)
gh --version    # Should be v2.0.0 or higher

# Check Cursor (optional)
cursor --version  # Should be available if installed
```

## 🤖 Automated Setup (Fastest Method)

**For the fastest setup experience, use the automated script that handles everything for you:**

```bash
# Run the automated setup script
node automation/setup-automated.js
```

This script will automatically:
- ✅ Check all prerequisites
- ✅ Create the complete project structure
- ✅ Install all dependencies (Next.js, TypeScript, Tailwind, etc.)
- ✅ Extract and configure the CLI system
- ✅ Create all configuration files
- ✅ Set up basic Next.js app files with demo pages
- ✅ Create initial ticket and agent context
- ✅ Initialize Git repository
- ✅ Test the setup
- ✅ Provide next steps and useful commands

**Perfect for Cursor AI workflow:** Simply ask Cursor to run this script in a new project directory, and it will set up everything automatically!

**If you prefer manual setup or want to understand each step, continue with the sections below.**

## Development Environment Setup

### Using Cursor (Recommended)

Cursor is the recommended IDE for CM Kit workflow projects because it provides excellent AI assistance and integrates well with the workflow system.

#### Install Cursor
1. Download Cursor from [cursor.sh](https://cursor.sh/)
2. Install and launch Cursor
3. Sign in with your GitHub account for full features

#### Open Your Project in Cursor
```bash
# After cloning and setting up your project
cd my-new-app

# Open in Cursor
cursor .

# Or from Cursor: File > Open Folder > Select your project directory
```

#### Cursor Configuration
Create a `.vscode/settings.json` file for optimal Cursor configuration:

```bash
# Create .vscode directory
mkdir -p .vscode

# Create settings file
cat > .vscode/settings.json << 'EOF'
{
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
}
EOF
```

#### Cursor Extensions (Recommended)
Install these extensions in Cursor for the best development experience:

1. **Prettier** - Code formatting
2. **ESLint** - Code linting
3. **Tailwind CSS IntelliSense** - Tailwind CSS support
4. **GitLens** - Enhanced Git integration
5. **Thunder Client** - API testing
6. **Error Lens** - Inline error display

#### Using Cursor with CM Kit Workflow

##### Terminal Integration
Cursor has an integrated terminal where you can run all CLI commands:

```bash
# Open terminal in Cursor: View > Terminal or Ctrl+` (Cmd+` on Mac)

# Run CLI commands directly in the terminal
node automation/modules/cli.js session-start
node automation/modules/cli.js status-report
node automation/modules/cli.js pick-ticket
```

##### AI Assistance
Cursor's AI can help you with:
- **Code generation**: Ask it to implement features from your tickets
- **Debugging**: Describe issues and get solutions
- **Documentation**: Generate documentation for your code
- **Refactoring**: Suggest improvements to your code

##### Workflow Integration
1. **Open tickets/stories** in Cursor to reference while coding
2. **Use the terminal** for all CLI commands
3. **Leverage AI** to help implement features from your tickets
4. **Use Git integration** to commit changes with meaningful messages

#### Cursor Shortcuts for CM Kit Workflow
- `Ctrl+`` (Cmd+`` on Mac): Open/close terminal
- `Ctrl+Shift+P` (Cmd+Shift+P on Mac): Command palette
- `Ctrl+P` (Cmd+P on Mac): Quick file open
- `Ctrl+Shift+F` (Cmd+Shift+F on Mac): Search across files
- `F1`: Open command palette

#### Benefits of Using Cursor
- **AI-powered development**: Get help with coding, debugging, and documentation
- **Integrated terminal**: Run CLI commands without leaving the editor
- **Git integration**: Visual Git history and easy commits
- **TypeScript support**: Excellent TypeScript and React support
- **Extension ecosystem**: Access to VS Code extensions
- **Performance**: Fast and responsive even with large projects

#### Using Cursor AI with CM Kit Workflow

Cursor's AI can be a powerful ally when working with the CM Kit workflow system. Here are some effective ways to use it:

##### AI Prompts for Development

**1. Implementing Tickets**
```
I'm working on TICKET-001: Next.js Foundation Setup. 
Can you help me implement the acceptance criteria: [paste criteria here]?
```

**2. Creating Components**
```
I need to create a React component for [feature]. 
The component should [requirements]. 
Use TypeScript and Tailwind CSS.
```

**3. Debugging Issues**
```
I'm getting this error: [paste error]. 
Can you help me understand what's wrong and how to fix it?
```

**4. Code Review**
```
Can you review this code and suggest improvements for:
- Performance
- TypeScript best practices
- React patterns
- Accessibility
```

**5. Documentation**
```
Can you help me write documentation for this [component/feature]?
Include usage examples and API reference.
```

##### AI Workflow Integration

**Start Your Session with AI**
1. Open Cursor and your project
2. Use `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open AI chat
3. Ask: "I'm starting a new development session. Can you help me review my current tickets and suggest what to work on next?"

**Implement Features with AI**
1. Open the ticket you're working on
2. Copy the acceptance criteria
3. Ask AI: "Help me implement these acceptance criteria: [paste criteria]"
4. Review and refine the generated code

**Debug with AI**
1. When you encounter an error, copy the error message
2. Ask AI: "I'm getting this error: [error]. What's wrong and how do I fix it?"
3. AI can often provide immediate solutions

**Code Review with AI**
1. Select the code you want reviewed
2. Ask AI: "Can you review this code and suggest improvements?"
3. AI will provide feedback on best practices, performance, and potential issues

##### Example AI Conversations

**Setting up a new feature:**
```
User: "I need to implement user authentication. I have TICKET-002: Authentication System. Can you help me set up NextAuth.js with Google OAuth?"

AI: "I'll help you set up NextAuth.js with Google OAuth. Let's start by installing the required dependencies and creating the configuration..."
```

**Debugging an issue:**
```
User: "I'm getting a hydration error in my Next.js app. The error says 'Text content does not match server-rendered HTML'. What's causing this?"

AI: "This is a common Next.js hydration error. It usually happens when the server-rendered content doesn't match what the client renders. Let's identify the cause..."
```

**Code review:**
```
User: "Can you review this React component and suggest improvements?"

AI: "Looking at your component, here are some suggestions for improvement: 1. Add proper TypeScript types, 2. Consider using React.memo for performance, 3. Add error boundaries..."
```

##### Tips for Effective AI Usage

1. **Be Specific**: Provide context about your project and what you're trying to achieve
2. **Reference Tickets**: Mention specific ticket numbers and requirements
3. **Show Code**: Paste relevant code when asking for help
4. **Iterate**: Don't accept the first answer - ask for refinements
5. **Learn**: Use AI explanations to understand concepts, not just get code

##### AI-Powered Development Workflow

1. **Session Start**: Use AI to review your project status and plan your work
2. **Implementation**: Get AI help with coding features from your tickets
3. **Debugging**: Use AI to quickly identify and fix issues
4. **Code Review**: Have AI review your code before committing
5. **Documentation**: Use AI to generate documentation for your features
6. **Session End**: Use AI to help write commit messages and update documentation

## Step 1: Clone and Setup

### 1.1 Clone the Repository
```bash
# Clone the create-new-app repository
git clone https://github.com/your-username/coffee-money-create-new-app.git my-new-app

# Navigate to the project directory
cd my-new-app
```

### 1.2 Initialize Your New Project
```bash
# Remove the existing Git history (we'll create a new one)
rm -rf .git

# Initialize a new Git repository
git init

# Create your project structure
mkdir -p {tickets,stories,issues,docs,automation/{modules,core,templates/{pages,docs,legal,configs}},logs}

# Create essential files
touch docs/README.md
touch tickets/AGENT-CONTEXT.md
touch stories/README.md
touch issues/README.md
```

## Step 2: Install Dependencies

### 2.1 Install Node.js Dependencies
```bash
# Install dependencies (if package.json exists)
npm install

# Or create a new package.json if none exists
npm init -y
```

### 2.2 Install Required Packages
```bash
# Install core dependencies for a typical Next.js project
npm install next@latest react@latest react-dom@latest

# Install development dependencies
npm install --save-dev typescript @types/react @types/node
npm install --save-dev tailwindcss postcss autoprefixer
npm install --save-dev eslint eslint-config-next
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Install additional utilities (optional)
npm install --save-dev prettier
npm install --save-dev husky lint-staged
```

## Step 3: Copy CLI Implementation

### 3.1 Automatic CLI Setup (Recommended)
Use the provided utility script to automatically extract and create all CLI files:

```bash
# Run the CLI extraction script
node automation/extract-cli.js

# Make the CLI executable
chmod +x automation/modules/cli.js
```

### 3.2 Manual CLI Setup (Alternative)
If you prefer to set up manually, copy the CLI implementation from the documentation:

```bash
# Create the main CLI entry point
cp automation/cli-implementation.md automation/modules/cli.js

# Extract the CLI code from the markdown file
# (You'll need to manually copy the JavaScript code from the markdown)
```

### 3.3 Create CLI Command Files
Create the following files in `automation/modules/`:

```bash
# Create command files
touch automation/modules/session-start.js
touch automation/modules/session-wrapup.js
touch automation/modules/status-report.js
touch automation/modules/list-tickets.js
touch automation/modules/list-stories.js
touch automation/modules/list-issues.js
touch automation/modules/pick-ticket.js
touch automation/modules/pick-story.js
touch automation/modules/update-ticket.js
touch automation/modules/validate-structure.js
touch automation/modules/test.js
touch automation/modules/qa-test.js
touch automation/modules/archive-config.js

# Create logger utility
touch automation/core/logger.js
```

### 3.4 Copy CLI Code
Copy the JavaScript code from `automation/cli-implementation.md` into the appropriate files:

- Copy the main CLI code to `automation/modules/cli.js`
- Copy the logger code to `automation/core/logger.js`
- Copy each command implementation to its respective file in `automation/modules/`

## Step 4: Configure Your Project

### 4.1 Create Configuration Files
```bash
# Create Next.js configuration
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
EOF

# Create TypeScript configuration
cat > tsconfig.json << 'EOF'
{
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
}
EOF

# Create Tailwind configuration
npx tailwindcss init -p

# Create ESLint configuration
cat > .eslintrc.json << 'EOF'
{
  "extends": ["next/core-web-vitals"]
}
EOF

# Create Jest configuration
cat > jest.config.js << 'EOF'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
EOF

# Create Jest setup
cat > jest.setup.js << 'EOF'
import '@testing-library/jest-dom'
EOF
```

### 4.2 Configure Tailwind CSS
```bash
# Update tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
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
}
EOF
```

### 4.3 Create Basic Project Structure
```bash
# Create source directory structure
mkdir -p src/{app,components,lib,types}

# Create basic app files
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
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
}
EOF

# Create global CSS
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# Create main page
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Welcome to Your App</h1>
        <p className="mt-4 text-lg">Built with CM Kit Workflow System</p>
      </div>
    </main>
  )
}
EOF
```

## Step 5: Set Up Git and GitHub

### 5.1 Create .gitignore
```bash
# Create comprehensive .gitignore
cat > .gitignore << 'EOF'
# Dependencies
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

# CM Kit specific
logs/session-complete-log-*.md
archive/
EOF
```

### 5.2 Initialize Git Repository
```bash
# Add all files to Git
git add .

# Create initial commit
git commit -m "Initial setup with CM Kit workflow system"

# Create main branch (if not already on it)
git branch -M main
```

### 5.3 Connect to GitHub

#### Option A: Using GitHub CLI (Recommended)
```bash
# Login to GitHub CLI
gh auth login

# Create a new repository on GitHub
gh repo create my-new-app --public --source=. --remote=origin --push

# Or for a private repository
gh repo create my-new-app --private --source=. --remote=origin --push
```

#### Option B: Manual GitHub Setup
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "my-new-app")
4. Choose public or private
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"
7. Follow the instructions to push your existing repository:

```bash
# Add the remote origin
git remote add origin https://github.com/your-username/my-new-app.git

# Push to GitHub
git push -u origin main
```

## Step 6: Test Your Setup

### 6.1 Test the CLI System
```bash
# Make CLI executable
chmod +x automation/modules/cli.js

# Test CLI help
node automation/modules/cli.js help

# Test session start
node automation/modules/cli.js session-start

# Test status report
node automation/modules/cli.js status-report
```

### 6.2 Test the Development Server
```bash
# Start the development server
npm run dev

# Open your browser to http://localhost:3000
# You should see your app running
```

### 6.3 Test the Build Process
```bash
# Build the application
npm run build

# If successful, you'll see build output
```

## Step 7: Create Your First Development Session

### 7.1 Start a Development Session
```bash
# Start your first development session
node automation/modules/cli.js session-start

# This will validate your project setup and show readiness status
```

### 7.2 Create Your First Ticket
```bash
# Create a foundation ticket
cat > tickets/TICKET-001-nextjs-foundation.md << 'EOF'
# TICKET-001: Next.js Foundation Setup

## Created
📅 $(date +%Y-%m-%d)

## Last Updated
📅 $(date +%Y-%m-%d)

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
- Demo pages (full demo and blank page example)

## Dependencies
- None

## Acceptance Criteria
- [ ] Next.js application created and running
- [ ] TypeScript properly configured
- [ ] Tailwind CSS integrated and working
- [ ] ESLint and Prettier configured
- [ ] Basic project structure established
- [ ] Development server starts without errors
- [ ] Demo pages accessible and functional
- [ ] Navigation works with both demo options

## Implementation Notes
- Use Next.js 15 with App Router
- Configure Tailwind CSS following official docs
- Set up ESLint with Next.js recommended rules
- Create basic directory structure for scalability
- Include both comprehensive demo and blank page examples

## Testing
- [ ] Development server starts successfully
- [ ] TypeScript compilation works
- [ ] Tailwind styles are applied
- [ ] ESLint runs without errors
- [ ] Demo pages render correctly
- [ ] Navigation functions properly

## Notes
This is the foundational ticket that all other tickets depend on.

---

**Version**: v1  
**Created**: $(date +%Y-%m-%d)  
**Last Updated**: $(date +%Y-%m-%d)  
**Status**: Not Started
EOF
```

### 7.3 Update Agent Context
```bash
# Update the agent context with your project information
cat > tickets/AGENT-CONTEXT.md << 'EOF'
# Agent Context

## Created
📅 $(date +%Y-%m-%d)

## Last Updated
📅 $(date +%Y-%m-%d)

## Project Overview
Your new application built with the CM Kit workflow system. This is a Next.js-based application with TypeScript, Tailwind CSS, and comprehensive development tooling.

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
- **Workflow**: CM Kit CLI system
- **Automation**: Template-based setup system
- **Demo Pages**: Full demo and blank page examples

## Development Environment
- **Node.js**: v18+
- **Package Manager**: npm
- **Editor**: VS Code (recommended)
- **Browser**: Chrome/Firefox/Safari
- **Terminal**: Any modern terminal

## Recent Changes
- Initial project setup completed
- CLI system implemented
- Basic Next.js application created
- Demo pages added (full demo and blank page)
- Navigation updated with demo options
- Git repository initialized and connected to GitHub

## Next Steps
1. Complete TICKET-001: Next.js Foundation Setup
2. Create additional foundation tickets
3. Define user stories for your application
4. Begin feature development

## Notes
This is a fresh project setup. All systems are ready for development.

---

**Version**: v1  
**Created**: $(date +%Y-%m-%d)  
**Last Updated**: $(date +%Y-%m-%d)  
**Status**: Active
EOF
```

### 7.4 End Your First Session
```bash
# End your development session
node automation/modules/cli.js session-wrapup

# This will create a session log and update your project status
```

## Step 8: Continue Development

### 8.1 Pick Your Next Ticket
```bash
# Pick the next ticket to work on
node automation/modules/cli.js pick-ticket

# Or list all available tickets
node automation/modules/cli.js list-tickets
```

### 8.2 Create User Stories
```bash
# Create your first user story
cat > stories/STORY-001-user-can-sign-in.md << 'EOF'
# STORY-001: User Can Sign In

## Created
📅 $(date +%Y-%m-%d)

## Last Updated
📅 $(date +%Y-%m-%d)

## Category
Authentication

## Status
❌ Not Started

## Priority
🔴 High

## Description
As a user, I want to sign in to the application so that I can access my personalized features and data.

## Acceptance Criteria
- [ ] Given I'm on the sign-in page, when I enter valid credentials, then I'm signed in
- [ ] Given I'm signed in, when I visit the application, then I see my dashboard
- [ ] Given I'm signed in, when I click sign out, then I'm signed out

## Story Points
5

## Dependencies
- TICKET-001: Next.js Foundation Setup

## Implementation Notes
- Use NextAuth.js for authentication
- Implement Google OAuth for easy sign-in
- Create protected routes for authenticated users

## Testing Scenarios
- [ ] Sign-in flow works correctly
- [ ] Protected routes redirect unauthenticated users
- [ ] Sign-out functionality works

## Notes
This is a critical user story for user onboarding.

---

**Version**: v1  
**Created**: $(date +%Y-%m-%d)  
**Last Updated**: $(date +%Y-%m-%d)  
**Status**: Not Started
EOF
```

### 8.3 Regular Development Workflow
```bash
# Start each development session
node automation/modules/cli.js session-start

# Work on your tickets and stories...

# End each development session
node automation/modules/cli.js session-wrapup

# Check project status regularly
node automation/modules/cli.js status-report

# Create project backups when needed
node automation/modules/cli.js archive-config
```

### 8.4 Project Backup and Archiving
The CM Kit system includes an archive command to create backups of your project configuration:

```bash
# Create a backup of your current project configuration
node automation/modules/cli.js archive-config

# This will:
# - Create a timestamped archive in the archive/ directory
# - Include all essential project files (excluding node_modules)
# - Generate metadata about the current project state
# - Provide restoration instructions
```

**When to use archive-config:**
- Before major refactoring or changes
- After completing significant milestones
- When you want to preserve a working state
- Before experimenting with new features
- As part of your regular backup strategy

**Archive contents include:**
- Source code (src/ directory)
- Configuration files (package.json, next.config.js, etc.)
- Documentation (docs/ directory)
- CLI system (automation/ directory)
- Project structure (tickets/, stories/, issues/)
- Git information and metadata

## Troubleshooting

### Common Issues

#### CLI Commands Not Found
```bash
# Ensure CLI is executable
chmod +x automation/modules/cli.js

# Check file permissions
ls -la automation/modules/cli.js

# Verify command files exist
ls -la automation/modules/
```

#### Node.js Version Issues
```bash
# Check Node.js version
node --version

# If using nvm, switch to correct version
nvm use 18

# Or install Node.js 18+
# Visit https://nodejs.org/
```

#### Git Issues
```bash
# Configure Git if not already done
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check Git status
git status

# Check remote configuration
git remote -v
```

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Getting Help

If you encounter issues:
1. Check the error messages for specific details
2. Review the file formats in `automation/templates/`
3. Verify your project structure matches the expected layout
4. Run validation commands to identify specific problems
5. Check the session logs in the `logs/` directory

## Success Criteria

Your setup is successful when:
✅ All CLI commands execute without errors
✅ Session start/end workflows function properly
✅ Status reporting provides accurate project metrics
✅ Ticket and story listing works correctly
✅ Validation commands identify issues appropriately
✅ Session logging creates detailed markdown logs
✅ Archive configuration command creates proper backups
✅ Git repository is properly initialized and connected to GitHub
✅ Development server starts without errors
✅ Build process completes successfully
✅ Demo pages are accessible and functional
✅ Navigation works with both demo options
✅ Blank page example demonstrates basic layout structure

## Next Steps

After successful setup:
1. Complete your foundation tickets
2. Define user stories for your application
3. Begin implementing features using the workflow
4. Use session management for consistent development
5. Regularly update status and context
6. Create issues for any bugs or problems you encounter

## Resources

- [CM Kit Workflow Documentation](docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [GitHub CLI Documentation](https://cli.github.com/)
- [Cursor Documentation](https://cursor.sh/docs)

---

**Version**: v1  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-23  
**Status**: Ready for Use 