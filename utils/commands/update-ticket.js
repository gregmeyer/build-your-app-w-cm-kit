const fs = require('fs');
const path = require('path');
const readline = require('readline');

// TODO: Paste the update-ticket implementation here
// This should update ticket status and information

module.exports = {
  description: 'Update ticket status and information',
  run: async (options) => {
    console.log('🔄 Update Ticket');
    console.log('============================================================');

    // Get tickets directory
    const ticketsDir = path.join(process.cwd(), 'tickets');
    if (!fs.existsSync(ticketsDir)) {
      console.error('❌ Tickets directory not found.');
      return;
    }

    // Helper to prompt user
    const prompt = (query) => new Promise((resolve) => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question(query, (answer) => { rl.close(); resolve(answer); });
    });

    // Get ticket id
    let id = options.id;
    if (!id) {
      id = await prompt('Enter ticket id (e.g. TICKET-001-nextjs-foundation): ');
    }
    if (!id) {
      console.error('❌ Ticket id is required.');
      return;
    }
    const oldFilename = path.join(ticketsDir, `${id}.md`);
    if (!fs.existsSync(oldFilename)) {
      console.error(`❌ Ticket file not found: ${oldFilename}`);
      return;
    }

    // Read ticket file
    let content = fs.readFileSync(oldFilename, 'utf8');
    let lines = content.split('\n');

    // Only update status by default
    let status = options.status;
    if (!status) {
      const statusLine = lines.find(line => line.startsWith('**Status:**'));
      const currentStatus = statusLine ? statusLine.replace('**Status:**', '').trim() : 'Open';
      status = await prompt(`Enter new status [${currentStatus}]: `) || currentStatus;
    }

    // If only id and status are provided, just update status
    let name = options.name;
    let description = options.description;
    let newId = options.newid;
    let updateName = !!name;
    let updateDescription = !!description;
    let updateId = !!newId;

    // If not provided, don't prompt for them
    if (!updateName) {
      const currentName = lines.find(line => line.startsWith('# '))?.replace('# ', '') || '';
      name = currentName;
    }
    if (!updateDescription) {
      const descLine = lines.find(line => line.startsWith('**Description:**'));
      description = descLine ? descLine.replace('**Description:**', '').trim() : '';
    }
    if (!updateId) {
      newId = id;
    }
    const newFilename = path.join(ticketsDir, `${newId}.md`);

    // Update lines
    lines = lines.map(line => {
      if (line.startsWith('# ') && updateName) return `# ${name}`;
      if (line.startsWith('**Status:**')) return `**Status:** ${status}`;
      if (line.startsWith('**Description:**') && updateDescription) return `**Description:** ${description}`;
      return line;
    });
    // If no description line and description is provided, add it after title
    if (updateDescription && !lines.some(line => line.startsWith('**Description:**'))) {
      const titleIdx = lines.findIndex(line => line.startsWith('# '));
      lines.splice(titleIdx + 1, 0, `**Description:** ${description}`);
    }

    // Write to new file (rename if needed)
    fs.writeFileSync(newFilename, lines.join('\n'));
    if (newFilename !== oldFilename) {
      fs.unlinkSync(oldFilename);
      console.log(`Renamed ticket file to: ${newId}.md`);
    }
    console.log('✅ Ticket updated successfully!');
    console.log('============================================================');
  }
}; 