const fs = require('fs');
const path = require('path');

const TICKETS_DIR = path.join(process.cwd(), 'tickets');

function getTicketStatus(content) {
  if (content.includes('- [x] Complete')) return '✅ Complete';
  if (content.includes('- [x] In Progress')) return '🔄 In Progress';
  if (content.includes('- [x] Review')) return '👀 Review';
  return '❌ Not Started';
}

function getTicketPriority(content) {
  if (content.includes('🔴 High')) return '🔴 High';
  if (content.includes('🟡 Medium')) return '🟡 Medium';
  if (content.includes('🟢 Low')) return '🟢 Low';
  return '⚪ Unset';
}

module.exports = {
  description: 'List all tickets with their status and priority',
  run: async (options) => {
    console.log('🎫 Project Tickets');
    console.log('============================================================');
    const ticketFiles = fs.readdirSync(TICKETS_DIR)
      .filter(f => f.endsWith('.md') && f.startsWith('TICKET-'))
      .sort();
    if (ticketFiles.length === 0) {
      console.log('No tickets found.');
      return;
    }
    ticketFiles.forEach(file => {
      const content = fs.readFileSync(path.join(TICKETS_DIR, file), 'utf-8');
      const status = getTicketStatus(content);
      const priority = getTicketPriority(content);
      console.log(`\n📋 ${file}`);
      console.log(`   Status: ${status}`);
      console.log(`   Priority: ${priority}`);
      // Extract title
      const titleMatch = content.match(/^# TICKET-\d+: (.+)$/m);
      if (titleMatch) {
        console.log(`   Title: ${titleMatch[1]}`);
      }
    });
    console.log('\n============================================================');
  }
}; 