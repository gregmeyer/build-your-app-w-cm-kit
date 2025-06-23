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
- ✅ Creates error handling components (error.tsx, not-found.tsx, global-error.tsx)
- ✅ Implements hydration-safe layout and components
- ✅ Creates initial ticket and agent context
- ✅ Initializes Git repository
- ✅ Tests the setup
- ✅ Provides next steps and useful commands

**Perfect for Cursor AI workflow:** Simply ask Cursor to run this script in a new project directory, and it will set up everything automatically!

## 🎨 What Comes Out of the Box

The Coffee Money Workflow System now includes a **complete sample application** that demonstrates all its capabilities:

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
- **Error Pages** - Proper error handling with user-friendly error pages

### 🧩 **UI Components**
- **Button** - Multiple variants (primary, secondary, outline, ghost) and sizes
- **Card** - Content containers with optional headers
- **Badge** - Status indicators and labels
- **Navigation** - Simple, clean navigation in the layout

### 🛠️ **Development Tools**
- **CLI System** - Session management, ticket listing, status reports
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

### 🎯 **Ready-to-Use Features**
- **Tailwind CSS v3.4.17** - Modern styling with proper PostCSS integration
- **TypeScript** - Full type safety and IntelliSense
- **Next.js 15** - Latest App Router with optimized performance
- **ESLint & Prettier** - Code quality and formatting
- **Jest Testing** - Unit and integration testing setup
- **Error Handling** - Proper error.tsx, not-found.tsx, global-error.tsx components
- **Hydration Safe** - No hydration mismatches or client/server rendering issues

## Your Role
You will act as a **Development Workflow Architect** who will:
1. Guide the user through initializing a new project using the Coffee Money workflow system
2. Set up the complete development infrastructure with actual working code
3. Create the foundational documentation and project structure
4. Establish the workflow patterns that will be used throughout development

## File Structure

This directory contains all the components needed to set up a new application using the Coffee Money workflow system:

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

## Coffee Money Workflow System Overview

The Coffee Money workflow system consists of **six core components** that work together to create a robust development environment:

### 1. Product Requirements Documents (PRDs)
- **Structured product documentation** with standardized templates
- **User story generation** from PRDs to tickets
- **Requirements tracking** with clear acceptance criteria
- **Status management** from draft to completion
- **CLI integration** for creating, listing, and managing PRDs
- **Template system** for consistent documentation

### 2. CLI Tools
- Automated project management and validation
- Session management (start/end development sessions)
- Real-time status reporting and project health checks
- Extensible command system for custom workflows
- **Automatic session logging and audit trails**

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
✅ All CLI commands execute without errors
✅ Session start/end workflows function properly
✅ Status reporting provides accurate project metrics
✅ Ticket and story listing works correctly
✅ Validation commands identify issues appropriately
✅ Session logging creates detailed markdown logs
✅ Clean homepage renders correctly
✅ Admin demo page shows full workflow capabilities
✅ Error pages handle errors gracefully
✅ No hydration mismatches or client/server rendering issues
✅ Navigation works seamlessly

## Key Implementation Notes

1. **File Dependencies**: The CLI commands expect specific directory structures and file naming conventions
2. **Error Handling**: The system includes proper error handling with dedicated error components
3. **Extensibility**: The command system is designed to be easily extended with new commands
4. **Logging**: All operations are logged for debugging and audit purposes
5. **Session Logging**: Automatic creation of detailed markdown logs for each development session
6. **UI Components**: Reusable components built with Tailwind CSS for consistent design
7. **Clean Architecture**: Simple, clean homepage with admin demo showcasing capabilities
8. **Hydration Safe**: All components are designed to avoid hydration mismatches
9. **Next.js 15 Ready**: Fully compatible with the latest Next.js features

---

**Version**: v0  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-23  
**Status**: Ready for Use

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

**Coffee Money Workflow System** - A comprehensive development workflow framework for building scalable, maintainable applications with excellent development practices. 