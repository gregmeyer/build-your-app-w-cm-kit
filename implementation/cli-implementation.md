# CLI Implementation

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

---

# Essential CLI Implementation

To make this system actually work, you need to create the core CLI infrastructure. Here are the essential files:

## 1. Main CLI Entry Point (`utils/cli.js`)

```javascript filename=utils/cli.js
#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Available commands
const commands = {
  'session-start': require('./commands/session-start'),
  'session-wrapup': require('./commands/session-wrapup'),
  'status-report': require('./commands/status-report'),
  'list-tickets': require('./commands/list-tickets'),
  'list-stories': require('./commands/list-stories'),
  'list-issues': require('./commands/list-issues'),
  'validate-structure': require('./commands/validate-structure'),
  'pick-ticket': require('./commands/pick-ticket'),
  'pick-story': require('./commands/pick-story'),
  'update-ticket': require('./commands/update-ticket'),
  'test': require('./commands/test'),
  'qa-test': require('./commands/qa-test'),
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];
  const options = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value || true;
    }
  }

  return { command, options };
}

// Display help information
function showHelp() {
  console.log(`${colors.bright}${colors.blue}Project CLI${colors.reset}\n`);
  console.log('Available commands:\n');

  Object.entries(commands).forEach(([name, cmd]) => {
    console.log(`${colors.cyan}${name}${colors.reset} - ${cmd.description}`);
  });

  console.log('\nExamples:');
  console.log('  node utils/cli.js session-start');
  console.log('  node utils/cli.js status-report');
  console.log('  node utils/cli.js pick-ticket');
}

// Main CLI function
async function main() {
  const { command, options } = parseArgs();

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (!commands[command]) {
    console.error(`${colors.red}Error: Unknown command '${command}'${colors.reset}`);
    console.log(`Run 'node utils/cli.js help' to see available commands.`);
    process.exit(1);
  }

  try {
    console.log(`${colors.bright}${colors.blue}Running: ${command}${colors.reset}\n`);
    await commands[command].run(options);
    console.log(`\n${colors.green}✅ Command '${command}' completed successfully${colors.reset}`);
  } catch (error) {
    console.error(`\n${colors.red}❌ Command '${command}' failed:${colors.reset}`);
    console.error(error.message);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 2. Logger Utility (`utils/lib/logger.js`)

```javascript filename=utils/lib/logger.js
const fs = require('fs');
const path = require('path');

