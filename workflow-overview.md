# Coffee Money Workflow System Overview

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

---

# Coffee Money Workflow System Overview

The Coffee Money workflow system consists of five core components that work together to create a robust development environment:

## 1. CLI Tools

### Purpose
- Automated project management and validation
- Session management (start/end development sessions)
- Real-time status reporting and project health checks
- Extensible command system for custom workflows
- **Automatic session logging and audit trails**

### Key Features
- **Session Management**: Start and end development sessions with validation
- **Status Reporting**: Real-time project metrics and health checks
- **Validation**: Automated consistency checks for tickets, stories, and issues
- **Extensibility**: Easy to add new commands and workflows
- **Session Logging**: Automatic creation of detailed markdown logs for each development session

### Core Commands
- `session-start` - Begin development session with validation
- `session-wrapup` - End session with status report, cleanup, and automatic logging
- `status-report` - Generate comprehensive project status
- `list-tickets` - Show all tickets with status and priority
- `list-stories` - Show all user stories with status
- `list-issues` - Show all open issues and bugs
- `pick-ticket` - Select next ticket to work on
- `pick-story` - Select next story to implement

### Session Logging System
The CLI automatically creates detailed markdown logs for each development session:

- **Automatic Logging**: Every `session-wrapup` command creates a timestamped log file
- **Log Location**: `logs/session-complete-log-YYYY-MM-DD-XX.md`
- **Auto-numbering**: Sessions numbered sequentially per day (01, 02, 03, etc.)
- **Complete Capture**: All console output during session wrap-up is captured
- **Professional Format**: Clean markdown with sections, metadata, and summaries
- **Audit Trail**: Complete history of all development activities

#### Log File Features
- **Session Metadata**: Date, session number, duration, filename
- **Complete Output**: Full console output in code blocks
- **Session Summary**: Key metrics and status indicators
- **Professional Format**: Ready for documentation and review
- **Searchable**: Easy to find specific sessions or issues

## 2. Ticket System

### Purpose
- Development task management with clear lifecycle
- Dependency tracking to ensure proper development order
- Priority management and critical path identification
- Structured format for consistent task documentation

### Ticket Lifecycle
1. **Not Started** - Ticket created but not yet begun
2. **In Progress** - Active development work
3. **Review** - Ready for code review and testing
4. **Complete** - Finished and deployed

### Priority Levels
- 🔴 **High** - Critical path, blocking other work
- 🟡 **Medium** - Important but not blocking
- 🟢 **Low** - Nice to have, can be deferred

### Ticket Format
```markdown
# TICKET-001: Ticket Title

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Review
- [ ] Complete

## Priority
🔴 High | 🟡 Medium | 🟢 Low

## Description
Detailed description of the task...

## Dependencies
- TICKET-002: Dependency description
- TICKET-003: Another dependency

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Notes
Additional notes and context...
```

## 3. Story System

### Purpose
- User story and requirement tracking
- Acceptance criteria and definition of done
- Story point estimation and priority management
- Categorized organization (Foundation, File Management, Payment, Processing, etc.)

### Story Categories
- **Foundation** - Core infrastructure and setup
- **Authentication** - User authentication and authorization
- **File Management** - File upload, storage, and processing
- **Payment** - Payment processing and billing
- **Analytics** - User analytics and reporting
- **Admin** - Administrative features and tools

### Story Status
- ✅ **Complete** - Story fully implemented
- 🔄 **In Progress** - Currently being developed
- ❌ **Not Started** - Not yet begun

### Story Format
```markdown
# STORY-001: User Story Title

## Category
Foundation | Authentication | File Management | Payment | Analytics | Admin

## Status
✅ Complete | 🔄 In Progress | ❌ Not Started

## Priority
🔴 High | 🟡 Medium | 🟢 Low

## Description
As a [user type], I want [feature] so that [benefit].

## Acceptance Criteria
- [ ] Given [context], when [action], then [result]
- [ ] Given [context], when [action], then [result]

## Story Points
1 | 2 | 3 | 5 | 8 | 13

## Notes
Additional context and implementation notes...
```

## 4. Issue Management

### Purpose
- Bug tracking and problem resolution
- Root cause analysis and prevention measures
- Structured issue lifecycle from identification to resolution
- Impact assessment and priority management

### Issue Lifecycle
1. **Open** - Issue identified and logged
2. **In Progress** - Being investigated or fixed
3. **Resolved** - Issue fixed and verified

### Issue Severity
- 🔴 **Critical** - System breaking, immediate attention required
- 🟡 **High** - Major functionality affected
- 🟢 **Medium** - Minor functionality affected
- ⚪ **Low** - Cosmetic or minor issues

### Issue Format
```markdown
# BUG-001: Bug Title

## Status
- [ ] Open
- [x] In Progress
- [ ] Resolved

## Severity
🔴 Critical | 🟡 High | 🟢 Medium | ⚪ Low

## Description
Detailed description of the bug...

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen...

## Actual Behavior
What actually happens...

## Environment
- Browser: Chrome 120.0
- OS: macOS 14.0
- Version: 1.0.0

## Root Cause
Analysis of why this happened...

## Prevention
How to prevent this in the future...

## Resolution
How the issue was resolved...
```

## 5. Agent Context System

### Purpose
- AI assistant guidance and project status
- Comprehensive project information for efficient development
- Implementation context and technical patterns
- Real-time status updates and readiness assessment

### Key Sections
- **Project Overview** - High-level project information
- **Current Status** - Real-time project metrics
- **Ready-to-Pick Tickets** - Available work items
- **Blocked Tickets** - Items waiting for dependencies
- **Implementation Context** - Technical patterns and conventions
- **Development Environment** - Setup and configuration
- **Recent Changes** - Latest updates and modifications

### Context File Structure
```markdown
# Agent Context

## Project Overview
Brief description of the project...

## Current Status
- Tickets: 15 total, 8 complete, 5 in progress, 2 not started
- Stories: 12 total, 6 complete, 4 in progress, 2 not started
- Issues: 3 open, 1 in progress, 8 resolved

## Ready-to-Pick Tickets
- TICKET-010: Next available ticket
- TICKET-011: Another available ticket

## Blocked Tickets
- TICKET-012: Waiting for TICKET-010
- TICKET-013: Waiting for external dependency

## Implementation Context
Technical patterns and conventions...

## Development Environment
Setup and configuration details...

## Recent Changes
Latest updates and modifications...
```

## System Integration

### How Components Work Together
1. **CLI Tools** orchestrate the entire workflow
2. **Tickets** track individual development tasks
3. **Stories** provide user-focused requirements
4. **Issues** handle problems and bugs
5. **Agent Context** provides AI assistant guidance
6. **Session Logs** provide complete audit trail

### Workflow Patterns
1. **Session Start**: Validate project state, check readiness
2. **Development**: Pick tickets/stories, implement features
3. **Issue Resolution**: Identify and fix problems
4. **Session End**: Report progress, update context, create session log
5. **Continuous Validation**: Ensure consistency and quality
6. **Audit Trail**: Maintain complete history of all activities

### Success Metrics
- **Velocity**: Tickets completed per session
- **Quality**: Issues resolved vs. new issues created
- **Consistency**: Validation check pass rates
- **Efficiency**: Time from ticket creation to completion
- **Documentation**: Complete session logs for all development activities

### Session Logging Benefits
- **Complete History**: Every development session is documented
- **Debugging Support**: Easy to review problematic sessions
- **Progress Tracking**: Visual record of project evolution
- **Professional Documentation**: Clean, searchable markdown logs
- **Audit Compliance**: Complete trail for compliance and review

---

**Version**: v0  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Ready for Use 