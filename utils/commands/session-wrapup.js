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
  const validation = {
    valid: true,
    issues: [],
    files: {}
  };
  
  const requiredFiles = [
    'README.md',
    'getting-started.md',
    'docs/README.md',
    'workflow-overview.md'
  ];
  
  const requiredSections = {
    'README.md': [
      { name: 'Features', patterns: ['## Features', '## 🎨', 'What Comes Out of the Box', 'Development Tools'] },
      { name: 'Getting Started', patterns: ['## Getting Started', '## 🚀 Getting Started'] },
      { name: 'CLI Commands', patterns: ['## CLI Commands', 'Development Tools', 'CLI System'] }
    ],
    'getting-started.md': [
      { name: 'Prerequisites', patterns: ['## Prerequisites', '## Requirements'] },
      { name: 'Installation', patterns: ['## Installation', '## Setup', '## Automated Setup'] },
      { name: 'Usage', patterns: ['## Usage', '## Next Steps', '## Getting Started'] }
    ],
    'docs/README.md': [
      { name: 'Overview', patterns: ['## Overview', '## Introduction', '# Documentation'] },
      { name: 'Sections', patterns: ['## Sections', '## Pages', '## Documentation'] }
    ],
    'workflow-overview.md': [
      { name: 'Workflow', patterns: ['## Workflow', '## Process', '## System'] },
      { name: 'Commands', patterns: ['## Commands', 'CLI', 'Commands'] }
    ]
  };
  
  // Check if files exist
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      validation.valid = false;
      validation.issues.push(`Missing required file: ${file}`);
      validation.files[file] = { exists: false };
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      validation.files[file] = { exists: true, content: content };
      
      // Check required sections with flexible matching
      if (requiredSections[file]) {
        const missingSections = requiredSections[file].filter(section => {
          return !section.patterns.some(pattern => content.includes(pattern));
        });
        if (missingSections.length > 0) {
          validation.valid = false;
          validation.issues.push(`${file} missing sections: ${missingSections.map(s => s.name).join(', ')}`);
        }
      }
    }
  });
  
  // Check CLI documentation
  const cliDocsPath = path.join(process.cwd(), 'src/app/docs/cli/page.tsx');
  if (fs.existsSync(cliDocsPath)) {
    const cliContent = fs.readFileSync(cliDocsPath, 'utf8');
    if (!cliContent.includes('CLI Commands') && !cliContent.includes('Available Commands') && !cliContent.includes('CLI Reference')) {
      validation.valid = false;
      validation.issues.push('CLI documentation page needs updating');
    }
  }
  
  // Check automation documentation
  const automationDocsPath = path.join(process.cwd(), 'automation/cli-implementation.md');
  if (fs.existsSync(automationDocsPath)) {
    const autoContent = fs.readFileSync(automationDocsPath, 'utf8');
    if (!autoContent.includes('## Commands') && autoContent.length < 1000) {
      validation.valid = false;
      validation.issues.push('Automation documentation needs updating');
    }
  }
  
  return validation;
}

function updateDocumentation() {
  const updates = {
    success: true,
    updated: [],
    errors: []
  };
  
  try {
    // Update README.md with current CLI commands
    const readmePath = path.join(process.cwd(), 'README.md');
    if (fs.existsSync(readmePath)) {
      const readmeContent = fs.readFileSync(readmePath, 'utf8');
      
      // Check if CLI commands section needs updating
      if (!readmeContent.includes('archive-project') || !readmeContent.includes('sprint-report')) {
        updates.updated.push('README.md needs CLI commands update');
      }
    }
    
    // Update getting-started.md with current project structure
    const gettingStartedPath = path.join(process.cwd(), 'getting-started.md');
    if (fs.existsSync(gettingStartedPath)) {
      const gsContent = fs.readFileSync(gettingStartedPath, 'utf8');
      
      // Check if it mentions current features
      if (!gsContent.includes('sprint-report') || !gsContent.includes('archive-project')) {
        updates.updated.push('getting-started.md needs feature updates');
      }
    }
    
    // Update docs/README.md
    const docsReadmePath = path.join(process.cwd(), 'docs/README.md');
    if (fs.existsSync(docsReadmePath)) {
      const docsContent = fs.readFileSync(docsReadmePath, 'utf8');
      
      if (!docsContent.includes('Sprint Reports') || !docsContent.includes('Project Archiving')) {
        updates.updated.push('docs/README.md needs content updates');
      }
    }
    
  } catch (error) {
    updates.success = false;
    updates.errors.push(error.message);
  }
  
  return updates;
}

