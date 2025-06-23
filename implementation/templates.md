# File Templates and Formats

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

---

# File Templates and Formats

This document provides templates and format specifications for all file types used in the Coffee Money workflow system.

## Ticket Templates

### Standard Ticket Format

```markdown
# TICKET-001: Ticket Title

## Created
📅 YYYY-MM-DD

## Last Updated
📅 YYYY-MM-DD

## Status
- [ ] Not Started
- [x] In Progress
- [ ] Review
- [ ] Complete

## Priority
🔴 High | 🟡 Medium | 🟢 Low

## Description
Detailed description of the task, including:
- What needs to be done
- Why it's important
- Expected outcomes

## Dependencies
- TICKET-002: Dependency description
- TICKET-003: Another dependency
- None

## Acceptance Criteria
- [ ] Criterion 1: Specific, measurable outcome
- [ ] Criterion 2: Another specific outcome
- [ ] Criterion 3: Final acceptance criterion

## Implementation Notes
- Technical approach
- Key considerations
- Potential challenges

## Testing
- [ ] Unit tests written
- [ ] Integration tests written
- [ ] Manual testing completed
- [ ] Code review completed

## Notes
Additional notes, context, or references...

---

**Version**: v1  
**Created**: YYYY-MM-DD  
**Last Updated**: YYYY-MM-DD  
**Status**: [Current Status]
```

### Foundation Ticket Example

```markdown
# TICKET-001: Next.js Foundation Setup

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Review
- [ ] Complete

## Priority
🔴 High

## Description
Set up the foundational Next.js application with:
- Next.js 14+ with App Router
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
- Use `create-next-app` with TypeScript template
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
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Not Started
```

## Story Templates

### Standard Story Format

```markdown
# STORY-001: User Story Title

## Created
📅 YYYY-MM-DD

## Last Updated
📅 YYYY-MM-DD

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
- [ ] Given [context], when [action], then [result]

## Story Points
1 | 2 | 3 | 5 | 8 | 13

## Dependencies
- STORY-002: Dependency description
- TICKET-001: Related ticket
- None

## Implementation Notes
- Technical approach
- User experience considerations
- Integration points

## Testing Scenarios
- [ ] Happy path testing
- [ ] Edge case testing
- [ ] Error handling testing
- [ ] User acceptance testing

## Notes
Additional context, user research, or design considerations...

---

**Version**: v1  
**Created**: YYYY-MM-DD  
**Last Updated**: YYYY-MM-DD  
**Status**: [Current Status]
```

### Authentication Story Example

```markdown
# STORY-001: User Can Sign In with Google

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

## Category
Authentication

## Status
❌ Not Started

## Priority
🔴 High

## Description
As a user, I want to sign in with my Google account so that I can access the application securely without creating a new account.

## Acceptance Criteria
- [ ] Given I'm on the sign-in page, when I click "Sign in with Google", then I'm redirected to Google OAuth
- [ ] Given I'm on Google OAuth, when I authorize the application, then I'm redirected back and signed in
- [ ] Given I'm signed in, when I visit the application, then I see my profile information
- [ ] Given I'm signed in, when I click "Sign out", then I'm signed out and redirected to the sign-in page

## Story Points
5

## Dependencies
- TICKET-001: Next.js Foundation Setup
- TICKET-002: Authentication System

## Implementation Notes
- Use NextAuth.js for OAuth integration
- Configure Google OAuth credentials
- Implement session management
- Add sign-out functionality

## Testing Scenarios
- [ ] Google OAuth flow works correctly
- [ ] Session persistence across page reloads
- [ ] Sign-out functionality works
- [ ] Error handling for OAuth failures

## Notes
This is a critical user story for user onboarding and security.

---

**Version**: v1  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Not Started
```

## Issue Templates

### Standard Issue Format

```markdown
# BUG-001: Bug Title

## Created
📅 YYYY-MM-DD

## Last Updated
📅 YYYY-MM-DD

## Status
- [ ] Open
- [x] In Progress
- [ ] Resolved

## Severity
🔴 Critical | 🟡 High | 🟢 Medium | ⚪ Low

## Description
Detailed description of the bug, including:
- What the bug is
- When it occurs
- Impact on users or system

## Steps to Reproduce
1. Step 1: Specific action
2. Step 2: Another action
3. Step 3: Final action
4. Observe the bug

## Expected Behavior
What should happen when following the steps above.

## Actual Behavior
What actually happens when following the steps above.

## Environment
- Browser: [Browser and version]
- OS: [Operating system and version]
- Version: [Application version]
- Device: [Device type if relevant]

## Root Cause
Analysis of why this bug occurred:
- Technical explanation
- Contributing factors
- Related issues

## Prevention
How to prevent this bug in the future:
- Code review improvements
- Testing enhancements
- Process changes

## Resolution
How the issue was resolved:
- Code changes made
- Testing performed
- Verification steps

## Related
- TICKET-XXX: Related ticket
- STORY-XXX: Related story
- BUG-XXX: Related bug

## Notes
Additional context, workarounds, or follow-up actions...

---

**Version**: v1  
**Created**: YYYY-MM-DD  
**Last Updated**: YYYY-MM-DD  
**Status**: [Current Status]
```

