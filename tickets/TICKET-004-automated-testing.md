# TICKET-004: Implement Automated Testing System

## Created
📅 2025-06-23

## Last Updated
📅 2025-06-23

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Review
- [ ] Complete

## Priority
🟡 Medium

## Type
Testing

## Description
Implement a comprehensive automated testing system for the CM Kit workflow application to ensure reliability, prevent regressions, and maintain code quality. This includes unit tests, integration tests, and end-to-end tests for all major components and functionality. **The testing infrastructure must be set up automatically during initial project creation.**

## Dependencies
- TICKET-001: Next.js Foundation Setup (completed)
- TICKET-002: Archive System (completed)
- TICKET-003: Blank Page Example (completed)

## Acceptance Criteria

### Initial Setup Integration
- [ ] Update automation system to include testing infrastructure setup
- [ ] Modify `setup-automated.js` to install testing dependencies
- [ ] Create testing configuration files during project setup
- [ ] Set up basic test structure and examples
- [ ] Include test scripts in package.json during setup
- [ ] Create sample tests for demo components

### Unit Tests
- [ ] Test all React components (Navigation, Button, Card, Badge, Footer, Lightbox)
- [ ] Test CLI commands and utilities
- [ ] Test utility functions and helpers
- [ ] Test configuration validation
- [ ] Achieve minimum 80% code coverage for unit tests

### Integration Tests
- [ ] Test page rendering and navigation
- [ ] Test API endpoints (if any)
- [ ] Test CLI system integration
- [ ] Test automation system functionality
- [ ] Test archive system operations

### End-to-End Tests
- [ ] Test complete user workflows
- [ ] Test demo page interactions
- [ ] Test documentation page navigation
- [ ] Test responsive design on different screen sizes
- [ ] Test accessibility features

### Test Infrastructure
- [ ] Set up Jest configuration for unit and integration tests
- [ ] Set up Playwright for E2E testing
- [ ] Configure test coverage reporting
- [ ] Set up CI/CD pipeline for automated testing
- [ ] Create test utilities and helpers

## Technical Details

### Testing Stack
- **Unit/Integration**: Jest + React Testing Library
- **E2E**: Playwright
- **Coverage**: Jest coverage + Playwright coverage
- **CI/CD**: GitHub Actions

### Test Structure
```
tests/
├── unit/
│   ├── components/
│   ├── utils/
│   └── cli/
├── integration/
│   ├── pages/
│   ├── api/
│   └── automation/
├── e2e/
│   ├── workflows/
│   ├── pages/
│   └── accessibility/
└── utils/
    ├── test-helpers.js
    └── mock-data.js
```

### Key Test Areas

#### Components Testing
- Navigation component functionality
- Button component variants and interactions
- Card component rendering
- Badge component states
- Footer component links
- Lightbox component modal behavior

#### CLI System Testing
- Session management commands
- Ticket and story operations
- Status reporting
- Archive functionality
- Error handling and validation

#### Page Testing
- Homepage rendering
- Demo page interactions
- Blank page functionality
- Documentation pages
- Error pages (404, 500)

#### Automation Testing
- Template generation
- Project setup automation
- CLI extraction process
- Configuration validation

## Implementation Notes

### Phase 0: Update Automation System
1. Modify `automation/setup-automated.js` to include testing setup
2. Add testing dependencies to package.json template
3. Create testing configuration files in templates
4. Add test scripts to package.json template
5. Create sample test files for new projects

### Phase 1: Unit Tests
1. Set up Jest configuration with React Testing Library
2. Create test utilities and mock data
3. Implement component tests
4. Implement utility function tests
5. Configure coverage reporting

### Phase 2: Integration Tests
1. Set up integration test environment
2. Test page rendering and routing
3. Test CLI system integration
4. Test automation system
5. Test archive functionality

### Phase 3: E2E Tests
1. Set up Playwright configuration
2. Create test scenarios for user workflows
3. Test responsive design
4. Test accessibility compliance
5. Set up visual regression testing