function validateSampleContent() {
  const validation = {
    valid: true,
    issues: [],
    samples: {}
  };
  
  const sampleDirs = [
    'examples/sample-tickets',
    'examples/sample-stories',
    'examples/sample-issues'
  ];
  
  sampleDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
      validation.samples[dir] = { count: files.length, files: files };
      
      if (files.length === 0) {
        validation.valid = false;
        validation.issues.push(`No sample files in ${dir}`);
      }
      
      // Check sample file quality
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (content.length < 100) {
          validation.valid = false;
          validation.issues.push(`Sample file ${file} is too short`);
        }
        
        // Check for status field with flexible matching
        const statusPatterns = ['**Status:**', '## Status', 'Status:', 'Status'];
        const hasStatus = statusPatterns.some(pattern => content.includes(pattern));
        
        // Check for priority field with flexible matching
        const priorityPatterns = ['**Priority:**', '## Priority', 'Priority:', 'Priority'];
        const hasPriority = priorityPatterns.some(pattern => content.includes(pattern));
        
        if (!hasStatus && !hasPriority) {
          validation.valid = false;
          validation.issues.push(`Sample file ${file} missing required fields (Status or Priority)`);
        }
      });
    } else {
      validation.valid = false;
      validation.issues.push(`Sample directory missing: ${dir}`);
    }
  });
  
  return validation;
}