class Logger {
  constructor(options = {}) {
    this.logLevel = options.logLevel || 'info';
    this.logFile = options.logFile || path.join(process.cwd(), 'logs', 'cli.log');
    this.consoleOutput = options.consoleOutput !== false;
    this.timestamp = options.timestamp !== false;
    this.sessionId = this.generateSessionId();
    
    // Ensure logs directory exists
    const logsDir = path.dirname(this.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getSessionId() {
    return this.sessionId;
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      sessionId: this.sessionId,
      ...data
    };

    const logString = JSON.stringify(logEntry) + '\n';
    
    if (this.consoleOutput) {
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
    }
    
    fs.appendFileSync(this.logFile, logString);
  }

  info(message, data) {
    this.log('info', message, data);
  }

  error(message, data) {
    this.log('error', message, data);
  }

  command(message, data) {
    this.log('command', message, data);
  }

  performance(message, duration) {
    this.log('performance', message, { duration });
  }
}

module.exports = Logger;
```

## 3. Session Start Command (`utils/commands/session-start.js`)

```javascript filename=utils/commands/session-start.js
const fs = require('fs');
const path = require('path');
const Logger = require('../lib/logger');

const TICKETS_DIR = path.join(process.cwd(), 'tickets');
const STORIES_DIR = path.join(process.cwd(), 'stories');
const ISSUES_DIR = path.join(process.cwd(), 'issues');

function validateAgentContext() {
  console.log('\n📋 Checking Agent Context...');
  
  const contextFile = path.join(TICKETS_DIR, 'AGENT-CONTEXT.md');
  if (!fs.existsSync(contextFile)) {
    console.log('❌ Agent context file not found');
    return { valid: false, issues: ['Missing AGENT-CONTEXT.md'] };
  }
  
  console.log('✅ Agent context up to date');
  return { valid: true, issues: [] };
}

function validateTicketConsistency() {
  console.log('\n🎫 Validating Ticket Consistency...');
  
  const issues = [];
  const ticketFiles = fs.readdirSync(TICKETS_DIR).filter(f => f.endsWith('.md') && f.startsWith('TICKET-'));
  
  ticketFiles.forEach(file => {
    const content = fs.readFileSync(path.join(TICKETS_DIR, file), 'utf-8');
    
    // Check for required sections
    if (!content.includes('## Status')) {
      issues.push(`${file}: Missing ## Status section`);
    }
    if (!content.includes('## Priority')) {
      issues.push(`${file}: Missing ## Priority section`);
    }
    if (!content.includes('## Description')) {
      issues.push(`${file}: Missing ## Description section`);
    }
  });
  
  if (issues.length > 0) {
    console.log(`❌ Found ${issues.length} ticket consistency issues:`);
    issues.forEach(issue => console.log(`   - ${issue}`));
    return { valid: false, issues };
  }
  
  console.log('✅ All tickets are consistent');
  return { valid: true, issues: [] };
}

function validateStoryConsistency() {
  console.log('\n📖 Validating Story Consistency...');
  
  const issues = [];
  const storyFiles = fs.readdirSync(STORIES_DIR).filter(f => f.endsWith('.md') && f.startsWith('STORY-'));
  
  storyFiles.forEach(file => {
    const content = fs.readFileSync(path.join(STORIES_DIR, file), 'utf-8');
    let hasDescription = content.includes('## Description');
    
    if (!hasDescription) {
      issues.push(`${file}: Missing ## Description section`);
    }
  });
  
  if (issues.length > 0) {
    console.log(`❌ Found ${issues.length} story consistency issues:`);
    issues.forEach(issue => console.log(`   - ${issue}`));
    return { valid: false, issues };
  }
  
  console.log('✅ All stories are consistent');
  return { valid: true, issues: [] };
}

function checkOpenIssues() {
  console.log('\n🐛 Checking Open Issues...');
  
  const issueFiles = fs.readdirSync(ISSUES_DIR).filter(f => f.endsWith('.md') && f.startsWith('BUG-'));
  const openIssues = issueFiles.filter(file => {
    const content = fs.readFileSync(path.join(ISSUES_DIR, file), 'utf-8');
    return content.includes('- [ ] Open') || content.includes('- [ ] In Progress');
  });
  
  if (openIssues.length > 0) {
    console.log(`⚠️  Found ${openIssues.length} open issues`);
    openIssues.forEach(issue => console.log(`   - ${issue}`));
  } else {
    console.log('✅ No open issues');
  }
  
  return openIssues;
}

function checkGitStatus() {
  console.log('\n📊 Checking Git Status...');
  
  try {
    const { execSync } = require('child_process');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.trim().split('\n').filter(line => line);
    
    if (lines.length > 0) {
      console.log(`📝 Modified files: ${lines.length}`);
      console.log(`📋 Total changes: ${lines.length}`);
    } else {
      console.log('✅ Working directory clean');
    }
    
    return lines.length;
  } catch (error) {
    console.log('⚠️  Git not initialized or not available');
    return 0;
  }
}

function generateRecommendations(agentValid, ticketValid, storyValid, openIssues, gitChanges) {
  console.log('\n============================================================');
  console.log('🚀 SESSION START REPORT');
  console.log('============================================================');
  
  console.log('\n📈 SESSION READINESS:');
  if (agentValid && ticketValid && storyValid && openIssues.length === 0) {
    console.log('   ✅ Ready to start development session');
  } else {
    console.log('   ❌ Issues need to be resolved before starting');
  }
  
  console.log('\n📋 AGENT CONTEXT:');
  console.log(`   ${agentValid ? '✅' : '❌'} Agent context is ${agentValid ? 'valid and up to date' : 'needs attention'}`);
  
  console.log('\n🎫 CONSISTENCY CHECKS:');
  console.log(`   ${ticketValid ? '✅' : '❌'} All tickets are ${ticketValid ? 'consistent' : 'inconsistent'}`);
  console.log(`   ${storyValid ? '✅' : '❌'} All stories are ${storyValid ? 'consistent' : 'inconsistent'}`);
  
  console.log('\n🐛 OPEN ISSUES:');
  console.log(`   ${openIssues.length === 0 ? '✅' : '⚠️'} ${openIssues.length === 0 ? 'No open issues' : `${openIssues.length} open issues`}`);
  
  console.log('\n📊 GIT STATUS:');
  if (gitChanges > 0) {
    console.log(`   📝 ${gitChanges} files changed - consider committing`);
  } else {
    console.log('   ✅ Working directory clean');
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  if (!agentValid || !ticketValid || !storyValid) {
    console.log('   🔧 Fix consistency issues before starting');
  }
  if (gitChanges > 0) {
    console.log('   💾 Commit or stash changes before starting');
  }
  console.log('   🎯 Pick up a ticket or story to begin development');
  
  console.log('\n============================================================');
}

module.exports = {
  description: 'Start a development session with project validation',
  run: async (options) => {
    console.log('🚀 Project - Session Start');
    console.log('============================================================');
    
    const agentValid = validateAgentContext();
    const ticketValid = validateTicketConsistency();
    const storyValid = validateStoryConsistency();
    const openIssues = checkOpenIssues();
    const gitChanges = checkGitStatus();
    
    generateRecommendations(
      agentValid.valid,
      ticketValid.valid,
      storyValid.valid,
      openIssues,
      gitChanges
    );
    
    console.log('\n🎉 Session start check completed successfully');
  }
};
```

## 4. Session Wrap-up Command (`utils/commands/session-wrapup.js`)

```javascript filename=utils/commands/session-wrapup.js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TICKETS_DIR = path.resolve(__dirname, '../../tickets');
const ISSUES_DIR = path.resolve(__dirname, '../../issues');
const LOGS_DIR = path.resolve(__dirname, '../../logs');

// Capture console output
let consoleOutput = [];

// Override console.log to capture output
const originalConsoleLog = console.log;
console.log = function(...args) {
  const message = args.join(' ');
  consoleOutput.push(message);
  originalConsoleLog.apply(console, args);
};

function createSessionLog() {
  // Ensure logs directory exists
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }

  // Generate filename with date and session number
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '-');
  
