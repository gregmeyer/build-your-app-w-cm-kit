# Create New App Using CM Kit System - v0

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-23

---

# LLM Prompt: Create New Application Using CM Kit Workflow System

You are an expert software architect and development workflow specialist. Your task is to help create a brand new application using the CM Kit workflow system. This node.js-based system is intended for use by people who want to prototype applications quickly using an AI coding assistant like Cursor. The goal is to create a framework for scalable, maintainable applications with excellent development practices.

## 🚀 Getting Started

**For new projects, start here: [getting-started.md](getting-started.md)**

This comprehensive guide will walk you through:
- Setting up your development environment (including Cursor IDE)
- Installing dependencies
- Configuring your project
- Connecting to GitHub
- Creating your first development session
- Using Cursor AI for development workflow

## Features

The CM Kit Workflow System provides a comprehensive development framework with the following key features:

### 🛠️ **CLI Development Tools**
- **18 CLI Commands** for complete workflow management
- **Session Management** with automatic logging and validation
- **Project Reporting** with status and sprint reports
- **Ticket & Issue Management** with interactive selection
- **Quality Assurance** with validation and testing commands
- **Project Archiving** with timestamped backups

### 🧪 **Testing Infrastructure**
- **Jest** for unit and integration testing
- **Playwright** for end-to-end testing
- **Test Coverage** reporting and CI/CD integration
- **Automated Testing** setup out of the box

### 📚 **Documentation System**
- **Comprehensive Documentation** pages (/docs)
- **CLI Reference** with all commands and examples
- **Workflow Guide** with step-by-step processes
- **Component Library** with usage examples
- **API Documentation** for integrations

### 🎨 **UI Components**
- **Modern UI Components** built with Tailwind CSS
- **Responsive Design** with mobile-first approach
- **Accessibility** compliant components
- **TypeScript** support for type safety

### 🔧 **Development Infrastructure**
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint & Prettier** for code quality
- **Error Handling** with proper error pages
- **Hydration Safe** components

### 📋 **Project Management**
- **PRD System** for product requirements
- **Ticket System** for task management
- **Story Tracking** for user stories
- **Issue Management** for bug tracking
- **Session Logging** for development tracking

### 🚀 **Automation**
- **Automated Setup** script for new projects
- **CLI Extraction** from documentation
- **Template System** for consistent structure
- **Demo Management** with remove/restore commands

## CLI Commands

The CM Kit Platform includes 18 powerful CLI commands for complete workflow management:

### 📋 **Session Management**
```bash
node utils/cli.js session-start --project="Feature Name"    # Start development session
node utils/cli.js session-wrapup                            # Complete session with validation
```

### 📊 **Reporting & Status**
```bash
node utils/cli.js status-report                             # Generate project status report
node utils/cli.js sprint-report                             # Generate comprehensive sprint report
```

### 🎫 **Ticket & Issue Management**
```bash
node utils/cli.js list-tickets                              # List all tickets
node utils/cli.js list-stories                              # List all user stories
node utils/cli.js list-issues                               # List all issues
node utils/cli.js pick-ticket                               # Pick ticket to work on
node utils/cli.js pick-story                                # Pick story to work on
node utils/cli.js update-ticket --id=TICKET-001 --status="In Progress"  # Update ticket
```

### ✅ **Validation & Quality**
```bash
node utils/cli.js validate-structure                        # Validate project structure
node utils/cli.js validate-docs                             # Validate documentation
node utils/cli.js check-deps                                # Check dependencies
node utils/cli.js qa-test                                   # Run comprehensive QA tests
```

### 🧪 **Testing**
```bash
node utils/cli.js test                                      # Run tests and utilities
```

### 📦 **Archiving & Demo Management**
```bash
node utils/cli.js archive-project --type=full              # Archive project components
node utils/cli.js remove-demo                               # Remove demo content
node utils/cli.js restore-demo                              # Restore demo content
```

### 📚 **Documentation**
```bash
node utils/cli.js validate-docs                             # Validate documentation completeness
```

