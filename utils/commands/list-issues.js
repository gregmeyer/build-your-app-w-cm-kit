const fs = require('fs');
const path = require('path');

const ISSUES_DIR = path.join(process.cwd(), 'issues');

function parseIssueStatus(content) {
  const statusMatch = content.match(/- \[([ x])\] (Open|In Progress|Resolved)/);
  if (statusMatch) {
    const checked = statusMatch[1] === 'x';
    const status = statusMatch[2];
    return { checked, status };
  }
  return { checked: false, status: 'Unknown' };
}

function parseIssuePriority(content) {
  const priorityMatch = content.match(/## Priority\s*\n(🔴|🟡|🟢) (High|Medium|Low)/);
  if (priorityMatch) {
    const emoji = priorityMatch[1];
    const level = priorityMatch[2];
    return { emoji, level };
  }
  return { emoji: '⚪', level: 'Unknown' };
}

function parseIssueTitle(content) {
  const titleMatch = content.match(/# BUG-\d+: (.+)/);
  if (titleMatch) {
    return titleMatch[1];
  }
  return 'Untitled Issue';
}

function parseIssueDate(content) {
  const dateMatch = content.match(/## Created\s*\n📅 (.+)/);
  if (dateMatch) {
    return dateMatch[1];
  }
  return 'Unknown';
}

function getStatusEmoji(status, checked) {
  if (!checked) return '🔴'; // Open
  switch (status) {
    case 'In Progress': return '🟡';
    case 'Resolved': return '🟢';
    default: return '⚪';
  }
}

function listIssues() {
  console.log('\n🐛 Scanning issues directory...');
  
  if (!fs.existsSync(ISSUES_DIR)) {
    console.log('❌ Issues directory not found');
    return { valid: false, issues: [] };
  }
  
  const files = fs.readdirSync(ISSUES_DIR).filter(f => f.endsWith('.md') && f.startsWith('BUG-'));
  
  if (files.length === 0) {
    console.log('ℹ️  No issue files found');
    return { valid: true, issues: [] };
  }
  
  console.log(`✅ Found ${files.length} issue(s)`);
  
  const issues = [];
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(ISSUES_DIR, file), 'utf-8');
      const status = parseIssueStatus(content);
      const priority = parseIssuePriority(content);
      const title = parseIssueTitle(content);
      const date = parseIssueDate(content);
      
      issues.push({
        file,
        title,
        status: status.status,
        checked: status.checked,
        priority: priority.level,
        priorityEmoji: priority.emoji,
        date
      });
    } catch (error) {
      console.log(`⚠️  Error reading ${file}: ${error.message}`);
    }
  });
  
  return { valid: true, issues };
}

function displayIssues(issues) {
  if (issues.length === 0) {
    console.log('\n📋 No issues found');
    return;
  }
  
  console.log('\n📋 ISSUES LIST');
  console.log('============================================================');
  
  // Group by status
  const openIssues = issues.filter(i => !i.checked);
  const inProgressIssues = issues.filter(i => i.checked && i.status === 'In Progress');
  const resolvedIssues = issues.filter(i => i.checked && i.status === 'Resolved');
  
  // Display open issues
  if (openIssues.length > 0) {
    console.log(`\n🔴 OPEN ISSUES (${openIssues.length}):`);
    openIssues.forEach(issue => {
      console.log(`   ${issue.priorityEmoji} ${issue.file} - ${issue.title}`);
      console.log(`      📅 Created: ${issue.date} | 🔴 Priority: ${issue.priority}`);
    });
  }
  
  // Display in progress issues
  if (inProgressIssues.length > 0) {
    console.log(`\n🟡 IN PROGRESS (${inProgressIssues.length}):`);
    inProgressIssues.forEach(issue => {
      console.log(`   ${issue.priorityEmoji} ${issue.file} - ${issue.title}`);
      console.log(`      📅 Created: ${issue.date} | 🟡 Priority: ${issue.priority}`);
    });
  }
  
  // Display resolved issues
  if (resolvedIssues.length > 0) {
    console.log(`\n🟢 RESOLVED (${resolvedIssues.length}):`);
    resolvedIssues.forEach(issue => {
      console.log(`   ${issue.priorityEmoji} ${issue.file} - ${issue.title}`);
      console.log(`      📅 Created: ${issue.date} | 🟢 Priority: ${issue.priority}`);
    });
  }
}

function generateSummary(issues) {
  const total = issues.length;
  const open = issues.filter(i => !i.checked).length;
  const inProgress = issues.filter(i => i.checked && i.status === 'In Progress').length;
  const resolved = issues.filter(i => i.checked && i.status === 'Resolved').length;
  
  const highPriority = issues.filter(i => i.priority === 'High').length;
  const mediumPriority = issues.filter(i => i.priority === 'Medium').length;
  const lowPriority = issues.filter(i => i.priority === 'Low').length;
  
  console.log('\n📊 ISSUE SUMMARY');
  console.log('============================================================');
  console.log(`📋 Total Issues: ${total}`);
  console.log(`🔴 Open: ${open}`);
  console.log(`🟡 In Progress: ${inProgress}`);
  console.log(`🟢 Resolved: ${resolved}`);
  
  console.log('\n🎯 Priority Breakdown:');
  console.log(`🔴 High Priority: ${highPriority}`);
  console.log(`🟡 Medium Priority: ${mediumPriority}`);
  console.log(`🟢 Low Priority: ${lowPriority}`);
  
  if (open > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    if (highPriority > 0) {
      console.log('   🔴 Address high priority issues first');
    }
    if (inProgress === 0 && open > 0) {
      console.log('   🚀 Consider starting work on open issues');
    }
    console.log('   📝 Use update-ticket command to update issue status');
  }
  
  console.log('\n============================================================');
}

module.exports = {
  description: 'List all issues',
  run: async (options) => {
    console.log('🐛 Issues List');
    console.log('============================================================');
    
    const result = listIssues();
    
    if (!result.valid) {
      console.log('❌ Failed to scan issues directory');
      return;
    }
    
    displayIssues(result.issues);
    generateSummary(result.issues);
    
    console.log('\n🎉 Issue listing completed successfully');
  }
}; 