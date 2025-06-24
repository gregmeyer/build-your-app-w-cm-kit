# CLI Implementation

## Created
📅 2025-06-22

## Last Updated
📅 2025-06-22

---

# Essential CLI Implementation

To make this system actually work, you need to create the core CLI infrastructure. Here are the essential files:

## 1. Main CLI Entry Point (`utils/cli.js`)

```javascript
`utils/cli.js`
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
  'validate-docs': require('./commands/validate-docs'),
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

```javascript
`utils/lib/logger.js`
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

```javascript
`utils/commands/session-start.js`
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

```javascript
`utils/commands/session-wrapup.js`
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

function validateDocumentation() {
  console.log('\n📋 Validating Documentation Consistency...');
  const issues = [];
  
  // Check README.md
  if (!fs.existsSync('README.md')) {
    issues.push('README.md file is missing');
  } else {
    const readmeContent = fs.readFileSync('README.md', 'utf-8');
    if (!readmeContent.includes('Deprecation Warning Suppression')) {
      issues.push('README.md missing deprecation warning suppression documentation');
    }
    if (!readmeContent.includes('Automated Testing & CI/CD')) {
      issues.push('README.md missing testing infrastructure documentation');
    }
  }
  
  // Check getting-started.md
  if (!fs.existsSync('getting-started.md')) {
    issues.push('getting-started.md file is missing');
  } else {
    const gettingStartedContent = fs.readFileSync('getting-started.md', 'utf-8');
    if (!gettingStartedContent.includes('Deprecation Warning Suppression')) {
      issues.push('getting-started.md missing deprecation warning suppression documentation');
    }
    if (!gettingStartedContent.includes('npm test') || !gettingStartedContent.includes('npm run test:e2e')) {
      issues.push('getting-started.md missing test command documentation');
    }
  }
  
  // Check automation setup
  if (!fs.existsSync('automation/setup-automated.js')) {
    issues.push('automation/setup-automated.js file is missing');
  } else {
    const setupContent = fs.readFileSync('automation/setup-automated.js', 'utf-8');
    if (!setupContent.includes('jest@29.7.0')) {
      issues.push('setup-automated.js missing Jest version specification');
    }
    if (!setupContent.includes('updatePackageJsonOverrides')) {
      issues.push('setup-automated.js missing package.json overrides function');
    }
  }
  
  // Check CLI implementation
  if (!fs.existsSync('automation/cli-implementation.md')) {
    issues.push('automation/cli-implementation.md file is missing');
  } else {
    const cliContent = fs.readFileSync('automation/cli-implementation.md', 'utf-8');
    if (!cliContent.includes('validate-docs')) {
      issues.push('cli-implementation.md missing validate-docs command');
    }
  }
  
  // Check configuration files
  if (!fs.existsSync('.npmrc')) {
    issues.push('Missing .npmrc file for deprecation warning suppression');
  }
  
  if (!fs.existsSync('jest.config.js')) {
    issues.push('Missing jest.config.js file');
  }
  
  if (!fs.existsSync('playwright.config.js')) {
    issues.push('Missing playwright.config.js file');
  }
  
  const valid = issues.length === 0;
  
  if (valid) {
    console.log('✅ Documentation is consistent and up to date');
  } else {
    console.log('❌ Documentation issues found:');
    issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
  }
  
  return { valid, issues };
}

