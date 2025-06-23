# Setup Process

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

---

# Initial Setup Process

This document provides step-by-step instructions for setting up a new application using the Coffee Money workflow system.

## Prerequisites

Before starting, ensure you have:
- Node.js (v18 or higher)
- Git initialized in your project
- Basic familiarity with command line tools

## Step 1: Create Project Structure

Create the essential directory structure for the Coffee Money workflow system:

```bash
# Create project directories
mkdir -p {tickets,stories,issues,docs,utils/commands,utils/lib,logs}

# Create essential files
touch docs/README.md
touch tickets/AGENT-CONTEXT.md
touch stories/README.md
touch issues/README.md
```

**Note**: The `logs/` directory is automatically created by the CLI when needed, but you can create it manually for better organization.

## Step 2: Copy CLI Implementation

Copy the CLI code from `cli-implementation.md` into the appropriate files in your project:

### 2.1 Main CLI Entry Point
Create `utils/cli.js` with the main CLI code.

### 2.2 Logger Utility
Create `utils/lib/logger.js` with the logger implementation.

### 2.3 Core Commands
Create the following command files in `utils/commands/`:
- `session-start.js`
- `status-report.js`
- `list-tickets.js`
- `list-stories.js`
- `list-issues.js`
- `session-wrapup.js`
- `pick-ticket.js`
- `pick-story.js`
- `update-ticket.js`
- `validate-structure.js`
- `test.js`
- `qa-test.js`

## Step 3: Create Initial Documentation

### 3.1 Project README
Create a comprehensive `README.md` in your project root:

```markdown
# Your Project Name

## Overview
Brief description of your project...

## Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Generate status report
node utils/cli.js status-report
```

## Development Workflow
This project uses the Coffee Money workflow system. See `docs/create-new-app/` for setup instructions.

## Available Commands
- `node utils/cli.js session-start` - Start development session
- `node utils/cli.js status-report` - Generate project status
- `node utils/cli.js list-tickets` - Show all tickets
- `node utils/cli.js pick-ticket` - Select next ticket to work on
```

### 3.2 Agent Context
Create `tickets/AGENT-CONTEXT.md` with initial project context:

```markdown
# Agent Context

## Project Overview
[Your project description]

## Current Status
- Tickets: 0 total, 0 complete, 0 in progress, 0 not started
- Stories: 0 total, 0 complete, 0 in progress, 0 not started
- Issues: 0 open, 0 in progress, 0 resolved

## Ready-to-Pick Tickets
[Will be populated as tickets are created]

## Blocked Tickets
[Will be populated as dependencies are identified]

## Implementation Context
[Technical patterns and conventions for your project]

## Development Environment
[Setup and configuration details]

## Recent Changes
[Latest updates and modifications]

## Last Updated
📅 [Current Date]
```

### 3.3 Directory READMEs
Create README files for each directory:

#### `tickets/README.md`
```markdown
# Tickets

This directory contains development tickets for the project.

## Format
See `docs/create-new-app/templates.md` for ticket format specifications.

## Naming Convention
- TICKET-001: First ticket
- TICKET-002: Second ticket
- etc.

## Status Tracking
- Not Started: Ticket created but not begun
- In Progress: Active development work
- Review: Ready for code review
- Complete: Finished and deployed
```

#### `stories/README.md`
```markdown
# User Stories

This directory contains user stories for the project.

## Format
See `docs/create-new-app/templates.md` for story format specifications.

## Categories
- Foundation: Core infrastructure
- Authentication: User auth and authorization
- File Management: File upload and storage
- Payment: Payment processing
- Analytics: User analytics
- Admin: Administrative features

## Status Tracking
- Not Started: Story not yet begun
- In Progress: Currently being developed
- Complete: Fully implemented
```

#### `issues/README.md`
```markdown
# Issues

This directory contains bug reports and issues for the project.

## Format
See `docs/create-new-app/templates.md` for issue format specifications.

## Severity Levels
- Critical: System breaking, immediate attention
- High: Major functionality affected
- Medium: Minor functionality affected
- Low: Cosmetic or minor issues