### Critical Bug Example

```markdown
# BUG-001: Application Crashes on Login

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

## Status
- [x] Open
- [ ] In Progress
- [ ] Resolved

## Severity
🔴 Critical

## Description
The application crashes with a 500 error when users attempt to sign in with Google OAuth. This prevents all users from accessing the application.

## Steps to Reproduce
1. Navigate to the application homepage
2. Click "Sign in with Google"
3. Complete Google OAuth authorization
4. Application crashes with 500 error

## Expected Behavior
User should be successfully signed in and redirected to the dashboard.

## Actual Behavior
Application crashes with 500 Internal Server Error.

## Environment
- Browser: Chrome 120.0, Firefox 119.0, Safari 17.0
- OS: macOS 14.0, Windows 11, Ubuntu 22.04
- Version: 1.0.0
- Device: Desktop and mobile

## Root Cause
Initial analysis suggests the issue is related to:
- Missing environment variables for OAuth configuration
- Incorrect callback URL configuration
- Database connection issues during user creation

## Prevention
- Add environment variable validation on startup
- Implement proper error handling in OAuth flow
- Add integration tests for authentication flow

## Resolution
[To be filled when resolved]

## Related
- TICKET-002: Authentication System
- STORY-001: User Can Sign In with Google

## Notes
This is blocking all user access to the application and needs immediate attention.

---

**Version**: v1  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Open
```

## Agent Context Template

### Standard Agent Context Format

```markdown
# Agent Context

## Created
📅 YYYY-MM-DD

## Last Updated
📅 YYYY-MM-DD

## Project Overview
Brief description of the project, its purpose, and key features.

## Current Status
- Tickets: X total, Y complete, Z in progress, W not started
- Stories: X total, Y complete, Z in progress, W not started
- Issues: X open, Y in progress, Z resolved

## Ready-to-Pick Tickets
- TICKET-XXX: Brief description
- TICKET-XXX: Brief description

## Blocked Tickets
- TICKET-XXX: Waiting for TICKET-XXX
- TICKET-XXX: Waiting for external dependency

## Implementation Context
Technical patterns, conventions, and architecture decisions:
- Framework and technology stack
- Code organization patterns
- Testing strategies
- Deployment approach

## Development Environment
Setup and configuration details:
- Required software and versions
- Environment variables
- Local development setup
- Testing environment

## Recent Changes
Latest updates and modifications:
- Recent commits and their impact
- New features added
- Bugs fixed
- Infrastructure changes

## Next Steps
Immediate priorities and recommendations:
- What to work on next
- Critical path items
- Risk areas to address

## Notes
Additional context, reminders, or important information...

---

**Version**: v1  
**Created**: YYYY-MM-DD  
**Last Updated**: YYYY-MM-DD  
**Status**: Active
```

## File Naming Conventions

### Tickets
- Format: `TICKET-XXX-descriptive-title.md`
- Example: `TICKET-001-nextjs-foundation.md`
- Numbering: Sequential starting from 001

### Stories
- Format: `STORY-XXX-descriptive-title.md`
- Example: `STORY-001-user-can-sign-in.md`
- Numbering: Sequential starting from 001

### Issues
- Format: `BUG-XXX-descriptive-title.md`
- Example: `BUG-001-application-crashes-on-login.md`
- Numbering: Sequential starting from 001

### Documentation
- Format: `descriptive-title.md`
- Example: `project-setup-guide.md`
- Use kebab-case for multi-word titles

## Metadata Standards

### Required Metadata
All files should include:
- Created date
- Last updated date
- Version number
- Status

### Optional Metadata
- Author (for collaborative projects)
- Reviewers (for code review processes)
- Tags (for categorization)
- Estimates (for time tracking)

## Validation Rules

### Ticket Validation
- Must have Status section with checkboxes
- Must have Priority section with emoji indicators
- Must have Description section
- Must follow naming convention

### Story Validation
- Must have Category section
- Must have Status section with emoji indicators
- Must have Description in user story format
- Must have Acceptance Criteria section

### Issue Validation
- Must have Status section with checkboxes
- Must have Severity section with emoji indicators
- Must have Steps to Reproduce section
- Must have Expected vs Actual Behavior sections

---

**Version**: v1  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Ready for Use 