For complete CLI documentation, see [docs/cli](src/app/docs/cli/page.tsx).

## 🤖 Automated Setup (Recommended)

**For the fastest setup experience, use the automated script: [setup-automated.js](setup-automated.js)**

This script automates all the steps in the getting-started guide and can be run directly by Cursor:

```bash
# Run the automated setup script
node automation/setup-automated.js
```

**What the automated script does:**
- ✅ Checks prerequisites (Node.js, npm, Git)
- ✅ Creates complete project structure
- ✅ Installs all dependencies (Next.js 15, TypeScript, Tailwind CSS v3, etc.)
- ✅ Extracts and configures the CLI system
- ✅ Creates all configuration files (Next.js, TypeScript, Tailwind, ESLint, Jest)
- ✅ Sets up clean homepage with admin demo
- ✅ Creates comprehensive documentation pages (CLI, Workflow, Components, API)
- ✅ Creates error handling components (error.tsx, not-found.tsx, global-error.tsx)
- ✅ Implements hydration-safe layout and components
- ✅ Creates initial ticket and agent context
- ✅ Initializes Git repository
- ✅ Tests the setup
- ✅ Provides next steps and useful commands

**Perfect for Cursor AI workflow:** Simply ask Cursor to run this script in a new project directory, and it will set up everything automatically!

> **🎯 Complete Setup:** The automated setup script creates ALL of the features listed below - the clean homepage, admin demo, documentation pages, legal pages, UI components, error handling, and more. Just run the script and you'll have a fully functional application ready for development!

## 🎨 What Comes Out of the Box

The CM Kit Workflow System now includes a **complete sample application** that demonstrates all its capabilities:

### 🧪 **Sample Test Included**
- A sample React component (`src/components/Hello.tsx`) and a corresponding test (`src/components/Hello.test.tsx`) are included out of the box.
- Run all tests with:
  ```bash
  npm test
  ```
- This ensures your test setup works and provides a template for future tests.

### 📱 **Sample Pages**
- **Clean Homepage** (`/`) - Minimal, clean landing page ready for your content
- **Admin Demo** (`/admin/demo`) - Full workflow system showcase with stats and actions
- **Blank Page Example** (`/admin/blank`) - Simple blank page with navigation, intentionally empty by design
- **Documentation** (`/docs`) - Comprehensive documentation system with:
  - **CLI Reference** (`/docs/cli`) - Complete command-line interface documentation
  - **Workflow Guide** (`/docs/workflow`) - Step-by-step development processes
  - **Component Library** (`/docs/components`) - UI components and usage examples
  - **API Documentation** (`/docs/api`) - API endpoints and integration guides
- **Legal Pages** - Professional legal compliance pages:
  - **Privacy Policy** (`/privacy`) - Comprehensive privacy policy template
  - **Security** (`/security`) - Security practices and policies
  - **Terms of Service** (`/terms`) - Standard terms and conditions
- **Error Pages** - Proper error handling with user-friendly error pages

### 🧩 **UI Components**
- **Button** - Multiple variants (primary, secondary, outline, ghost) and sizes
- **Card** - Content containers with optional headers
- **Badge** - Status indicators and labels
- **Navigation** - Simple, clean navigation with demo page options
- **Lightbox** - Modal overlay component for displaying content in focused view
- **Footer** - Comprehensive footer with legal links, resources, and CM Kit attribution

