# Documentation

This directory contains comprehensive documentation for the CM Kit Workflow System.

## Overview

The CM Kit Workflow System provides a complete development framework with CLI tools, testing infrastructure, and project management capabilities. This documentation covers all aspects of the system from setup to advanced usage.

## Sections

### 📚 **Core Documentation**
- **[README.md](../README.md)** - Main project overview and features
- **[getting-started.md](../getting-started.md)** - Complete setup guide for new projects
- **[workflow-overview.md](../workflow-overview.md)** - System overview and components

### 🛠️ **Implementation Guides**
- **[implementation/cli-implementation.md](../implementation/cli-implementation.md)** - Complete CLI code and implementation
- **[implementation/setup-process.md](../implementation/setup-process.md)** - Step-by-step setup instructions
- **[implementation/templates.md](../implementation/templates.md)** - File templates and formats

### 📝 **Examples & Samples**
- **[examples/sample-tickets/](../examples/sample-tickets/)** - Example tickets and task management
- **[examples/sample-stories/](../examples/sample-stories/)** - Example user stories and requirements
- **[examples/sample-issues/](../examples/sample-issues/)** - Example bug reports and issue tracking
- **[examples/sample-prds/](../examples/sample-prds/)** - Example Product Requirements Documents

### 🧪 **Testing Documentation**
- **[tests/README.md](../tests/README.md)** - Testing infrastructure and guidelines
- **Automated Testing**: Jest for unit/integration tests, Playwright for E2E tests
- **CI/CD Integration**: GitHub Actions workflow for automated testing
- **Test Coverage**: Comprehensive coverage reporting and thresholds

### 🚀 **Automation & Setup**
- **[automation/setup-automated.js](../automation/setup-automated.js)** - Automated setup script
- **[automation/extract-cli.js](../automation/extract-cli.js)** - CLI code extraction utility
- **[automation/cli-implementation.md](../automation/cli-implementation.md)** - CLI implementation details

### 📋 **Project Management**
- **[tickets/](../tickets/)** - Active tickets and task management
- **[stories/](../stories/)** - User stories and requirements
- **[issues/](../issues/)** - Bug reports and issue tracking
- **[docs/prd/](../docs/prd/)** - Product Requirements Documents

## Quick Reference

### CLI Commands
```bash
# Session Management
node utils/cli.js session-start --project="Feature Name"
node utils/cli.js session-wrapup

# Reporting
node utils/cli.js status-report
node utils/cli.js sprint-report

# Ticket Management
node utils/cli.js list-tickets
node utils/cli.js pick-ticket
node utils/cli.js update-ticket --id=TICKET-001 --status="In Progress"

# Validation
node utils/cli.js validate-docs
node utils/cli.js validate-structure
node utils/cli.js qa-test

# Testing
node utils/cli.js test
npm test
npm run test:e2e
```

### Key Files
- **package.json** - Project dependencies and scripts
- **next.config.js** - Next.js configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **jest.config.js** - Jest testing configuration
- **playwright.config.js** - Playwright E2E testing configuration

### Development Workflow
1. **Setup**: Run automated setup script
2. **Session Start**: Begin development session with `session-start`
3. **Development**: Work on tickets and features
4. **Testing**: Run tests with `qa-test` or `npm test`
5. **Validation**: Validate docs and structure
6. **Session Wrap-up**: Complete session with `session-wrapup`

## Getting Help

- **CLI Help**: `node utils/cli.js --help`
- **Command Help**: `node utils/cli.js [command] --help`
- **Documentation**: Check the relevant documentation files
- **Examples**: Review sample files in the examples directory
- **Issues**: Check the issues directory for known problems

This project includes comprehensive automated testing infrastructure (Jest, Playwright, CI/CD) out of the box. See the main [README.md](../README.md) and [getting-started.md](../getting-started.md) for details on running and writing tests.
