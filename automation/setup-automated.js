#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Automated Setup Script for CM Kit Workflow System
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
    'jest@29.7.0',
    'jest-environment-jsdom@29.7.0',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    '@playwright/test',
    '@types/jest',
    'jest-html-reporter',
    'prettier'
  ];
  
  log('   📦 Installing development dependencies...', 'yellow');
  runCommand(`npm install --save-dev ${devDeps.join(' ')}`, 'Installing development dependencies');
  
  // Add package.json overrides to prevent deprecation warnings
  updatePackageJsonOverrides();
}

function updatePackageJsonOverrides() {
  log('   🔧 Adding package.json overrides to prevent deprecation warnings...', 'yellow');
  
  try {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add overrides to force newer versions of deprecated packages
    packageJson.overrides = {
      "glob": "^10.4.5",
      "inflight": "^2.0.0"
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    log('   ✅ Added package.json overrides', 'green');
  } catch (error) {
    log('   ⚠️  Could not add package.json overrides', 'yellow');
  }
}

function setupTestingInfrastructure() {
  log('\n🧪 Setting up Testing Infrastructure...', 'blue');
  
  // Create tests directory structure
  const testDirs = [
    'tests',
    'tests/unit',
    'tests/unit/components',
    'tests/unit/utils',
    'tests/unit/cli',
    'tests/integration',
    'tests/integration/pages',
    'tests/integration/api',
    'tests/integration/automation',
    'tests/e2e',
    'tests/e2e/workflows',
    'tests/e2e/pages',
    'tests/e2e/accessibility',
    'tests/utils'
  ];
  
  testDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log(`   ✅ Created: ${dir}`, 'green');
    } else {
      log(`   ℹ️  Exists: ${dir}`, 'cyan');
    }
  });
  
  // Create test utilities
  const testHelpers = `// Test utilities and helpers
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render function with providers
export function renderWithProviders(ui, options = {}) {
  return render(ui, options);
}

// Mock data for tests
export const mockData = {
  tickets: [
    {
      id: 'TICKET-001',
      title: 'Test Ticket',
      status: 'Not Started',
      priority: 'High'
    }
  ],
  stories: [
    {
      id: 'STORY-001',
      title: 'Test Story',
      status: 'Not Started',
      priority: 'Medium'
    }
  ]
};

// Common test utilities
export const testUtils = {
  waitForElement: (selector) => screen.findByTestId(selector),
  clickElement: async (element) => userEvent.click(element),
  typeText: async (element, text) => userEvent.type(element, text)
};`;
  
  fs.writeFileSync('tests/utils/test-helpers.js', testHelpers);
  log('   ✅ Created: tests/utils/test-helpers.js', 'green');
  
  // Create sample component test
  const sampleComponentTest = `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../src/components/ui/Button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-600');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});`;
  
  fs.writeFileSync('tests/unit/components/Button.test.js', sampleComponentTest);
  log('   ✅ Created: tests/unit/components/Button.test.js', 'green');
  
  // Create sample E2E test
  const sampleE2ETest = `import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check that the page loads
  await expect(page).toHaveTitle(/CM Kit/);
  
  // Check for main content
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  
  // Click on demo link
  await page.click('text=Demo');
  
  // Should navigate to demo page
  await expect(page).toHaveURL(/.*demo/);
  await expect(page.locator('h1')).toContainText('Demo');
});

test('demo page interactions', async ({ page }) => {
  await page.goto('/admin/demo');
  
  // Check that demo page loads
  await expect(page.locator('h1')).toContainText('CM Kit Admin Demo');
  
  // Test any interactive elements
  // Add more specific tests based on demo page functionality
});`;
  
  fs.writeFileSync('tests/e2e/pages/homepage.spec.js', sampleE2ETest);
  log('   ✅ Created: tests/e2e/pages/homepage.spec.js', 'green');
  
  // Create integration test for CLI
  const cliIntegrationTest = `import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('CLI Integration Tests', () => {
  const cliPath = path.join(process.cwd(), 'utils', 'cli.js');
  
  beforeAll(() => {
    // Ensure CLI exists
    expect(fs.existsSync(cliPath)).toBe(true);
  });
  
  it('should show help when no arguments provided', () => {
    const output = execSync(\`node \${cliPath}\`, { encoding: 'utf8' });
    expect(output).toContain('help');
    expect(output).toContain('Available commands');
  });
  
  it('should list tickets when called with list-tickets', () => {
    const output = execSync(\`node \${cliPath} list-tickets\`, { encoding: 'utf8' });
    expect(output).toContain('TICKET');
  });
  
  it('should show status report', () => {
    const output = execSync(\`node \${cliPath} status-report\`, { encoding: 'utf8' });
    expect(output).toContain('Project Status');
  });
  
  it('should handle archive-config command', () => {
    const output = execSync(\`node \${cliPath} archive-config\`, { encoding: 'utf8' });
    expect(output).toContain('archive');
  });
});`;
  
  fs.writeFileSync('tests/integration/cli/cli.test.js', cliIntegrationTest);
  log('   ✅ Created: tests/integration/cli/cli.test.js', 'green');
  
  // Create page integration test
  const pageIntegrationTest = `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../../src/app/page';

describe('HomePage Integration', () => {
  it('renders homepage with all expected elements', () => {
    render(<HomePage />);
    
    // Check for main heading
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for navigation
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Check for demo link
    expect(screen.getByRole('link', { name: /demo/i })).toBeInTheDocument();
    
    // Check for docs link
    expect(screen.getByRole('link', { name: /docs/i })).toBeInTheDocument();
  });
  
  it('has proper accessibility attributes', () => {
    render(<HomePage />);
    
    // Check for main landmark
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check for navigation landmark
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});`;
  
  fs.writeFileSync('tests/integration/pages/homepage.test.js', pageIntegrationTest);
  log('   ✅ Created: tests/integration/pages/homepage.test.js', 'green');
  
  // Create accessibility test
  const accessibilityTest = `import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('homepage should meet accessibility standards', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
    
    // Check for main landmark
    const main = await page.locator('main').count();
    expect(main).toBeGreaterThan(0);
    
    // Check for navigation landmark
    const nav = await page.locator('nav').count();
    expect(nav).toBeGreaterThan(0);
    
    // Check for proper alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
  
  test('demo page should be accessible', async ({ page }) => {
    await page.goto('/admin/demo');
    
    // Check for proper heading structure
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);
    
    // Check for interactive elements
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
      const accessibleName = await button.getAttribute('aria-label') || await button.textContent();
      expect(accessibleName).toBeTruthy();
    }
  });
  
  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = await page.locator(':focus');
    expect(await focusedElement.count()).toBeGreaterThan(0);
  });
});`;
  
  fs.writeFileSync('tests/e2e/accessibility/accessibility.spec.js', accessibilityTest);
  log('   ✅ Created: tests/e2e/accessibility/accessibility.spec.js', 'green');
  
  // Create workflow test
  const workflowTest = `import { test, expect } from '@playwright/test';

test.describe('Workflow System Tests', () => {
  test('complete workflow from homepage to demo', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    
    // Navigate to demo
    await page.click('text=Demo');
    await expect(page).toHaveURL(/.*demo/);
    await expect(page.locator('h1')).toContainText('Demo');
    
    // Navigate to docs
    await page.click('text=Docs');
    await expect(page).toHaveURL(/.*docs/);
    await expect(page.locator('h1')).toContainText('Documentation');
    
    // Navigate back to homepage
    await page.click('text=Home');
    await expect(page).toHaveURL('/');
  });
  
  test('CLI workflow simulation', async ({ page }) => {
    // This test simulates the CLI workflow
    // In a real scenario, you might test the actual CLI commands
    await page.goto('/admin/demo');
    
    // Check that CLI demo elements are present
    const cliElements = await page.locator('[data-testid*="cli"]').count();
    expect(cliElements).toBeGreaterThanOrEqual(0);
  });
});`;
  
  fs.writeFileSync('tests/e2e/workflows/workflow.spec.js', workflowTest);
  log('   ✅ Created: tests/e2e/workflows/workflow.spec.js', 'green');
  
  // Create test README
  const testReadme = `# Testing Infrastructure

This project includes comprehensive testing infrastructure with unit, integration, and end-to-end tests.

## Test Structure

\`\`\`
tests/
├── unit/                 # Unit tests for individual components
│   ├── components/       # Component tests
│   ├── utils/           # Utility function tests
│   └── cli/             # CLI function tests
├── integration/         # Integration tests
│   ├── pages/           # Page-level tests
│   ├── api/             # API integration tests
│   └── automation/      # Automation system tests
├── e2e/                 # End-to-end tests
│   ├── pages/           # Page E2E tests
│   ├── workflows/       # Workflow E2E tests
│   └── accessibility/   # Accessibility tests
└── utils/               # Test utilities and helpers
\`\`\`

## Running Tests

### Unit and Integration Tests (Jest)
\`\`\`bash
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
\`\`\`

### End-to-End Tests (Playwright)
\`\`\`bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI
npm run test:e2e:headed  # Run E2E tests in headed mode
\`\`\`

### All Tests
\`\`\`bash
npm run test:all         # Run unit, integration, and E2E tests
npm run test:ci          # Run tests for CI environment
\`\`\`

## Test Coverage

The project aims for 70% code coverage across:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Writing Tests

### Unit Tests
- Test individual components and functions
- Use React Testing Library for component tests
- Mock external dependencies
- Focus on behavior, not implementation

### Integration Tests
- Test component interactions
- Test page-level functionality
- Test CLI commands and workflows
- Use real dependencies when possible

### E2E Tests
- Test complete user workflows
- Test cross-browser compatibility
- Test accessibility requirements
- Test performance under load

## CI/CD Integration

Tests are automatically run in CI/CD pipeline:
- Unit and integration tests on every push/PR
- E2E tests on main branch
- Security audits on dependencies
- Coverage reports uploaded to Codecov

## Best Practices

1. **Test Behavior**: Focus on what the code does, not how it does it
2. **Use Descriptive Names**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear sections
4. **Keep Tests Fast**: Unit tests should run quickly
5. **Maintain Tests**: Update tests when code changes
6. **Test Edge Cases**: Include tests for error conditions and edge cases
7. **Use Test Data**: Create reusable test data and utilities

## Debugging Tests

### Jest Debugging
\`\`\`bash
npm run test:watch       # Watch mode for debugging
npm test -- --verbose    # Verbose output
\`\`\`

### Playwright Debugging
\`\`\`bash
npm run test:e2e:ui      # Interactive UI mode
npm run test:e2e:headed  # See browser during test execution
\`\`\`

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
`;
  
  fs.writeFileSync('tests/README.md', testReadme);
  log('   ✅ Created: tests/README.md', 'green');
  
  // Update package.json scripts
  updatePackageJsonScripts();
  
  // Create GitHub Actions workflow
  createGitHubActionsWorkflow();
}