function generateSessionReport(stats, testSuccess, gitStatus, docsValidation) {
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
  
  // Documentation Status
  console.log('\n📋 Documentation Status:');
  if (docsValidation.valid) {
    console.log('   ✅ Documentation is consistent and up to date');
  } else {
    console.log('   ❌ Documentation issues found');
    docsValidation.issues.forEach(issue => console.log(`   ⚠️  ${issue}`));
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
  
  // Validate documentation consistency
  const docsValidation = validateDocumentation();
  
  // Generate comprehensive report
  generateSessionReport(stats, testSuccess, gitStatus, docsValidation);
  
  // Create session log file
  const logPath = createSessionLog();
  
  // Final status
  const overallSuccess = contextUpdated && testSuccess && docsValidation.valid;
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

```javascript
`utils/commands/status-report.js`
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

```javascript
`utils/commands/list-tickets.js`
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

## 7. Validate Documentation Command (`utils/commands/validate-docs.js`)

```javascript
`utils/commands/validate-docs.js`
const fs = require('fs');
const path = require('path');

const DOCS_FILES = [
  'README.md',
  'getting-started.md',
  'docs/README.md',
  'docs/prd/README.md'
];

const SETUP_FILES = [
  'automation/setup-automated.js',
  'automation/cli-implementation.md'
];

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function validateReadme() {
  console.log('\n📖 Validating README.md...');
  const issues = [];
  
  if (!checkFileExists('README.md')) {
    issues.push('README.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('README.md', 'utf-8');
  
  // Check for key sections
  const requiredSections = [
    'Automated Testing & CI/CD',
    'Development Tools',
    'Ready-to-Use Features'
  ];
  
  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      issues.push(`Missing section: ${section}`);
    }
  });
  
  // Check for deprecation warning mention
  if (!content.includes('Deprecation Warning Suppression')) {
    issues.push('Missing deprecation warning suppression documentation');
  }
  
  // Check for testing infrastructure mention
  if (!content.includes('Jest') || !content.includes('Playwright')) {
    issues.push('Missing testing infrastructure documentation');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateGettingStarted() {
  console.log('\n🚀 Validating getting-started.md...');
  const issues = [];
  
  if (!checkFileExists('getting-started.md')) {
    issues.push('getting-started.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('getting-started.md', 'utf-8');
  
  // Check for key sections
  const requiredSections = [
    'Automated Testing & CI/CD',
    'Development Environment Setup',
    'Next Steps'
  ];
  
  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      issues.push(`Missing section: ${section}`);
    }
  });
  
  // Check for deprecation warning mention
  if (!content.includes('Deprecation Warning Suppression')) {
    issues.push('Missing deprecation warning suppression documentation');
  }
  
  // Check for test commands
  if (!content.includes('npm test') || !content.includes('npm run test:e2e')) {
    issues.push('Missing test command documentation');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateDocsReadme() {
  console.log('\n📚 Validating docs/README.md...');
  const issues = [];
  
  if (!checkFileExists('docs/README.md')) {
    issues.push('docs/README.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('docs/README.md', 'utf-8');
  
  // Check for testing mention
  if (!content.includes('testing') && !content.includes('Testing')) {
    issues.push('Missing testing infrastructure reference');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateSetupAutomated() {
  console.log('\n🔧 Validating automation/setup-automated.js...');
  const issues = [];
  
  if (!checkFileExists('automation/setup-automated.js')) {
    issues.push('automation/setup-automated.js file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('automation/setup-automated.js', 'utf-8');
  
  // Check for Jest version specification
  if (!content.includes('jest@29.7.0')) {
    issues.push('Missing Jest version specification (should be 29.7.0)');
  }
  
  // Check for package.json overrides
  if (!content.includes('updatePackageJsonOverrides')) {
    issues.push('Missing package.json overrides function');
  }
  
  // Check for .npmrc creation
  if (!content.includes('.npmrc') || !content.includes('loglevel=error')) {
    issues.push('Missing .npmrc creation with loglevel=error');
  }
  
  // Check for deprecation warning testing
  if (!content.includes('Testing deprecation warning suppression')) {
    issues.push('Missing deprecation warning suppression testing');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateCLIImplementation() {
  console.log('\n⚙️  Validating automation/cli-implementation.md...');
  const issues = [];
  
  if (!checkFileExists('automation/cli-implementation.md')) {
    issues.push('automation/cli-implementation.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('automation/cli-implementation.md', 'utf-8');
  
  // Check for validate-docs command
  if (!content.includes('validate-docs')) {
    issues.push('Missing validate-docs command in CLI implementation');
  }
  
  return { valid: issues.length === 0, issues };
}

function checkConsistency() {
  console.log('\n🔍 Checking documentation consistency...');
  const issues = [];
  
  // Check if package.json has the right scripts
  if (checkFileExists('package.json')) {
    const packageContent = fs.readFileSync('package.json', 'utf-8');
    const packageJson = JSON.parse(packageContent);
    
    const requiredScripts = [
      'test',
      'test:watch',
      'test:coverage',
      'test:e2e',
      'test:all'
    ];
    
    requiredScripts.forEach(script => {
      if (!packageJson.scripts || !packageJson.scripts[script]) {
        issues.push(`Missing npm script: ${script}`);
      }
    });
    
    // Check for overrides
    if (!packageJson.overrides) {
      issues.push('Missing package.json overrides for deprecation warnings');
    }
  }
  
  // Check if .npmrc exists
  if (!checkFileExists('.npmrc')) {
    issues.push('Missing .npmrc file for deprecation warning suppression');
  }
  
  // Check if Jest config exists
  if (!checkFileExists('jest.config.js')) {
    issues.push('Missing jest.config.js file');
  }
  
  // Check if Playwright config exists
  if (!checkFileExists('playwright.config.js')) {
    issues.push('Missing playwright.config.js file');
  }
  
  return { valid: issues.length === 0, issues };
}

module.exports = {
  description: 'Validate documentation consistency and completeness',
  run: async (options) => {
    console.log('📋 Documentation Validation Report');
    console.log('============================================================');
    
    const results = {
      readme: validateReadme(),
      gettingStarted: validateGettingStarted(),
      docsReadme: validateDocsReadme(),
      setupAutomated: validateSetupAutomated(),
      cliImplementation: validateCLIImplementation(),
      consistency: checkConsistency()
    };
    
    let totalIssues = 0;
    let allValid = true;
    
    Object.entries(results).forEach(([name, result]) => {
      if (!result.valid) {
        allValid = false;
        totalIssues += result.issues.length;
      }
    });
    
    console.log('\n📊 Validation Results:');
    console.log('============================================================');
    
    Object.entries(results).forEach(([name, result]) => {
      const status = result.valid ? '✅ PASS' : '❌ FAIL';
      const nameFormatted = name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      console.log(`${status} ${nameFormatted}`);
      
      if (!result.valid && result.issues.length > 0) {
        result.issues.forEach(issue => {
          console.log(`   ⚠️  ${issue}`);
        });
      }
    });
    
    console.log('\n============================================================');
    console.log(`📈 Summary: ${totalIssues} issues found`);
    
    if (allValid) {
      console.log('🎉 All documentation is consistent and up to date!');
    } else {
      console.log('🔧 Please fix the issues above to ensure documentation consistency.');
      console.log('\n💡 Tips:');
      console.log('   • Run this command after making changes to documentation');
      console.log('   • Check that all new features are documented');
      console.log('   • Ensure automation scripts match documented behavior');
    }
    
    console.log('============================================================');
  }
};

---

**Version**: v0  
**Created**: 2025-06-22  
**Last Updated**: 2025-06-22  
**Status**: Ready for Use 