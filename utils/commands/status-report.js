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