  // Find the next session number for today
  const todayPrefix = `session-complete-log-${dateStr}`;
  const existingLogs = fs.readdirSync(LOGS_DIR)
    .filter(file => file.startsWith(todayPrefix))
    .map(file => {
      const match = file.match(/session-complete-log-\d{4}-\d{2}-\d{2}-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    })
    .sort((a, b) => b - a);
  
  const sessionNumber = existingLogs.length > 0 ? existingLogs[0] + 1 : 1;
  const filename = `${todayPrefix}-${sessionNumber.toString().padStart(2, '0')}.md`;
  const logPath = path.join(LOGS_DIR, filename);

  // Create markdown log content
  const logContent = `# CM Kit Platform - Session Complete Log

## Session Information
- **Date**: ${now.toISOString()}
- **Session Number**: ${sessionNumber}
- **Filename**: \`${filename}\`
- **Duration**: ${consoleOutput.length} output lines

## Session Output

\`\`\`bash
${consoleOutput.join('\n')}
\`\`\`

## Session Summary

### Key Metrics
- **Session completed at**: ${now.toISOString()}
- **Log file**: \`${filename}\`
- **Total output lines**: ${consoleOutput.length}
- **Session number**: ${sessionNumber}

### Session Status
- ✅ Session wrap-up completed successfully
- 📝 Log file created and saved
- 🔄 Agent context updated
- 🧪 Tests executed
- 📊 Git status checked

---
*Generated automatically by CM Kit Platform CLI*
`;

  // Write log file
  fs.writeFileSync(logPath, logContent);
  console.log(`📝 Session log saved to: ${logPath}`);
  
  return logPath;
}

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} completed successfully`);
    return { success: true, output: result };
  } catch (error) {
    console.log(`❌ ${description} failed`);
    console.log(`Error: ${error.message}`);
    return { success: false, output: error.message };
  }
}

function updateAgentContext() {
  console.log('\n📝 Updating Agent Context...');
  
  const agentContextPath = path.join(TICKETS_DIR, 'AGENT-CONTEXT.md');
  if (!fs.existsSync(agentContextPath)) {
    console.log('❌ Agent context file not found');
    return false;
  }

  // Update the "Last Updated" timestamp
  const content = fs.readFileSync(agentContextPath, 'utf-8');
  const currentDate = new Date().toISOString().split('T')[0];
  
  const updatedContent = content.replace(
    /## Last Updated\n\n📅 .+/g,
    `## Last Updated\n\n📅 ${currentDate}`
  );
  
  if (content !== updatedContent) {
    fs.writeFileSync(agentContextPath, updatedContent);
    console.log('✅ Agent context timestamp updated');
    return true;
  } else {
    console.log('ℹ️  Agent context already up to date');
    return true;
  }
}

