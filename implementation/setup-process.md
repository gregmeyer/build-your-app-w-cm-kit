# Setup Process for CM Kit Workflow System

## Overview

This document provides step-by-step instructions for setting up a new application using the CM Kit workflow system.

## Prerequisites

Before beginning the setup process, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git (for version control)
- Cursor IDE (recommended)

## Step 1: Project Initialization

### 1.1 Create Project Directory

```bash
mkdir my-new-app
cd my-new-app
```

### 1.2 Initialize Git Repository

```bash
git init
```

### 1.3 Create Essential Directory Structure

Create the essential directory structure for the CM Kit workflow system:

```bash
mkdir -p src/app src/components src/lib
mkdir -p tickets stories issues logs
mkdir -p utils/commands utils/lib
mkdir -p docs examples
mkdir -p automation implementation
```

## Step 2: Package Configuration

### 2.1 Initialize npm Package

```bash
npm init -y
```

### 2.2 Update package.json

```json
{
  "name": "my-new-app",
  "version": "1.0.0",
  "description": "This project uses the CM Kit workflow system. See `docs/create-new-app/` for setup instructions.",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "jest": "^29.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Configuration Files

### 4.1 Next.js Configuration

Create `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

### 4.2 TypeScript Configuration

Create `tsconfig.json`:

```json
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
```

### 4.3 Tailwind CSS Configuration

Create `tailwind.config.js`:

```javascript
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
```

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 4.4 ESLint Configuration

Create `.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals"
}
```

### 4.5 Jest Configuration

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

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
module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom'
```

## Step 5: CLI System Setup

### 5.1 Extract CLI System

Run the CLI extraction script:

```bash
node automation/extract-cli.js
```

### 5.2 Test CLI System

```bash
node utils/cli.js help
```

## Step 6: Session Logging Setup

The CM Kit workflow system includes automatic session logging that creates detailed markdown logs for each development session:

### 6.1 Create Logs Directory

```bash
mkdir -p logs
```

### 6.2 Test Session Logging

```bash
node utils/cli.js session-start
# Do some work
node utils/cli.js session-wrapup
```

## Step 7: Initial Commit

```bash
git add .
git commit -m "Initial setup with CM Kit workflow system"
```

## Step 8: Development Environment

### 8.1 Start Development Server

```bash
npm run dev
```

### 8.2 Open in Cursor IDE

1. Open Cursor IDE
2. Open the project folder
3. Install recommended extensions
4. Start developing!

## Step 9: First Development Session

### 9.1 Start Session

```bash
node utils/cli.js session-start
```

### 9.2 Create First Component

Create `src/components/Welcome.tsx`:

```tsx
import React from 'react';

export default function Welcome() {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Welcome to CM Kit!
      </h2>
      <p className="text-blue-700">
        Your development workflow is ready to go.
      </p>
    </div>
  );
}
```

### 9.3 Update Homepage

Edit `src/app/page.tsx`:

```tsx
import Welcome from '@/components/Welcome';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Welcome />
    </main>
  );
}
```

### 9.4 End Session

```bash
node utils/cli.js session-wrapup
```

## Verification

After completing the setup, verify that:

1. ✅ Development server starts without errors
2. ✅ CLI commands work correctly
3. ✅ Session logging creates files
4. ✅ Homepage renders correctly
5. ✅ Tests run successfully
6. ✅ Linting passes
7. ✅ Git repository is initialized

## Next Steps

After successful setup:

1. **Explore the CLI**: Try all available commands
2. **Create Your First Feature**: Start with a simple component
3. **Set Up CI/CD**: Configure automated testing and deployment
4. **Customize the Workflow**: Adapt the system to your needs
5. **Share with Your Team**: Onboard team members to the workflow

## Troubleshooting

### Common Issues

1. **CLI Commands Not Found**
   - Ensure you've run `node automation/extract-cli.js`
   - Check that `utils/cli.js` exists

2. **Next.js Build Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check for syntax errors

3. **Tailwind CSS Not Working**
   - Ensure PostCSS config is correct
   - Check that Tailwind is imported in your CSS
   - Verify content paths in `tailwind.config.js`

### Getting Help

- Check the documentation in `docs/`
- Review example files in `examples/`
- Use Cursor AI for specific questions
- Check session logs for previous solutions

## Conclusion

You now have a fully configured CM Kit workflow system! This setup provides:

- **Structured Development**: Clear processes for managing work
- **AI Integration**: Cursor AI assistance throughout development
- **Quality Assurance**: Built-in testing and linting
- **Documentation**: Comprehensive guides and examples
- **Scalability**: Framework that grows with your project

The CM Kit workflow system is designed to help you build better applications faster. Use the CLI tools, follow the workflow patterns, and leverage AI assistance to maximize your productivity. 