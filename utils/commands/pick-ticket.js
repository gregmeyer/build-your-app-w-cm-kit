const fs = require('fs');
const path = require('path');
const readline = require('readline');

const TICKETS_DIR = path.join(process.cwd(), 'tickets');

function listPickableTickets() {
  return fs.readdirSync(TICKETS_DIR)
    .filter(f => f.startsWith('TICKET-') && f.endsWith('.md'))
    .filter(f => {
      const content = fs.readFileSync(path.join(TICKETS_DIR, f), 'utf-8');
      // Only allow Not Started or Review
      return (
        content.includes('- [x] Not Started') ||
        content.includes('- [x] Review')
      ) && !content.includes('- [x] In Progress') && !content.includes('- [x] Complete');
    });
}

function promptUserToPick(tickets, callback) {
  console.log('\nAvailable Tickets:');
  tickets.forEach((ticket, idx) => {
    console.log(`  [${idx + 1}] ${ticket}`);
  });
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Pick a ticket number: ', answer => {
    const idx = parseInt(answer, 10) - 1;
    rl.close();
    if (idx >= 0 && idx < tickets.length) {
      callback(tickets[idx]);
    } else {
      console.log('Invalid selection.');
    }
  });
}

function updateStatusToInProgress(content) {
  // Replace status section with In Progress
  return content.replace(/## Status[\s\S]*?\n(##|$)/, match => {
    return (
      '## Status\n' +
      '- [ ] Not Started\n' +
      '- [x] In Progress\n' +
      '- [ ] Review\n' +
      '- [ ] Complete\n' +
      (match.endsWith('##') ? '\n##' : '')
    );
  });
}

function pickTicket(ticketFile) {
  const ticketPath = path.join(TICKETS_DIR, ticketFile);
  if (!fs.existsSync(ticketPath)) {
    console.log(`❌ Ticket file not found: ${ticketFile}`);
    return;
  }
  let content = fs.readFileSync(ticketPath, 'utf-8');
  if (content.includes('- [x] In Progress') || content.includes('- [x] Complete')) {
    console.log('⚠️  Ticket is already In Progress or Complete.');
    return;
  }
  content = updateStatusToInProgress(content);
  fs.writeFileSync(ticketPath, content, 'utf-8');
  console.log(`✅ Ticket now marked as In Progress: ${ticketFile}`);
}

module.exports = {
  description: 'Pick a ticket to work on',
  run: async (options) => {
    console.log('🎫 Pick Ticket');
    console.log('============================================================');
    
    const tickets = listPickableTickets();
    if (tickets.length === 0) {
      console.log('No pickable tickets available.');
      return;
    }
    
    const ticketArg = options.ticket || options.t;
    if (ticketArg) {
      pickTicket(ticketArg);
      return;
    }
    
    // Interactive prompt
    promptUserToPick(tickets, pickTicket);
  }
}; 