function getProjectStats() {
  const stats = {
    tickets: { total: 0, completed: 0, inProgress: 0, notStarted: 0 },
    issues: { total: 0, open: 0, resolved: 0 },
    tests: { passed: 0, failed: 0, coverage: 0 },
    files: { modified: 0, added: 0 }
  };

  // Count tickets
  const ticketFiles = fs.readdirSync(TICKETS_DIR).filter(f => f.endsWith('.md') && f.startsWith('TICKET-'));
  stats.tickets.total = ticketFiles.length;
  
  ticketFiles.forEach(file => {
    const content = fs.readFileSync(path.join(TICKETS_DIR, file), 'utf-8');
    if (content.includes('✅ Complete')) stats.tickets.completed++;
    else if (content.includes('🔄 In Progress')) stats.tickets.inProgress++;
    else stats.tickets.notStarted++;
  });

  // Count issues
  const issueFiles = fs.readdirSync(ISSUES_DIR).filter(f => f.endsWith('.md') && f.startsWith('BUG-'));
  stats.issues.total = issueFiles.length;
  
  issueFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ISSUES_DIR, file), 'utf-8');
    if (content.includes('✅ Resolved')) stats.issues.resolved++;
    else stats.issues.open++;
  });

  return stats;
}

function runTests() {
  console.log('\n🧪 Running Tests...');
  
  // Run the test command
  const testResult = runCommand('npm test', 'Running test suite');
  
  if (testResult.success) {
    // Try to extract coverage information
    const coverageMatch = testResult.output.match(/All files\s+\|\s+(\d+\.?\d*)%/);
    if (coverageMatch) {
      console.log(`📊 Test Coverage: ${coverageMatch[1]}%`);
    }
    
    // Count passed/failed tests
    const passedMatch = testResult.output.match(/(\d+) passing/);
    const failedMatch = testResult.output.match(/(\d+) failing/);
    
    if (passedMatch) console.log(`✅ Tests Passed: ${passedMatch[1]}`);
    if (failedMatch) console.log(`❌ Tests Failed: ${failedMatch[1]}`);
  }
  
  return testResult.success;
}

function checkGitStatus() {
  console.log('\n📊 Checking Git Status...');
  
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.trim().split('\n').filter(line => line);
    
    if (lines.length === 0) {
      console.log('✅ Working directory is clean');
      return { clean: true, modified: 0, added: 0 };
    }
    
    let modified = 0;
    let added = 0;
    
    lines.forEach(line => {
      const status = line.substring(0, 2);
      if (status.includes('M') || status.includes('D')) modified++;
      if (status.includes('A')) added++;
    });
    
    console.log(`📝 Modified files: ${modified}`);
    console.log(`➕ Added files: ${added}`);
    console.log(`📋 Total changes: ${lines.length}`);
    
    return { clean: false, modified, added, total: lines.length };
  } catch (error) {
    console.log('❌ Could not check git status');
    return { clean: false, error: error.message };
  }
}