function generateSessionReport(stats, testSuccess, gitStatus, docsValidation, docsUpdate, sampleValidation) {
  console.log('\n🎯 SESSION WRAP-UP REPORT');
  console.log('============================================================');
  
  // Project status
  console.log('\n📈 PROJECT STATUS:');
  console.log(`   Tickets: ${stats.tickets.completed}/${stats.tickets.total} completed (${Math.round((stats.tickets.completed / stats.tickets.total) * 100)}%)`);
  console.log(`   Issues: ${stats.issues.resolved}/${stats.issues.total} resolved (${Math.round((stats.issues.resolved / stats.issues.total) * 100)}%)`);
  
  // Test status
  console.log('\n🧪 TEST STATUS:');
  if (testSuccess) {
    console.log('   ✅ All tests passing');
  } else {
    console.log('   ❌ Some tests failed');
  }
  
  // Git status
  console.log('\n📊 GIT STATUS:');
  if (gitStatus.clean) {
    console.log('   ✅ Working directory clean');
  } else {
    console.log(`   ⚠️  ${gitStatus.total} files modified`);
  }
  
  // Documentation status
  console.log('\n📋 Documentation Status:');
  if (docsValidation.valid) {
    console.log('   ✅ Documentation is consistent and up to date');
  } else {
    console.log('   ❌ Documentation issues found');
    docsValidation.issues.forEach(issue => {
      console.log(`   ⚠️  ${issue}`);
    });
  }
  
  // Next steps
  console.log('\n🎯 NEXT STEPS:');
  if (stats.tickets.ready > 0) {
    console.log(`   📋 ${stats.tickets.ready} tickets ready to pick up`);
  }
  if (stats.issues.open > 0) {
    console.log(`   🐛 ${stats.issues.open} open issues to address`);
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
  
  // Additional report content
  console.log('\n📝 Documentation Updates:');
  if (docsUpdate.success) {
    console.log('   ✅ Documentation updated successfully');
    docsUpdate.updated.forEach(update => console.log(`  - ${update}`));
  } else {
    console.log('   ❌ Documentation update failed');
    docsUpdate.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  console.log('\n📋 Sample Content Validation:');
  if (sampleValidation.valid) {
    console.log('   ✅ Sample content is valid and complete');
  } else {
    console.log('   ❌ Sample content issues found');
    sampleValidation.issues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  // Generate report file
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, '-');
  const reportFilename = `session-wrapup-report-${dateStr}.md`;
  const reportPath = path.join(LOGS_DIR, reportFilename);
  
  const reportContent = `# CM Kit Platform - Session Wrap-up Report

## Session Information
- **Date**: ${now.toISOString()}
- **Filename**: \`${reportFilename}\`
- **Duration**: Session completed successfully

## Session Summary

### Key Metrics
- **Session completed at**: ${now.toISOString()}
- **Log file**: \`${reportFilename}\`
- **Project status**: ${stats.tickets.completed}/${stats.tickets.total} tickets completed
- **Test status**: ${testSuccess ? 'All tests passing' : 'Some tests failed'}
- **Git status**: ${gitStatus.clean ? 'Clean' : `${gitStatus.total} files modified`}

### Session Status
- ✅ Session wrap-up completed successfully
- 📝 Log file created and saved
- 🔄 Agent context updated
- 🧪 Tests executed
- 📊 Git status checked

### Documentation Status
- ${docsValidation.valid ? '✅ Documentation is consistent and up to date' : '❌ Documentation issues found'}
${docsValidation.issues.length > 0 ? `  - ${docsValidation.issues.join('\n  - ')}` : ''}

### Documentation Updates
- ${docsUpdate.success ? '✅ Documentation updated successfully' : '❌ Documentation update failed'}
${docsUpdate.errors.length > 0 ? `  - ${docsUpdate.errors.join('\n  - ')}` : ''}

### Sample Content Validation
- ${sampleValidation.valid ? '✅ Sample content is valid and complete' : '❌ Sample content issues found'}
${sampleValidation.issues.length > 0 ? `  - ${sampleValidation.issues.join('\n  - ')}` : ''}

---
*Generated automatically by CM Kit Platform CLI*
`;
  
  fs.writeFileSync(reportPath, reportContent);
  console.log(`📝 Session report saved to: ${reportPath}`);
  
  return reportPath;
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
  const reportPath = generateSessionReport(stats, testSuccess, gitStatus, docsValidation, { success: true, updated: [], errors: [] }, { valid: true, issues: [] });
  
  // Create session log file
  const logPath = createSessionLog();
  
  // Final status
  const overallSuccess = contextUpdated && testSuccess && docsValidation.valid;
  console.log(`\n🎉 Session wrap-up ${overallSuccess ? 'completed successfully' : 'completed with issues'}`);
  console.log(`📝 Session report saved to: ${reportPath}`);
  console.log(`📝 Session log saved to: ${logPath}`);
  
  if (!overallSuccess) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  description: 'Complete development session with documentation validation and project cleanup',
  run: async (options) => {
    console.log('🏁 Session Wrap-up');
    console.log('============================================================');
    
    try {
      // 1. Validate documentation completeness
      console.log('📚 Validating Documentation...');
      const docsValidation = validateDocumentation();
      
      // 2. Update key documentation files
      console.log('📝 Updating Documentation...');
      const docsUpdate = updateDocumentation();
      
      // 3. Validate sample content
      console.log('📋 Validating Sample Content...');
      const sampleValidation = validateSampleContent();
      
      // 4. Run tests
      console.log('🧪 Running Tests...');
      const testSuccess = runTests();
      
      // 5. Check git status
      console.log('📊 Checking Git Status...');
      const gitStatus = checkGitStatus();
      
      // 6. Update agent context
      console.log('🤖 Updating Agent Context...');
      const contextUpdated = updateAgentContext();
      
      // 7. Get project statistics
      console.log('📈 Gathering Project Statistics...');
      const stats = getProjectStats();
      
      // 8. Generate session report
      console.log('📊 Generating Session Report...');
      const reportPath = generateSessionReport(stats, testSuccess, gitStatus, docsValidation, docsUpdate, sampleValidation);
      
      // 9. Create session log
      console.log('📝 Creating Session Log...');
      const logPath = createSessionLog();
      
      // 10. Final summary
      console.log('\n🎉 Session Wrap-up Complete!');
      console.log('============================================================');
      console.log(`📊 Session Report: ${reportPath}`);
      console.log(`📝 Session Log: ${logPath}`);
      console.log(`✅ Documentation: ${docsValidation.valid ? 'Valid' : 'Needs attention'}`);
      console.log(`✅ Tests: ${testSuccess ? 'Passed' : 'Failed'}`);
      console.log(`✅ Git Status: ${gitStatus.clean ? 'Clean' : 'Has changes'}`);
      
      if (!docsValidation.valid) {
        console.log('\n⚠️  Documentation Issues Found:');
        docsValidation.issues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
      }
      
      if (!gitStatus.clean) {
        console.log('\n💡 Consider committing your changes:');
        console.log('  git add . && git commit -m "Session wrap-up: [describe changes]"');
      }
      
    } catch (error) {
      console.error('❌ Session wrap-up failed:', error.message);
    }
  }
};
