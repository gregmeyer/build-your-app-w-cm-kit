#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createTicket(title, description, priority = 'Medium') {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Get the next ticket number
  const ticketsDir = 'tickets';
  const ticketFiles = fs.readdirSync(ticketsDir)
    .filter(file => file.startsWith('TICKET-') && file.endsWith('.md'))
    .map(file => {
      const match = file.match(/TICKET-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    })
    .sort((a, b) => a - b);
  
  const nextTicketNumber = ticketFiles.length > 0 ? Math.max(...ticketFiles) + 1 : 1;
  const ticketId = `TICKET-${String(nextTicketNumber).padStart(3, '0')}`;
  
  // Priority mapping
  const priorityMap = {
    'low': '🟢 Low',
    'medium': '🟡 Medium', 
    'high': '🔴 High',
    'critical': '🚨 Critical'
  };
  
  const priorityDisplay = priorityMap[priority.toLowerCase()] || priorityMap.medium;
  
  // Create ticket content
  const ticketContent = `# ${ticketId}: ${title}

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
${priorityDisplay}

## Description
${description}

## Dependencies
- None

## Acceptance Criteria
- [ ] Define acceptance criteria
- [ ] Add specific requirements
- [ ] Include testing requirements

## Implementation Notes
- Add implementation details here
- Include technical considerations
- Note any special requirements

## Testing
- [ ] Define test cases
- [ ] Include unit tests
- [ ] Include integration tests

## Notes
Add any additional notes or context here.

---

**Version**: v1  
**Created**: ${currentDate}  
**Last Updated**: ${currentDate}  
**Status**: Not Started
`;
  
  // Create ticket file
  const ticketFileName = `${ticketId.toLowerCase().replace('-', '-')}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
  const ticketFilePath = path.join(ticketsDir, ticketFileName);
  
  fs.writeFileSync(ticketFilePath, ticketContent);
  
  return {
    ticketId,
    fileName: ticketFileName,
    filePath: ticketFilePath
  };
}

async function run(options = {}) {
  console.log('🎫 CM Kit Platform - Create Ticket');
  console.log('='.repeat(60));
  
  // Get command line arguments
  const args = process.argv.slice(3);
  
  if (args.length < 2) {
    console.log('❌ Error: Missing required arguments');
    console.log('');
    console.log('Usage: node utils/cli.js create-ticket "Ticket Title" "Description" [priority]');
    console.log('');
    console.log('Arguments:');
    console.log('  title       - The ticket title (in quotes)');
    console.log('  description - The ticket description (in quotes)');
    console.log('  priority    - Optional priority: Low, Medium, High, Critical (default: Medium)');
    console.log('');
    console.log('Examples:');
    console.log('  node utils/cli.js create-ticket "Add User Authentication" "Implement user login and registration system" High');
    console.log('  node utils/cli.js create-ticket "Fix Navigation Bug" "Fix navigation menu not working on mobile devices"');
    console.log('');
    return;
  }
  
  const title = args[0];
  const description = args[1];
  const priority = args[2] || 'Medium';
  
  try {
    console.log('📝 Creating ticket...');
    console.log(`   Title: ${title}`);
    console.log(`   Description: ${description}`);
    console.log(`   Priority: ${priority}`);
    console.log('');
    
    const result = createTicket(title, description, priority);
    
    console.log('✅ Ticket created successfully!');
    console.log(`   Ticket ID: ${result.ticketId}`);
    console.log(`   File: ${result.fileName}`);
    console.log(`   Path: ${result.filePath}`);
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Review and edit the ticket file');
    console.log('   2. Add specific acceptance criteria');
    console.log('   3. Define implementation details');
    console.log('   4. Update dependencies if needed');
    console.log('');
    console.log('🎯 You can now:');
    console.log(`   • Edit: ${result.filePath}`);
    console.log('   • List tickets: node utils/cli.js list-tickets');
    console.log('   • Start working: node utils/cli.js session-start');
    
  } catch (error) {
    console.error('❌ Error creating ticket:', error.message);
    throw error;
  }
}

// CLI module exports
module.exports = {
  description: 'Create a new development ticket',
  run
}; 