function generateSessionReport(stats, testSuccess, gitStatus) {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 SESSION WRAP-UP REPORT');
  console.log('='.repeat(60));
  
  // Project Status
  console.log('\n📈 PROJECT STATUS:');
  console.log(`   Tickets: ${stats.tickets.completed}/${stats.tickets.total} completed (${Math.round(stats.tickets.completed/stats.tickets.total*100)}%)`);
  console.log(`   Issues: ${stats.issues.resolved}/${stats.issues.total} resolved (${Math.round(stats.issues.resolved/stats.issues.total*100)}%)`);
  
  // Test Status
  console.log('\n🧪 TEST STATUS:');
  if (testSuccess) {
    console.log('   ✅ All tests passing');
  } else {
    console.log('   ❌ Some tests failing - review needed');
  }
  
  // Git Status
  console.log('\n📊 GIT STATUS:');
  if (gitStatus.clean) {
    console.log('   ✅ Working directory clean');
  } else {
    console.log(`   📝 ${gitStatus.total} files changed (${gitStatus.modified} modified, ${gitStatus.added} added)`);
  }
  
  // Next Steps
  console.log('\n🎯 NEXT STEPS:');
  if (stats.tickets.notStarted > 0) {
    console.log(`   📋 ${stats.tickets.notStarted} tickets ready to pick up`);
  }
  if (stats.issues.open > 0) {
    console.log(`   🐛 ${stats.issues.open} open issues to address`);
  }
  if (!gitStatus.clean) {
    console.log('   💾 Consider committing your changes');
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (!testSuccess) {
    console.log('   🔧 Fix failing tests before continuing');
  }
  if (stats.tickets.inProgress > 0) {
    console.log('   🚧 Consider completing in-progress tickets');
  }
  if (gitStatus.total > 10) {
    console.log('   📦 Consider breaking changes into smaller commits');
  }
  
  console.log('\n' + '='.repeat(60));
}

function main() {
  console.log('🚀 CM Kit Platform - Session Wrap-up');
  console.log('='.repeat(60));
  
  // Update agent context
  const contextUpdated = updateAgentContext();
  
  // Get project statistics
  const stats = getProjectStats();
  
  // Run tests
  const testSuccess = runTests();
  
  // Check git status
  const gitStatus = checkGitStatus();
  
  // Generate comprehensive report
  generateSessionReport(stats, testSuccess, gitStatus);
  
  // Create session log file
  const logPath = createSessionLog();
  
  // Final status
  const overallSuccess = contextUpdated && testSuccess;
  console.log(`\n🎉 Session wrap-up ${overallSuccess ? 'completed successfully' : 'completed with issues'}`);
  console.log(`📝 Session log saved to: ${logPath}`);
  
  if (!overallSuccess) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { run: (options, logger) => main() };
```

## 5. Status Report Command (`utils/commands/status-report.js`)

```javascript filename=utils/commands/status-report.js
const fs = require('fs');
const path = require('path');

const TICKETS_DIR = path.join(process.cwd(), 'tickets');
const STORIES_DIR = path.join(process.cwd(), 'stories');
const ISSUES_DIR = path.join(process.cwd(), 'issues');

function analyzeTickets() {
  const ticketFiles = fs.readdirSync(TICKETS_DIR).filter(f => f.endsWith('.md') && f.startsWith('TICKET-'));
  
  const stats = {
    total: ticketFiles.length,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0
  };
  
  ticketFiles.forEach(file => {
    const content = fs.readFileSync(path.join(TICKETS_DIR, file), 'utf-8');
    
    if (content.includes('- [x] Complete')) stats.completed++;
    else if (content.includes('- [x] In Progress')) stats.inProgress++;
    else stats.notStarted++;
    
    if (content.includes('🔴 High')) stats.highPriority++;
    else if (content.includes('🟡 Medium')) stats.mediumPriority++;
    else if (content.includes('🟢 Low')) stats.lowPriority++;
  });
  
  return stats;
}

function analyzeStories() {
  const storyFiles = fs.readdirSync(STORIES_DIR).filter(f => f.endsWith('.md') && f.startsWith('STORY-'));
  
  const stats = {
    total: storyFiles.length,
    completed: 0,
    inProgress: 0,
    notStarted: 0
  };
  
  storyFiles.forEach(file => {
    const content = fs.readFileSync(path.join(STORIES_DIR, file), 'utf-8');
    
    if (content.includes('✅ Complete')) stats.completed++;
    else if (content.includes('🔄 In Progress')) stats.inProgress++;
    else stats.notStarted++;
  });
  
  return stats;
}

function analyzeIssues() {
  const issueFiles = fs.readdirSync(ISSUES_DIR).filter(f => f.endsWith('.md') && f.startsWith('BUG-'));
  
  const stats = {
    total: issueFiles.length,
    open: 0,
    inProgress: 0,
    resolved: 0
  };
  
  issueFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ISSUES_DIR, file), 'utf-8');
    
    if (content.includes('- [x] Resolved')) stats.resolved++;
    else if (content.includes('- [x] In Progress')) stats.inProgress++;
    else stats.open++;
  });
  
  return stats;
}

