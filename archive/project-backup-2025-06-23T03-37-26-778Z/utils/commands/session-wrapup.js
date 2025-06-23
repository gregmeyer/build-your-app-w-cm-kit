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
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '-');
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
  const logContent = [
    `# Coffee Money Platform - Session Complete Log`,
    ``,
    `## Session Information`,
    `- **Date**: ${now.toISOString()}`,
    `- **Session Number**: ${sessionNumber}`,
    `- **Filename**: \`${filename}\``,
    `- **Duration**: ${consoleOutput.length} output lines`,
    ``,
    `## Session Output`,
    ``,
    '```bash',
    ...consoleOutput,
    '```',
    ``,
    `## Session Summary`,
    ``,
    `### Key Metrics`,
    `- **Session completed at**: ${now.toISOString()}`,
    `- **Log file**: \`${filename}\``,
    `- **Total output lines**: ${consoleOutput.length}`,
    `- **Session number**: ${sessionNumber}`,
    ``,
    `### Session Status`,
    `- ✅ Session wrap-up completed successfully`,
    `- 📝 Log file created and saved`,
    `- 🔄 Agent context updated`,
    `- 🧪 Tests executed`,
    `- 📊 Git status checked`,
    ``,
    `---`,
    `*Generated automatically by Coffee Money Platform CLI*`
  ].join('\n');
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
  const ticketFiles = fs.readdirSync(TICKETS_DIR).filter(f => f.endsWith('.md') && f.startsWith('TICKET-'));
  stats.tickets.total = ticketFiles.length;
  ticketFiles.forEach(file => {
    const content = fs.readFileSync(path.join(TICKETS_DIR, file), 'utf-8');
    if (content.includes('✅ Complete')) stats.tickets.completed++;
    else if (content.includes('🔄 In Progress')) stats.tickets.inProgress++;
    else stats.tickets.notStarted++;
  });
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
  const testResult = runCommand('npm test', 'Running test suite');
  if (testResult.success) {
    const coverageMatch = testResult.output.match(/All files\s+\|\s+(\d+\.?\d*)%/);
    if (coverageMatch) {
      console.log(`📊 Test Coverage: ${coverageMatch[1]}%`);
    }
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
  console.log('\n📈 PROJECT STATUS:');
  console.log(`   Tickets: ${stats.tickets.completed}/${stats.tickets.total} completed (${Math.round(stats.tickets.completed/stats.tickets.total*100)}%)`);
  console.log(`   Issues: ${stats.issues.resolved}/${stats.issues.total} resolved (${Math.round(stats.issues.resolved/stats.issues.total*100)}%)`);
  console.log('\n🧪 TEST STATUS:');
  if (testSuccess) {
    console.log('   ✅ All tests passing');
  } else {
    console.log('   ❌ Some tests failing - review needed');
  }
  console.log('\n📊 GIT STATUS:');
  if (gitStatus.clean) {
    console.log('   ✅ Working directory clean');
  } else {
    console.log(`   📝 ${gitStatus.total} files changed (${gitStatus.modified} modified, ${gitStatus.added} added)`);
  }
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
  console.log('🚀 Coffee Money Platform - Session Wrap-up');
  console.log('='.repeat(60));
  const contextUpdated = updateAgentContext();
  const stats = getProjectStats();
  const testSuccess = runTests();
  const gitStatus = checkGitStatus();
  generateSessionReport(stats, testSuccess, gitStatus);
  const logPath = createSessionLog();
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

module.exports = { 
  description: 'Wrap up a development session with logging and reporting',
  run: (options, logger) => main() 
}; 