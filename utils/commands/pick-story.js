const fs = require('fs');
const path = require('path');
const readline = require('readline');

const STORIES_DIR = path.join(process.cwd(), 'stories');
const TICKETS_DIR = path.join(process.cwd(), 'tickets');

function getNextTicketNumber() {
  const files = fs.readdirSync(TICKETS_DIR)
    .filter(f => f.startsWith('TICKET-') && f.endsWith('.md'));
  const numbers = files.map(f => {
    const match = f.match(/^TICKET-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });
  return (numbers.length > 0 ? Math.max(...numbers) : 0) + 1;
}

function listStories() {
  return fs.readdirSync(STORIES_DIR)
    .filter(f => f.startsWith('STORY-') && f.endsWith('.md'));
}

function promptUserToPick(stories, callback) {
  console.log('\nAvailable Stories:');
  stories.forEach((story, idx) => {
    console.log(`  [${idx + 1}] ${story}`);
  });
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Pick a story number: ', answer => {
    const idx = parseInt(answer, 10) - 1;
    rl.close();
    if (idx >= 0 && idx < stories.length) {
      callback(stories[idx]);
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

function pickStory(storyFile) {
  const storyPath = path.join(STORIES_DIR, storyFile);
  if (!fs.existsSync(storyPath)) {
    console.log(`❌ Story file not found: ${storyFile}`);
    return;
  }
  const content = fs.readFileSync(storyPath, 'utf-8');
  const nextNum = getNextTicketNumber();
  const baseName = storyFile.replace(/^STORY-\d+/, `TICKET-${String(nextNum).padStart(3, '0')}`);
  const ticketPath = path.join(TICKETS_DIR, baseName);
  const updatedContent = updateStatusToInProgress(content)
    .replace(/^# STORY-(\d+):/, `# TICKET-${String(nextNum).padStart(3, '0')}:`);
  fs.writeFileSync(ticketPath, updatedContent, 'utf-8');
  console.log(`✅ Story promoted to ticket: ${path.basename(ticketPath)}`);
}

module.exports = {
  description: 'Pick a user story to work on',
  run: async (options) => {
    console.log('📖 Pick Story');
    console.log('============================================================');
    
    const stories = listStories();
    if (stories.length === 0) {
      console.log('No stories available to pick.');
      return;
    }
    
    const storyArg = options.story || options.s;
    if (storyArg) {
      pickStory(storyArg);
      return;
    }
    
    // Interactive prompt
    promptUserToPick(stories, pickStory);
  }
}; 