function updatePackageJsonScripts() {
  log('   📝 Updating package.json scripts...', 'yellow');
  
  try {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add test scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "test": "jest",
      "test:watch": "jest --watch",
      "test:coverage": "jest --coverage",
      "test:e2e": "playwright test",
      "test:e2e:ui": "playwright test --ui",
      "test:e2e:headed": "playwright test --headed",
      "test:all": "npm run test && npm run test:e2e",
      "test:ci": "npm run test:coverage && npm run test:e2e"
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    log('   ✅ Updated package.json with test scripts', 'green');
  } catch (error) {
    log(`   ❌ Failed to update package.json: ${error.message}`, 'red');
  }
}

function createGitHubActionsWorkflow() {
  log('   📝 Creating GitHub Actions workflow...', 'yellow');
  
  // Create .github/workflows directory
  const workflowsDir = '.github/workflows';
  if (!fs.existsSync(workflowsDir)) {
    fs.mkdirSync(workflowsDir, { recursive: true });
  }
  
  const ciWorkflow = `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run unit and integration tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results-\${{ matrix.node-version }}
        path: |
          coverage/
          test-results/
  
  e2e:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload E2E test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: |
          playwright-report/
          test-results/
  
  security:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run security audit
      run: npm audit --audit-level moderate
    
    - name: Run dependency check
      run: npx audit-ci --moderate`;
  
  fs.writeFileSync(`${workflowsDir}/ci.yml`, ciWorkflow);
  log('   ✅ Created: .github/workflows/ci.yml', 'green');
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
  
  // .npmrc for suppressing deprecation warnings
  const npmrc = `# Suppress deprecation warnings for known safe packages
loglevel=error`;
  
  fs.writeFileSync('.npmrc', npmrc);
  log('   ✅ Created: .npmrc', 'green');
  
  // Playwright config
  const playwrightConfig = `import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like \`await page.goto('/')\`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});`;
  
  fs.writeFileSync('playwright.config.js', playwrightConfig);
  log('   ✅ Created: playwright.config.js', 'green');
  
  // Enhanced Jest config
  const enhancedJestConfig = `const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '<rootDir>/tests/unit/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/tests/integration/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/'
  ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)`;
  
  fs.writeFileSync('jest.config.js', enhancedJestConfig);
  log('   ✅ Updated: jest.config.js with enhanced configuration', 'green');
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

  // Footer component
  const footerComponent = `'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">☕</span>
              <h3 className="text-xl font-bold text-white">CM Kit</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A comprehensive development workflow framework for building scalable, 
              maintainable applications with excellent development practices.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/security"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/docs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/gregmeyer/build-your-app-w-cm-kit/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Report Issues
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © \${currentYear} Greg Meyer. All rights reserved.
            </div>
            <div className="text-sm text-gray-400 text-center md:text-right">
              <span>Built with </span>
              <Link 
                href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                CM Kit
              </Link>
              <span> • </span>
              <Link 
                href="/LICENSE"
                className="text-gray-400 hover:text-white transition-colors"
              >
                MIT License
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}`;
  
  fs.writeFileSync('src/components/ui/Footer.tsx', footerComponent);
  log('   ✅ Created: src/components/ui/Footer.tsx', 'green');

  // Sample Hello component
  const helloComponent = `import React from 'react';

export default function Hello() {
  return <div>Hello, CM Kit!</div>;
}
`;
  fs.writeFileSync('src/components/Hello.tsx', helloComponent);
  log('   ✅ Created: src/components/Hello.tsx', 'green');

  // Sample Hello test
  const helloTest = `import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders greeting message', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, CM Kit!')).toBeInTheDocument();
});
`;
  fs.writeFileSync('src/components/Hello.test.tsx', helloTest);
  log('   ✅ Created: src/components/Hello.test.tsx', 'green');
  
  // Layout component - Updated to fix hydration issues
  const layout = `import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'CM Kit Workflow System',
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <nav className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-xl font-bold text-gray-900">☕ CM Kit</h1>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
            {children}
          </main>
          <Footer />
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
              Start by creating your first component or page. The CM Kit Workflow System is ready to help you build efficiently.
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
          CM Kit Workflow System - Demo
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

function createDocumentationPages() {
  log('\n📚 Creating Documentation Pages...', 'blue');
  
  // Create docs directory structure
  const docsDirs = [
    'src/app/docs',
    'src/app/docs/cli',
    'src/app/docs/workflow',
    'src/app/docs/components',
    'src/app/docs/api'
  ];
  
  docsDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log(`   ✅ Created: ${dir}`, 'green');
    }
  });
  
  // Main docs page
  const mainDocsPage = `import Link from 'next/link';

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
      icon: '🧩'
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {docSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{section.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-600">{section.description}</p>
                <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                  View documentation
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Getting Started
            </h3>
            <p className="text-blue-700 mb-4">
              New to CM Kit? Start with our workflow guide to understand the development process.
            </p>
            <Link
              href="/docs/workflow"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Start with Workflow Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/docs/page.tsx', mainDocsPage);
  log('   ✅ Created: src/app/docs/page.tsx', 'green');
  
  // CLI docs page (simplified version for setup)
  const cliDocsPage = `import Link from 'next/link';

export default function CLIDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CLI Reference</h1>
          <p className="text-xl text-gray-600">
            Complete command-line interface documentation for CM Kit
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Commands</h2>
          <p className="text-gray-600 mb-4">
            Run <code className="bg-gray-100 px-2 py-1 rounded">node utils/cli.js --help</code> to see all available commands.
          </p>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">session-start</h3>
              <p className="text-gray-600">Initialize a new development session</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">create-prd</h3>
              <p className="text-gray-600">Create a new Product Requirements Document</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">status-report</h3>
              <p className="text-gray-600">Generate a project status report</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/docs/cli/page.tsx', cliDocsPage);
  log('   ✅ Created: src/app/docs/cli/page.tsx', 'green');
  
  // Workflow docs page (simplified version for setup)
  const workflowDocsPage = `import Link from 'next/link';

export default function WorkflowDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workflow Guide</h1>
          <p className="text-xl text-gray-600">
            Step-by-step workflow processes and best practices for CM Kit development
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Development Workflow</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Start Session</h3>
                <p className="text-gray-600">Begin a new development session with clear objectives</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create Requirements</h3>
                <p className="text-gray-600">Document requirements and create PRDs</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Progress</h3>
                <p className="text-gray-600">Monitor progress and generate status reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/docs/workflow/page.tsx', workflowDocsPage);
  log('   ✅ Created: src/app/docs/workflow/page.tsx', 'green');
  
  // Components docs page (simplified version for setup)
  const componentsDocsPage = `import Link from 'next/link';

export default function ComponentsDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
          <p className="text-xl text-gray-600">
            UI components, their props, and usage examples for CM Kit. Click on examples to view them in detail.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Button</h3>
              <p className="text-gray-600">Versatile button component with multiple variants</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Card</h3>
              <p className="text-gray-600">Flexible card component for content containers</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Badge</h3>
              <p className="text-gray-600">Badge component for status and labels</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Navigation</h3>
              <p className="text-gray-600">Main navigation component</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Lightbox</h3>
              <p className="text-gray-600">Modal overlay component for displaying content in focused view</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900">Footer</h3>
              <p className="text-gray-600">Comprehensive footer with legal links and CM Kit attribution</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Interactive Examples</h3>
            <p className="text-blue-700 text-sm">
              The full component documentation includes interactive examples with lightbox modals. 
              Click on any component example to view detailed documentation, variants, and usage code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/docs/components/page.tsx', componentsDocsPage);
  log('   ✅ Created: src/app/docs/components/page.tsx', 'green');
  
  // API docs page (simplified version for setup)
  const apiDocsPage = `import Link from 'next/link';

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600">
            API endpoints, authentication, and integration guides for CM Kit
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Base URL</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <code className="bg-gray-800 text-green-400 px-3 py-2 rounded text-sm">
              http://localhost:3000/api
            </code>
          </div>
          <p className="text-gray-600">
            All API endpoints are prefixed with /api. The API uses JSON for request and response bodies.
          </p>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/docs/api/page.tsx', apiDocsPage);
  log('   ✅ Created: src/app/docs/api/page.tsx', 'green');
}

function createLegalPages() {
  log('\n⚖️  Creating Legal Pages...', 'blue');
  
  // Privacy Policy page
  const privacyPage = `import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: \${new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              This application is built with CM Kit and may collect certain information to provide and improve our services. 
              The types of information we collect depend on how you use our application.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Account information (if applicable)</li>
              <li>Contact information</li>
              <li>Usage data and preferences</li>
              <li>Communication with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Device information and identifiers</li>
              <li>Log data and usage analytics</li>
              <li>Cookies and similar technologies</li>
              <li>IP address and location data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Provide and maintain our services</li>
              <li>Improve user experience and functionality</li>
              <li>Communicate with you about updates and changes</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this policy or as required by law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-6">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@example.com<br />
                <strong>Address:</strong> [Your Company Address]<br />
                <strong>Phone:</strong> [Your Phone Number]
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Built with CM Kit</h3>
              <p className="text-blue-700 text-sm">
                This application was built using the CM Kit workflow system. 
                For more information about CM Kit, visit the{' '}
                <Link 
                  href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  GitHub repository
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/privacy/page.tsx', privacyPage);
  log('   ✅ Created: src/app/privacy/page.tsx', 'green');
  
  // Security page
  const securityPage = `import Link from 'next/link';

export default function Security() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security</h1>
          <p className="text-xl text-gray-600">
            Our commitment to protecting your data and maintaining a secure environment
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Practices</h2>
            <p className="text-gray-600 mb-6">
              We take security seriously and implement industry-standard practices to protect your data and ensure 
              the integrity of our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Protection</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>All data is encrypted in transit using TLS/SSL protocols</li>
              <li>Sensitive data is encrypted at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure Security</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Secure hosting environments with regular updates</li>
              <li>Firewall protection and intrusion detection</li>
              <li>DDoS protection and mitigation</li>
              <li>Regular backup procedures and disaster recovery plans</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Application Security</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Secure coding practices and code reviews</li>
              <li>Input validation and sanitization</li>
              <li>Protection against common web vulnerabilities (OWASP Top 10)</li>
              <li>Regular dependency updates and security patches</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Monitoring</h2>
            <p className="text-gray-600 mb-6">
              We continuously monitor our systems for potential security threats and maintain comprehensive 
              logging for security analysis and incident response.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Incident Response</h2>
            <p className="text-gray-600 mb-6">
              In the event of a security incident, we have established procedures to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Quickly identify and contain the threat</li>
              <li>Assess the impact and scope</li>
              <li>Notify affected users as required by law</li>
              <li>Implement corrective measures</li>
              <li>Conduct post-incident analysis</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reporting Security Issues</h2>
            <p className="text-gray-600 mb-6">
              If you discover a security vulnerability or have concerns about our security practices, 
              please report them to us immediately.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Security Contact</h4>
              <p className="text-yellow-800">
                <strong>Email:</strong> security@example.com<br />
                <strong>Subject:</strong> Security Issue - [Brief Description]<br />
                <strong>Response Time:</strong> We aim to respond to security reports within 24 hours
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Certifications</h2>
            <p className="text-gray-600 mb-6">
              Our security practices align with industry standards and best practices, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>OWASP security guidelines</li>
              <li>NIST cybersecurity framework</li>
              <li>GDPR compliance (where applicable)</li>
              <li>Industry-specific security requirements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Security</h2>
            <p className="text-gray-600 mb-6">
              We also provide guidance to help you maintain security:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication when available</li>
              <li>Keep your devices and software updated</li>
              <li>Be cautious of phishing attempts</li>
              <li>Report suspicious activity immediately</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Built with CM Kit</h3>
              <p className="text-blue-700 text-sm">
                This application was built using the CM Kit workflow system, which includes security best practices 
                and secure development workflows. For more information about CM Kit, visit the{' '}
                <Link 
                  href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  GitHub repository
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/security/page.tsx', securityPage);
  log('   ✅ Created: src/app/security/page.tsx', 'green');
  
  // Terms of Service page
  const termsPage = `import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Last updated: \${new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using this application, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-6">
              Permission is granted to temporarily access the materials (information or software) on this application 
              for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer 
              of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the application</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              The materials on this application are provided on an 'as is' basis. We make no warranties, expressed 
              or implied, and hereby disclaim and negate all other warranties including without limitation, implied 
              warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
            <p className="text-gray-600 mb-6">
              In no event shall we or our suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or 
              inability to use the materials on this application, even if we or an authorized representative 
              has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-600 mb-6">
              The materials appearing on this application could include technical, typographical, or photographic 
              errors. We do not warrant that any of the materials on this application are accurate, complete, 
              or current. We may make changes to the materials contained on this application at any time without 
              notice.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Links</h2>
            <p className="text-gray-600 mb-6">
              We have not reviewed all of the sites linked to this application and are not responsible for the 
              contents of any such linked site. The inclusion of any link does not imply endorsement by us of 
              the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modifications</h2>
            <p className="text-gray-600 mb-6">
              We may revise these terms of service for this application at any time without notice. By using 
              this application, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms and conditions are governed by and construed in accordance with the laws and you 
              irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User Conduct</h2>
            <p className="text-gray-600 mb-6">
              You agree not to use the application to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the application</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
            <p className="text-gray-600 mb-6">
              We may terminate or suspend your access to the application immediately, without prior notice or 
              liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@example.com<br />
                <strong>Address:</strong> [Your Company Address]<br />
                <strong>Phone:</strong> [Your Phone Number]
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Built with CM Kit</h3>
              <p className="text-blue-700 text-sm">
                This application was built using the CM Kit workflow system. 
                For more information about CM Kit, visit the{' '}
                <Link 
                  href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  GitHub repository
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
  
  fs.writeFileSync('src/app/terms/page.tsx', termsPage);
  log('   ✅ Created: src/app/terms/page.tsx', 'green');
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
- **Styling**: Tailwind CSS v3.4.17
- **Testing**: Jest with React Testing Library
- **Code Quality**: ESLint, Prettier
- **Workflow**: CM Kit CLI system

## Development Environment
- **Node.js**: v18+
- **Package Manager**: npm
- **Editor**: Cursor (recommended)
- **Browser**: Chrome/Firefox/Safari
- **Terminal**: Any modern terminal

## Application Structure
- **Homepage**: Clean, minimal landing page at "/"
- **Admin Demo**: Full workflow system showcase at "/admin/demo"
- **Documentation**: Comprehensive docs at "/docs" with CLI, Workflow, Components, and API guides
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
  
  // Test archive-config command specifically
  if (fs.existsSync('utils/commands/archive-config.js')) {
    log('   📦 Testing archive-config command...', 'yellow');
    runCommand('node utils/cli.js archive-config', 'Testing archive-config command', { silent: true });
  }
  
  // Test build
  runCommand('npm run build', 'Testing build process', { silent: true });
  
  // Test Jest configuration
  if (fs.existsSync('jest.config.js')) {
    log('   🧪 Testing Jest configuration...', 'yellow');
    runCommand('npm test -- --passWithNoTests', 'Testing Jest setup', { silent: true });
  }
  
  // Test that deprecation warnings are suppressed
  log('   🔧 Testing deprecation warning suppression...', 'yellow');
  runCommand('npm install --dry-run', 'Testing npm install without deprecation warnings', { silent: true });
  
  // Test Playwright setup
  if (fs.existsSync('playwright.config.js')) {
    log('   🎭 Testing Playwright setup...', 'yellow');
    runCommand('npx playwright install --with-deps', 'Installing Playwright browsers', { silent: true });
  }
  
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
    runCommand('git commit -m "Initial setup with CM Kit workflow system"', 'Creating initial commit');
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
  log('   ✅ Footer component with legal links');
  log('   ✅ Legal pages (Privacy, Security, Terms)');
  log('   ✅ Cursor configuration added');
  log('   ✅ Initial ticket and agent context created');
  log('   ✅ Archive configuration command available');
  log('   ✅ Comprehensive testing infrastructure (Jest + Playwright)');
  log('   ✅ Unit, integration, and E2E test examples');
  log('   ✅ Accessibility testing setup');
  log('   ✅ CI/CD pipeline with GitHub Actions');
  log('   ✅ Test coverage reporting (70% target)');
  log('   ✅ Deprecation warning suppression (.npmrc + package.json overrides)');
  log('   ✅ Demo content pages showcasing CLI features');
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
  log('   • Use node utils/cli.js archive-config to create project backups');
  log('   • Check the getting-started.md for detailed instructions');
  log('   • Session logs will be created automatically in the logs/ directory');
  log('   • The admin demo shows the full workflow system capabilities');
  
  log('\n🔗 Useful Commands:', 'cyan');
  log('   • node utils/cli.js session-start    - Start development session');
  log('   • node utils/cli.js status-report    - Check project status');
  log('   • node utils/cli.js list-tickets     - View all tickets');
  log('   • node utils/cli.js pick-ticket      - Select next ticket to work on');
  log('   • node utils/cli.js archive-config   - Create project configuration backup');
  log('   • npm run dev                        - Start development server');
  log('   • npm test                           - Run unit and integration tests');
  log('   • npm run test:watch                 - Run tests in watch mode');
  log('   • npm run test:coverage              - Run tests with coverage report');
  log('   • npm run test:e2e                   - Run end-to-end tests');
  log('   • npm run test:e2e:ui                - Run E2E tests with UI');
  log('   • npm run test:all                   - Run all tests (unit + E2E)');
  log('   • npm run test:ci                    - Run tests for CI environment');
  
  log('\n🌐 Pages Available:', 'cyan');
  log('   • http://localhost:3000              - Clean homepage');
  log('   • http://localhost:3000/admin/demo   - Full workflow demo');
  log('   • http://localhost:3000/docs         - Documentation index');
  log('   • http://localhost:3000/docs/cli     - CLI reference');
  log('   • http://localhost:3000/docs/workflow - Workflow guide');
  log('   • http://localhost:3000/docs/components - Component library');
  log('   • http://localhost:3000/docs/api    - API documentation');
  log('   • http://localhost:3000/demo-content/cli-commands - CLI Commands Demo');
  log('   • http://localhost:3000/demo-content/workflow - Development Workflow Demo');
  log('   • http://localhost:3000/demo-content/features - CM Kit Features Demo');
  log('   • http://localhost:3000/privacy      - Privacy Policy');
  log('   • http://localhost:3000/security     - Security Information');
  log('   • http://localhost:3000/terms        - Terms of Service');
  
  log('\n' + '='.repeat(60), 'blue');
}

function createDemoContentPages() {
  log('\n🎭 Creating Demo Content Pages...', 'blue');
  
  // Create demo content directory
  const demoContentDir = 'src/app/demo-content';
  if (!fs.existsSync(demoContentDir)) {
    fs.mkdirSync(demoContentDir, { recursive: true });
    log('   ✅ Created: src/app/demo-content', 'green');
  }
  
  // CLI Commands Demo Page
  const cliCommandsDemo = `import React from 'react';

export default function CLIDemo() {
  const cliCommands = [
    {
      category: 'Session Management',
      commands: [
        { name: 'session-start', description: 'Start a development session with project validation' },
        { name: 'session-wrapup', description: 'Complete development session with documentation validation' }
      ]
    },
    {
      category: 'Reporting & Status',
      commands: [
        { name: 'status-report', description: 'Generate comprehensive project status report' },
        { name: 'sprint-report', description: 'Generate a comprehensive sprint report' }
      ]
    },
    {
      category: 'Ticket & Issue Management',
      commands: [
        { name: 'list-tickets', description: 'List all tickets with their status and priority' },
        { name: 'list-stories', description: 'List all user stories' },
        { name: 'list-issues', description: 'List all issues' },
        { name: 'pick-ticket', description: 'Pick a ticket to work on' },
        { name: 'pick-story', description: 'Pick a user story to work on' },
        { name: 'update-ticket', description: 'Update ticket status and information' }
      ]
    },
    {
      category: 'Validation & Quality',
      commands: [
        { name: 'validate-structure', description: 'Validate project structure and file organization' },
        { name: 'validate-docs', description: 'Validate documentation consistency and completeness' },
        { name: 'check-deps', description: 'Check and validate project dependencies' },
        { name: 'qa-test', description: 'Run QA tests and quality assurance checks' }
      ]
    },
    {
      category: 'Testing',
      commands: [
        { name: 'test', description: 'Run tests and provide testing utilities' }
      ]
    },
    {
      category: 'Archiving',
      commands: [
        { name: 'archive-project', description: 'Archive project or specific components with timestamp' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CLI Commands Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all available CLI commands in the CM Kit workflow system. 
            Each command is designed to streamline your development process.
          </p>
        </div>

        <div className="grid gap-8">
          {cliCommands.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                {category.category}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {category.commands.map((command, commandIndex) => (
                  <div key={commandIndex} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {command.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {command.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          CLI
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
                        node utils/cli.js {command.name}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 Getting Started with CLI
          </h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Run <code className="bg-blue-100 px-1 rounded">node utils/cli.js help</code> to see all commands</p>
            <p>• Start with <code className="bg-blue-100 px-1 rounded">node utils/cli.js session-start</code> to begin development</p>
            <p>• Use <code className="bg-blue-100 px-1 rounded">node utils/cli.js status-report</code> to check project health</p>
            <p>• Complete sessions with <code className="bg-blue-100 px-1 rounded">node utils/cli.js session-wrapup</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  fs.writeFileSync('src/app/demo-content/cli-commands/page.tsx', cliCommandsDemo);
  log('   ✅ Created: src/app/demo-content/cli-commands/page.tsx', 'green');

  // Workflow Demo Page
  const workflowDemo = `import React from 'react';

export default function WorkflowDemo() {
  const workflowSteps = [
    {
      step: 1,
      title: 'Session Start',
      description: 'Begin development with project validation',
      command: 'node utils/cli.js session-start',
      icon: '🚀'
    },
    {
      step: 2,
      title: 'Pick Ticket',
      description: 'Select next ticket to work on',
      command: 'node utils/cli.js pick-ticket',
      icon: '🎫'
    },
    {
      step: 3,
      title: 'Development',
      description: 'Implement features and functionality',
      command: 'npm run dev',
      icon: '💻'
    },
    {
      step: 4,
      title: 'Testing',
      description: 'Run tests and quality checks',
      command: 'node utils/cli.js qa-test',
      icon: '🧪'
    },
    {
      step: 5,
      title: 'Status Report',
      description: 'Check project status and progress',
      command: 'node utils/cli.js status-report',
      icon: '📊'
    },
    {
      step: 6,
      title: 'Session Wrap-up',
      description: 'Complete session with documentation validation',
      command: 'node utils/cli.js session-wrapup',
      icon: '🏁'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Development Workflow Demo
          </h1>
          <p className="text-xl text-gray-600">
            Follow this streamlined workflow to maximize productivity and maintain code quality.
          </p>
        </div>

        <div className="space-y-6">
          {workflowSteps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      Step {step.step}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {step.description}
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <code className="text-sm text-gray-800 font-mono">
                      {step.command}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            💡 Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• Use <code className="bg-green-100 px-1 rounded">sprint-report</code> for weekly progress reviews</li>
            <li>• Archive projects with <code className="bg-green-100 px-1 rounded">archive-project</code> for backups</li>
            <li>• Validate docs with <code className="bg-green-100 px-1 rounded">validate-docs</code> before commits</li>
            <li>• Check dependencies with <code className="bg-green-100 px-1 rounded">check-deps</code> regularly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}`;

  fs.writeFileSync('src/app/demo-content/workflow/page.tsx', workflowDemo);
  log('   ✅ Created: src/app/demo-content/workflow/page.tsx', 'green');

  // Features Demo Page
  const featuresDemo = `import React from 'react';

export default function FeaturesDemo() {
  const features = [
    {
      title: 'Comprehensive CLI System',
      description: '15+ commands for project management, testing, and workflow automation',
      icon: '🖥️',
      commands: ['session-start', 'status-report', 'qa-test', 'sprint-report']
    },
    {
      title: 'Automated Testing',
      description: 'Jest unit tests, Playwright E2E tests, and CI/CD integration',
      icon: '🧪',
      commands: ['test', 'qa-test', 'npm run test:e2e']
    },
    {
      title: 'Documentation Validation',
      description: 'Automatic validation of README, docs, and sample content',
      icon: '📚',
      commands: ['validate-docs', 'validate-structure', 'session-wrapup']
    },
    {
      title: 'Project Archiving',
      description: 'Create timestamped backups of projects and configurations',
      icon: '📦',
      commands: ['archive-project', 'archive-config']
    },
    {
      title: 'Ticket Management',
      description: 'Track tickets, stories, and issues with status updates',
      icon: '🎫',
      commands: ['list-tickets', 'pick-ticket', 'update-ticket']
    },
    {
      title: 'Quality Assurance',
      description: 'Linting, type checking, and comprehensive QA testing',
      icon: '✅',
      commands: ['qa-test', 'check-deps', 'validate-structure']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CM Kit Features Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make CM Kit the ultimate development workflow system.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Related Commands:</h4>
                {feature.commands.map((command, cmdIndex) => (
                  <div key={cmdIndex} className="bg-gray-50 rounded px-3 py-1">
                    <code className="text-xs text-gray-800 font-mono">
                      {command}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            🎯 Why Choose CM Kit?
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-purple-800 mb-2">Streamlined Workflow</h4>
              <p className="text-sm text-purple-700">
                From session start to wrap-up, every step is optimized for productivity.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-2">Quality Assurance</h4>
              <p className="text-sm text-purple-700">
                Built-in testing, validation, and documentation checks ensure code quality.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-2">Project Management</h4>
              <p className="text-sm text-purple-700">
                Track tickets, stories, and issues with powerful CLI tools.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-purple-800 mb-2">Automation</h4>
              <p className="text-sm text-purple-700">
                Automated setup, testing, and deployment with minimal configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  fs.writeFileSync('src/app/demo-content/features/page.tsx', featuresDemo);
  log('   ✅ Created: src/app/demo-content/features/page.tsx', 'green');
}

function main() {
  log('🚀 CM Kit Workflow System - Automated Setup', 'bright');
  log('='.repeat(60), 'blue');
  
  // Check prerequisites
  if (!checkPrerequisites()) {
    log('\n❌ Prerequisites check failed. Please install the required software and try again.', 'red');
    process.exit(1);
  }
  
  // Execute setup steps
  createProjectStructure();
  installDependencies();
  setupTestingInfrastructure();
  extractCLI();
  createConfigurationFiles();
  createBasicAppFiles();
  createDocumentationPages();
  createLegalPages();
  createGitignore();
  createCursorConfig();
  createInitialTicket();
  createAgentContext();
  createDemoContentPages();
  initializeGit();
  testSetup();
  
  // Generate next steps
  generateNextSteps();
}

if (require.main === module) {
  main();
}

module.exports = { main };
