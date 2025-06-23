#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function listTickets() {
  const ticketsDir = 'tickets';
  if (!fs.existsSync(ticketsDir)) {
    return [];
  }
  
  return fs.readdirSync(ticketsDir)
    .filter(file => file.startsWith('TICKET-') && file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(ticketsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract ticket info
      const titleMatch = content.match(/^# TICKET-\d+: (.+)$/m);
      const statusMatch = content.match(/- \[([x ])\] In Progress/);
      const priorityMatch = content.match(/## Priority\s*\n([^\n]+)/);
      
      return {
        file,
        filePath,
        title: titleMatch ? titleMatch[1] : 'Unknown Title',
        status: statusMatch && statusMatch[1] === 'x' ? 'In Progress' : 'Not Started',
        priority: priorityMatch ? priorityMatch[1].trim() : 'Unknown'
      };
    })
    .sort((a, b) => {
      const aNum = parseInt(a.file.match(/TICKET-(\d+)/)[1]);
      const bNum = parseInt(b.file.match(/TICKET-(\d+)/)[1]);
      return aNum - bNum;
    });
}

function clearTicket(ticketId) {
  const ticketsDir = 'tickets';
  const tickets = listTickets();
  
  // Find the ticket by ID
  const ticket = tickets.find(t => t.file.startsWith(ticketId));
  
  if (!ticket) {
    throw new Error(`Ticket ${ticketId} not found`);
  }
  
  // Remove the ticket file
  fs.unlinkSync(ticket.filePath);
  
  return ticket;
}

function clearAllTickets() {
  const ticketsDir = 'tickets';
  const tickets = listTickets();
  
  if (tickets.length === 0) {
    return { removed: 0, tickets: [] };
  }
  
  const removedTickets = [];
  
  tickets.forEach(ticket => {
    fs.unlinkSync(ticket.filePath);
    removedTickets.push(ticket);
  });
  
  return {
    removed: removedTickets.length,
    tickets: removedTickets
  };
}

async function promptConfirm(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(message + ' (y/N): ', (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

async function run(options = {}) {
  console.log('🗑️  CM Kit Platform - Clear Tickets');
  console.log('='.repeat(60));
  
  // Get command line arguments
  const args = process.argv.slice(3);
  
  // Show current tickets
  const tickets = listTickets();
  
  if (tickets.length === 0) {
    console.log('📭 No tickets found to clear.');
    console.log('');
    console.log('💡 To create a new ticket:');
    console.log('   node utils/cli.js create-ticket "Title" "Description" [priority]');
    return;
  }
  
  console.log('📋 Current tickets:');
  console.log('');
  tickets.forEach(ticket => {
    const statusIcon = ticket.status === 'In Progress' ? '🔄' : '❌';
    console.log(`   ${ticket.file} - ${statusIcon} ${ticket.status} - ${ticket.priority} - ${ticket.title}`);
  });
  console.log('');
  
  // Check for specific ticket ID
  if (args.length > 0) {
    const ticketId = args[0].toUpperCase();
    
    if (ticketId === 'ALL') {
      // Clear all tickets
      console.log('⚠️  WARNING: This will remove ALL tickets!');
      console.log('');
      const confirmed = await promptConfirm('Are you sure you want to remove ALL tickets?');
      if (!confirmed) {
        console.log('❌ Cancelled. No tickets were removed.');
        return;
      }
      console.log('Proceeding with clearing all tickets...');
      console.log('');
      
      const result = clearAllTickets();
      
      console.log(`✅ Successfully removed ${result.removed} tickets:`);
      result.tickets.forEach(ticket => {
        console.log(`   • ${ticket.file} - ${ticket.title}`);
      });
      
    } else {
      // Clear specific ticket
      try {
        const ticket = tickets.find(t => t.file.startsWith(ticketId));
        if (!ticket) throw new Error(`Ticket ${ticketId} not found`);
        const confirmed = await promptConfirm(`Are you sure you want to remove ticket ${ticket.file} (${ticket.title})?`);
        if (!confirmed) {
          console.log('❌ Cancelled. No tickets were removed.');
          return;
        }
        const removedTicket = clearTicket(ticketId);
        console.log(`✅ Successfully removed ticket: ${removedTicket.file}`);
        console.log(`   Title: ${removedTicket.title}`);
        console.log(`   Status: ${removedTicket.status}`);
        console.log(`   Priority: ${removedTicket.priority}`);
        
      } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        console.log('');
        console.log('💡 Available ticket IDs:');
        tickets.forEach(ticket => {
          const ticketId = ticket.file.match(/TICKET-\d+/)[0];
          console.log(`   • ${ticketId} - ${ticket.title}`);
        });
        return;
      }
    }
    
  } else {
    // Show usage
    console.log('❌ Error: Missing ticket ID or "ALL"');
    console.log('');
    console.log('Usage:');
    console.log('  node utils/cli.js clear-tickets <ticket-id>    - Remove specific ticket');
    console.log('  node utils/cli.js clear-tickets ALL           - Remove all tickets');
    console.log('');
    console.log('Examples:');
    console.log('  node utils/cli.js clear-tickets TICKET-001    - Remove ticket 001');
    console.log('  node utils/cli.js clear-tickets TICKET-002    - Remove ticket 002');
    console.log('  node utils/cli.js clear-tickets ALL           - Remove all tickets');
    console.log('');
    console.log('💡 Available ticket IDs:');
    tickets.forEach(ticket => {
      const ticketId = ticket.file.match(/TICKET-\d+/)[0];
      console.log(`   • ${ticketId} - ${ticket.title}`);
    });
    return;
  }
  
  console.log('');
  console.log('📋 Next steps:');
  console.log('   • List remaining tickets: node utils/cli.js list-tickets');
  console.log('   • Create new ticket: node utils/cli.js create-ticket "Title" "Description"');
  console.log('   • Start session: node utils/cli.js session-start');
}

// CLI module exports
module.exports = {
  description: 'Clear/remove tickets from the system',
  run
}; 