### 🛠️ **Development Tools**
- **CLI System** - 15 powerful commands for streamlined development:
  ```bash
  # Session Management
  node utils/cli.js session-start --project="Feature Name"    # Start development session
  node utils/cli.js session-wrapup                            # Complete session with validation
  
  # Reporting & Status
  node utils/cli.js status-report                             # Generate project status report
  node utils/cli.js sprint-report                             # Generate comprehensive sprint report
  
  # Ticket & Issue Management
  node utils/cli.js list-tickets                              # List all tickets
  node utils/cli.js list-stories                              # List all user stories
  node utils/cli.js list-issues                               # List all issues
  node utils/cli.js pick-ticket                               # Pick ticket to work on
  node utils/cli.js pick-story                                # Pick story to work on
  node utils/cli.js update-ticket --id=TICKET-001 --status="In Progress"  # Update ticket
  
  # Validation & Quality
  node utils/cli.js validate-structure                        # Validate project structure
  node utils/cli.js validate-docs                             # Validate documentation
  node utils/cli.js check-deps                                # Check dependencies
  node utils/cli.js qa-test                                   # Run comprehensive QA tests
  
  # Testing
  node utils/cli.js test                                      # Run tests and utilities
  
  # Archiving
  node utils/cli.js archive-project --type=full              # Archive project components
  ```
- **PRD System** - Product Requirements Documents with story generation:
  ```bash
  node utils/cli.js create-prd "Feature Name"    # Create new PRD
  node utils/cli.js list-prds                    # List all PRDs
  node utils/cli.js generate-stories [prd-id]    # Generate stories from PRD
  ```
- **Ticket System** - Structured task management with dependencies
- **Story Tracking** - User story and requirement management
- **Issue Management** - Bug tracking and problem resolution
- **Session Logging** - Automatic development session tracking
- **Demo Cleanup** - Remove sample/demo files when ready to start development:
  ```bash
  node utils/cli.js remove-demo
  ```
  This removes the admin demo page, sample components, and test files to give you a clean slate.

- **Documentation Restoration** - Restore documentation pages if accidentally removed:
  ```bash
  node utils/cli.js restore-docs
  ```
  This recreates all documentation pages (CLI, Workflow, Components, API) if they get deleted.

### 🎯 **Ready-to-Use Features**
- **Tailwind CSS v3.4.17** - Modern styling with proper PostCSS integration
- **TypeScript** - Full type safety and IntelliSense
- **Next.js 15** - Latest App Router with optimized performance
- **ESLint & Prettier** - Code quality and formatting
- **Jest Testing** - Unit and integration testing setup
- **Error Handling** - Proper error.tsx, not-found.tsx, global-error.tsx components
- **Hydration Safe** - No hydration mismatches or client/server rendering issues

### 🧪 Automated Testing & CI/CD

- **Comprehensive Testing**: All new projects include a complete automated testing infrastructure out of the box.
- **Unit & Integration Tests**: Powered by **Jest** and **React Testing Library**. Test all components, utilities, and CLI commands.
- **End-to-End (E2E) Tests**: Powered by **Playwright**. Test user workflows, navigation, accessibility, and cross-browser compatibility.
- **Test Coverage**: Jest coverage reporting is enabled by default. Aim for 70%+ coverage.
- **CI/CD Integration**: GitHub Actions workflow runs all tests (unit, integration, E2E) on every push/PR
- **Deprecation Warning Suppression**: `.npmrc` and `package.json` overrides prevent common npm deprecation warnings
- **Test Directory Structure**:
  ```
  tests/
  ├── unit/           # Unit tests for components, utils, CLI
  ├── integration/    # Integration tests for pages, workflows
  ├── e2e/            # End-to-end Playwright tests
  └── utils/          # Test helpers and utilities
  ```
- **Test Commands**:
  ```bash
  npm test                 # Run all unit/integration tests
  npm run test:watch       # Watch mode for Jest
  npm run test:coverage    # Run tests with coverage
  npm run test:e2e         # Run E2E tests (Playwright)
  npm run test:e2e:ui      # E2E tests with UI
  npm run test:all         # Run all tests (unit + E2E)
  npm run test:ci          # Run all tests for CI
  ```
- **Sample Tests**: Provided for all major components and workflows. See [tests/README.md](tests/README.md) for details.
- **CI/CD**: `.github/workflows/ci.yml` runs all tests and uploads coverage on every push/PR.

## Your Role
You will act as a **Development Workflow Architect** who will:
1. Guide the user through initializing a new project using the CM Kit workflow system
2. Set up the complete development infrastructure with actual working code
3. Create the foundational documentation and project structure
4. Establish the workflow patterns that will be used throughout development

