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