## Status Tracking
- Open: Issue identified and logged
- In Progress: Being investigated or fixed
- Resolved: Issue fixed and verified
```

## Step 4: Test the System

Verify that the CLI system is working correctly:

```bash
# Test CLI help
node utils/cli.js help

# Test session start
node utils/cli.js session-start

# Test status report
node utils/cli.js status-report

# Test ticket listing
node utils/cli.js list-tickets
```

## Step 5: Session Logging Features

The Coffee Money workflow system includes automatic session logging that creates detailed markdown logs for each development session:

### Automatic Session Logs
- **Location**: `logs/session-complete-log-YYYY-MM-DD-XX.md`
- **Auto-numbering**: Sessions numbered sequentially per day (01, 02, 03, etc.)
- **Complete Capture**: All console output during session wrap-up is captured
- **Professional Format**: Clean markdown with sections, metadata, and summaries

### Testing Session Logging
```bash
# Run a session wrap-up to test logging
node utils/cli.js session-wrapup

# Check the logs directory for generated files
ls -la logs/

# View a session log
cat logs/session-complete-log-$(date +%Y-%m-%d)-01.md
```

### Log File Structure
Each session log includes:
- **Session Information**: Date, session number, duration, filename
- **Complete Output**: Full console output in code blocks
- **Session Summary**: Key metrics and status indicators
- **Professional Format**: Ready for documentation and review

### Benefits
- **Audit Trail**: Complete history of all development sessions
- **Debugging**: Easy to review what happened during problematic sessions
- **Progress Tracking**: Visual record of project progress over time
- **Documentation**: Automatic documentation of development activities
- **Professional**: Clean, readable markdown format for easy review

## Step 6: Create Initial Tickets and Stories

### 6.1 Foundation Tickets
Create initial tickets for project setup:

```bash
# Create foundation tickets
touch tickets/TICKET-001-nextjs-foundation.md
touch tickets/TICKET-002-authentication-system.md
touch tickets/TICKET-003-basic-ui-setup.md
```

### 6.2 Foundation Stories
Create initial user stories:

```bash
# Create foundation stories
touch stories/STORY-001-user-can-sign-in.md
touch stories/STORY-002-nextjs-application.md
touch stories/STORY-003-basic-navigation.md
```

## Step 7: Initialize Git Repository

If not already done, initialize and configure Git:

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial setup with Coffee Money workflow system"

# Create .gitignore
echo "node_modules/
.env
.env.local
logs/
coverage/
.DS_Store" > .gitignore
```

## Step 8: Validate Setup

Run comprehensive validation:

```bash
# Start development session
node utils/cli.js session-start

# Generate status report
node utils/cli.js status-report

# Validate project structure
node utils/cli.js validate-structure
```

## Step 9: Begin Development

Start your first development session:

```bash
# Start session
node utils/cli.js session-start

# Pick a ticket to work on
node utils/cli.js pick-ticket

# Begin development work...
```

## Troubleshooting

### Common Issues

#### CLI Commands Not Found
- Ensure all command files are in `utils/commands/`
- Check that command files export `{ description, run }`
- Verify file permissions are executable

#### Missing Dependencies
- Install required Node.js packages
- Check that all import paths are correct
- Verify file structure matches expectations

#### Validation Errors
- Check ticket/story format matches templates
- Ensure all required sections are present
- Verify naming conventions are followed

### Getting Help

If you encounter issues:
1. Check the error messages for specific details
2. Review the file formats in `templates.md`
3. Verify your project structure matches the expected layout
4. Run validation commands to identify specific problems

## Success Criteria

The setup is successful when:
✅ All CLI commands execute without errors
✅ Session start/end workflows function properly
✅ Status reporting provides accurate project metrics
✅ Ticket and story listing works correctly
✅ Validation commands identify issues appropriately
✅ Session logging creates detailed markdown logs
✅ Git repository is properly initialized
✅ Initial documentation is in place

## Next Steps

After successful setup:
1. Create your first development tickets
2. Define user stories for your application
3. Begin implementing features using the workflow
4. Use session management for consistent development
5. Regularly update status and context

---

**Version**: v0  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Ready for Use 