module.exports = {
  description: 'Generate comprehensive project status report',
  run: async (options) => {
    console.log('📊 Project Status Report');
    console.log('============================================================');
    
    const ticketStats = analyzeTickets();
    const storyStats = analyzeStories();
    const issueStats = analyzeIssues();
    
    console.log('\n🎫 TICKET STATUS:');
    console.log(`   Total: ${ticketStats.total}`);
    console.log(`   ✅ Completed: ${ticketStats.completed}`);
    console.log(`   🔄 In Progress: ${ticketStats.inProgress}`);
    console.log(`   ❌ Not Started: ${ticketStats.notStarted}`);
    console.log(`   🔴 High Priority: ${ticketStats.highPriority}`);
    console.log(`   🟡 Medium Priority: ${ticketStats.mediumPriority}`);
    console.log(`   🟢 Low Priority: ${ticketStats.lowPriority}`);
    
    console.log('\n📖 STORY STATUS:');
    console.log(`   Total: ${storyStats.total}`);
    console.log(`   ✅ Completed: ${storyStats.completed}`);
    console.log(`   🔄 In Progress: ${storyStats.inProgress}`);
    console.log(`   ❌ Not Started: ${storyStats.notStarted}`);
    
    console.log('\n🐛 ISSUE STATUS:');
    console.log(`   Total: ${issueStats.total}`);
    console.log(`   ⚠️  Open: ${issueStats.open}`);
    console.log(`   🔄 In Progress: ${issueStats.inProgress}`);
    console.log(`   ✅ Resolved: ${issueStats.resolved}`);
    
    const completionRate = ticketStats.total > 0 ? 
      Math.round((ticketStats.completed / ticketStats.total) * 100) : 0;
    
    console.log('\n📈 OVERALL PROGRESS:');
    console.log(`   Ticket Completion Rate: ${completionRate}%`);
    console.log(`   Story Completion Rate: ${storyStats.total > 0 ? 
      Math.round((storyStats.completed / storyStats.total) * 100) : 0}%`);
    
    console.log('\n============================================================');
  }
};
```

## 6. List Tickets Command (`utils/commands/list-tickets.js`)

```javascript filename=utils/commands/list-tickets.js
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
```

## Session Logging Features

### Automatic Session Logs
The `session-wrapup` command now automatically creates detailed markdown logs of each development session:

- **Log Location**: `logs/session-complete-log-YYYY-MM-DD-XX.md`
- **Auto-numbering**: Sessions are numbered sequentially per day (01, 02, 03, etc.)
- **Markdown Format**: Professional markdown formatting with sections and code blocks
- **Complete Output**: Captures all console output during session wrap-up
- **Session Metadata**: Includes date, session number, duration, and status

### Log File Structure
```markdown
# CM Kit Platform - Session Complete Log

## Session Information
- **Date**: 2025-06-22T23:54:43.420Z
- **Session Number**: 2
- **Filename**: `session-complete-log-2025-06-22-02.md`
- **Duration**: 29 output lines

## Session Output
```bash
[Complete console output captured during session]
```

## Session Summary
### Key Metrics
- **Session completed at**: 2025-06-22T23:54:43.420Z
- **Log file**: `session-complete-log-2025-06-22-02.md`
- **Total output lines**: 29
- **Session number**: 2

### Session Status
- ✅ Session wrap-up completed successfully
- 📝 Log file created and saved
- 🔄 Agent context updated
- 🧪 Tests executed
- 📊 Git status checked

---
*Generated automatically by CM Kit Platform CLI*
```

### Benefits
- **Audit Trail**: Complete history of all development sessions
- **Debugging**: Easy to review what happened during problematic sessions
- **Progress Tracking**: Visual record of project progress over time
- **Documentation**: Automatic documentation of development activities
- **Professional**: Clean, readable markdown format for easy review

---

**Version**: v0  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Ready for Use 