### Phase 4: CI/CD Integration
1. Configure GitHub Actions workflow
2. Set up automated test runs
3. Configure coverage reporting
4. Set up test result notifications
5. Configure deployment gates

## Automation System Updates

### Update setup-automated.js
```javascript
// Add to dependencies installation
const testingDependencies = [
  '@testing-library/react',
  '@testing-library/jest-dom',
  '@testing-library/user-event',
  'jest',
  'jest-environment-jsdom',
  '@playwright/test',
  '@types/jest'
];

// Add to package.json scripts
const testScripts = {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui",
  "test:e2e:headed": "playwright test --headed",
  "test:all": "npm run test && npm run test:e2e"
};
```

### Create Testing Templates
```javascript
// automation/templates/configs/jest-config.js
module.exports = {
  // Jest configuration template
};

// automation/templates/configs/playwright-config.js
module.exports = {
  // Playwright configuration template
};

// automation/templates/tests/sample-component.test.js
// Sample test file for new projects
```

## Testing Scenarios

### Component Tests
```javascript
// Example: Navigation component test
describe('Navigation', () => {
  it('renders all navigation links', () => {
    // Test implementation
  });
  
  it('handles active link states', () => {
    // Test implementation
  });
  
  it('is accessible', () => {
    // Test implementation
  });
});
```

### CLI Tests
```javascript
// Example: Session start command test
describe('session-start command', () => {
  it('validates project structure', () => {
    // Test implementation
  });
  
  it('creates session log', () => {
    // Test implementation
  });
  
  it('handles errors gracefully', () => {
    // Test implementation
  });
});
```

### E2E Tests
```javascript
// Example: Demo page workflow test
test('user can navigate to demo page and interact with features', async ({ page }) => {
  await page.goto('/admin/demo');
  await expect(page.locator('h1')).toContainText('CM Kit Admin Demo');
  // Test interactions
});
```

## Configuration Files

### Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'automation/**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Playwright Configuration
```javascript
// playwright.config.js
module.exports = {
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};
```

## Dependencies to Install
```bash
# Testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jest jest-environment-jsdom
npm install --save-dev @playwright/test
npm install --save-dev @types/jest

# Coverage and reporting
npm install --save-dev jest-html-reporter
npm install --save-dev @playwright/test-reporter-html
```

## Scripts to Add
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

## Success Criteria
- [ ] New projects automatically include testing infrastructure
- [ ] All components have comprehensive unit tests
- [ ] CLI system is fully tested
- [ ] E2E tests cover main user workflows
- [ ] Test coverage meets 80% threshold
- [ ] CI/CD pipeline runs tests automatically
- [ ] Tests run in under 5 minutes
- [ ] Accessibility tests pass
- [ ] Cross-browser compatibility verified
- [ ] Sample tests are provided for new projects

## Testing Checklist

### Automation Integration
- [ ] Update setup-automated.js to include testing setup
- [ ] Create testing configuration templates
- [ ] Add testing dependencies to package.json template
- [ ] Create sample test files
- [ ] Update getting-started.md with testing instructions

### Components
- [ ] Navigation.tsx
- [ ] Button.tsx
- [ ] Card.tsx
- [ ] Badge.tsx
- [ ] Footer.tsx
- [ ] Lightbox.tsx

### Pages
- [ ] Homepage
- [ ] Demo page
- [ ] Blank page
- [ ] Documentation pages
- [ ] Error pages

### CLI Commands
- [ ] session-start
- [ ] session-wrapup
- [ ] status-report
- [ ] pick-ticket
- [ ] archive-config
- [ ] All other commands

### Utilities
- [ ] Logger utility
- [ ] Template loader
- [ ] Configuration validators
- [ ] File system helpers

## Notes
This testing system will ensure the CM Kit workflow remains reliable and maintainable as the project grows. The comprehensive test suite will catch regressions early and provide confidence for future development. **Most importantly, new projects will automatically include testing infrastructure, making it easy for developers to start with best practices from day one.**

---

**Version**: v1  
**Created**: 2025-06-23  
**Last Updated**: 2025-06-23  
**Status**: Not Started 