## File Structure

This directory contains all the components needed to set up a new application using the CM Kit workflow system:

### 📋 Core Documentation
- **[README.md](README.md)** - This file: Main prompt and overview
- **[getting-started.md](getting-started.md)** - Complete setup guide for new projects
- **[workflow-overview.md](workflow-overview.md)** - System overview and components

### 🚀 Quick Start & Automation
- **automation/setup-automated.js** - Automated setup script (recommended for Cursor)
- **automation/extract-cli.js** - CLI code extraction utility

### 📚 Implementation Guides
- **implementation/cli-implementation.md** - Complete CLI code and implementation
- **implementation/setup-process.md** - Step-by-step setup instructions
- **implementation/templates.md** - File templates and formats

### 📝 Examples
- **examples/sample-tickets/** - Example tickets
- **examples/sample-stories/** - Example user stories
- **examples/sample-issues/** - Example bug/issue reports

## CM Kit Workflow System Overview

The CM Kit workflow system consists of **six core components** that work together to create a robust development environment:

### 1. Product Requirements Documents (PRDs)
- **Structured product documentation** with standardized templates
- **User story generation** from PRDs to tickets
- **Requirements tracking** with clear acceptance criteria
- **Status management** from draft to completion
- **CLI integration** for creating, listing, and managing PRDs
- **Template system** for consistent documentation

### 2. CLI Tools (15 Commands)
- **Session Management**: Start and complete development sessions with validation
- **Reporting & Status**: Generate comprehensive project and sprint reports
- **Ticket & Issue Management**: List, pick, and update tickets and stories
- **Validation & Quality**: Validate structure, docs, dependencies, and run QA tests
- **Testing**: Execute tests and provide testing utilities
- **Archiving**: Create timestamped backups of project components
- **Automatic session logging and audit trails**
- **Real-time status reporting and project health checks**
- **Extensible command system for custom workflows**

### 3. Ticket System
- Development task management with clear lifecycle
- Dependency tracking to ensure proper development order
- Priority management and critical path identification
- Structured format for consistent task documentation

### 4. Story System
- User story and requirement tracking
- Acceptance criteria and definition of done
- Story point estimation and priority management
- Categorized organization (Foundation, File Management, Payment, Processing, etc.)

### 5. Issue Management
- Bug tracking and problem resolution
- Root cause analysis and prevention measures
- Structured issue lifecycle from identification to resolution
- Impact assessment and priority management

### 6. Agent Context System
- AI assistant guidance and project status
- Comprehensive project information for efficient development
- Implementation context and technical patterns
- Real-time status updates and readiness assessment

## Success Criteria

The setup is successful when:
✅ All 15 CLI commands execute without errors:
  - session-start, session-wrapup
  - status-report, sprint-report
  - list-tickets, list-stories, list-issues
  - pick-ticket, pick-story, update-ticket
  - validate-structure, validate-docs, check-deps, qa-test
  - test, archive-project
✅ Session start/end workflows function properly with documentation validation
✅ Status and sprint reporting provides accurate project metrics
✅ Ticket and story listing works correctly with interactive selection
✅ Validation commands identify issues appropriately
✅ QA testing runs comprehensive checks (linting, type checking, unit tests, E2E)
✅ Session logging creates detailed markdown logs
✅ Archive project command creates proper timestamped backups
✅ Clean homepage renders correctly
✅ Admin demo page shows full workflow capabilities
✅ Blank page example demonstrates basic layout structure
✅ Error pages handle errors gracefully
✅ Footer displays with legal links and CM Kit attribution
✅ Legal pages (Privacy, Security, Terms) are accessible
✅ No hydration mismatches or client/server rendering issues
✅ Navigation works seamlessly with both demo options
✅ Documentation pages (/docs/cli, /docs/workflow) are comprehensive and up-to-date

## Key Implementation Notes

1. **File Dependencies**: The CLI commands expect specific directory structures and file naming conventions
2. **Error Handling**: The system includes proper error handling with dedicated error components
3. **Extensibility**: The command system is designed to be easily extended with new commands
4. **Logging**: All operations are logged for debugging and audit purposes
5. **Session Logging**: Automatic creation of detailed markdown logs for each development session
6. **Archive System**: Configuration backup and restoration capabilities for project safety
7. **UI Components**: Reusable components built with Tailwind CSS for consistent design
8. **Clean Architecture**: Simple, clean homepage with admin demo showcasing capabilities
9. **Demo Options**: Both comprehensive demo and simple blank page for different use cases
10. **Legal Compliance**: Professional footer with legal pages (Privacy, Security, Terms) for compliance
11. **CM Kit Attribution**: Automatic "Built with CM Kit" attribution linking to GitHub repository
12. **Hydration Safe**: All components are designed to avoid hydration mismatches
13. **Next.js 15 Ready**: Fully compatible with the latest Next.js features
14. **Comprehensive Testing**: Full testing infrastructure with Jest and Playwright
15. **Quality Assurance**: Built-in QA testing with linting, type checking, and test coverage

---

**Version**: v0  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-23  
**Status**: Ready for Use

## 🐛 Reporting Issues

If you encounter any problems or have suggestions for improvements, we'd love to hear from you! Here's how to report issues:

### 📝 **Issue Reporting Guidelines**

1. **Check Existing Issues**: Before creating a new issue, please check the [GitHub Issues](https://github.com/[username]/build-app-cm-kit/issues) to see if your problem has already been reported.

2. **Create a GitHub Issue**: Use the GitHub Issues feature to report bugs or request features:
   - Go to the [Issues tab](https://github.com/[username]/build-app-cm-kit/issues)
   - Click "New Issue"
   - Choose the appropriate issue template (Bug Report or Feature Request)

3. **Issue Template**: When creating an issue, please include the following information:
   ```markdown
   ## 🐛 Problem Description
   [Describe what happened and what you expected to happen]

   ## 🔍 Steps to Reproduce
   1. [Step 1]
   2. [Step 2]
   3. [Step 3]

   ## 📋 Environment
   - **OS**: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]
   - **Node.js Version**: [e.g., v18.17.0]
   - **CM Kit Version**: [e.g., v0]
   - **Browser**: [if applicable]

   ## 📸 Screenshots/Logs
   [Include any relevant screenshots, error messages, or console logs]

   ## 💡 Expected Behavior
   [Describe what you expected to happen]

   ## 🔧 Additional Context
   [Any other information that might be helpful]
   ```

4. **CLI Issues**: If you're experiencing problems with CLI commands, please include:
   - The exact command you ran
   - The complete error output
   - Your current working directory
   - The contents of relevant configuration files

5. **Labels**: Use appropriate labels when creating issues:
   - `bug` - For bug reports
   - `enhancement` - For feature requests
   - `documentation` - For documentation issues
   - `cli` - For CLI-related problems
   - `ui` - For user interface issues

### 🚀 **Getting Help**

- **Documentation**: Check the [documentation pages](./docs/) for detailed guides
- **CLI Help**: Run `node utils/cli.js help` for available commands
- **Examples**: Review the [examples directory](./examples/) for usage patterns

### 📞 **Support Channels**

- **GitHub Issues**: [Create issues in the project repository](https://github.com/[username]/build-app-cm-kit/issues)
- **Documentation**: Check `/docs` pages in the running application
- **CLI Commands**: Use built-in help and status reporting commands

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ **Commercial Use**: Can be used in commercial/paid applications
- ✅ **Modification**: Can modify and adapt the code
- ✅ **Distribution**: Can distribute the code (original or modified)
- ✅ **Private Use**: Can use in private/proprietary projects
- ✅ **Sublicensing**: Can license it under different terms

**Requirement:** The original MIT License and copyright notice must be included in any substantial portions of the software that are used.

---

**CM Kit Workflow System** - A comprehensive development workflow framework for building scalable, maintainable applications with excellent development practices. 