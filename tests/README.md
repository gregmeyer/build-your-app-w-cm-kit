# Testing Infrastructure

This project includes comprehensive testing infrastructure with unit, integration, and end-to-end tests.

## Test Structure

```
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
```

## Running Tests

### Unit and Integration Tests (Jest)
```bash
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

### End-to-End Tests (Playwright)
```bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI
npm run test:e2e:headed  # Run E2E tests in headed mode
```

### All Tests
```bash
npm run test:all         # Run unit, integration, and E2E tests
npm run test:ci          # Run tests for CI environment
```

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
```bash
npm run test:watch       # Watch mode for debugging
npm test -- --verbose    # Verbose output
```

### Playwright Debugging
```bash
npm run test:e2e:ui      # Interactive UI mode
npm run test:e2e:headed  # See browser during test execution
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) 