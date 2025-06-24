// TODO: Paste the list-stories implementation here
// This should list all user stories in the stories directory

const fs = require('fs');
const path = require('path');

const STORIES_DIR = path.join(process.cwd(), 'stories');

function parseStoryStatus(content) {
  const statusMatch = content.match(/- \[([ x])\] (Not Started|In Progress|Review|Complete)/);
  if (statusMatch) {
    const checked = statusMatch[1] === 'x';
    const status = statusMatch[2];
    return { checked, status };
  }
  return { checked: false, status: 'Unknown' };
}

function parseStoryPriority(content) {
  const priorityMatch = content.match(/## Priority\s*\n(🔴|🟡|🟢) (High|Medium|Low)/);
  if (priorityMatch) {
    const emoji = priorityMatch[1];
    const level = priorityMatch[2];
    return { emoji, level };
  }
  return { emoji: '⚪', level: 'Unknown' };
}

function parseStoryTitle(content) {
  const titleMatch = content.match(/# STORY-\d+: (.+)/);
  if (titleMatch) {
    return titleMatch[1];
  }
  return 'Untitled Story';
}

function parseStoryDate(content) {
  const dateMatch = content.match(/## Created\s*\n📅 (.+)/);
  if (dateMatch) {
    return dateMatch[1];
  }
  return 'Unknown';
}

function listStories() {
  console.log('\n📖 Scanning stories directory...');
  
  if (!fs.existsSync(STORIES_DIR)) {
    console.log('❌ Stories directory not found');
    return { valid: false, stories: [] };
  }
  
  const files = fs.readdirSync(STORIES_DIR).filter(f => f.endsWith('.md') && f.startsWith('STORY-'));
  
  if (files.length === 0) {
    console.log('ℹ️  No story files found');
    return { valid: true, stories: [] };
  }
  
  console.log(`✅ Found ${files.length} story(ies)`);
  
  const stories = [];
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(STORIES_DIR, file), 'utf-8');
      const status = parseStoryStatus(content);
      const priority = parseStoryPriority(content);
      const title = parseStoryTitle(content);
      const date = parseStoryDate(content);
      
      stories.push({
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
  
  return { valid: true, stories };
}

function displayStories(stories) {
  if (stories.length === 0) {
    console.log('\n📋 No stories found');
    return;
  }
  
  console.log('\n📋 STORIES LIST');
  console.log('============================================================');
  
  // Group by status
  const notStarted = stories.filter(s => s.status === 'Not Started');
  const inProgress = stories.filter(s => s.status === 'In Progress');
  const review = stories.filter(s => s.status === 'Review');
  const complete = stories.filter(s => s.status === 'Complete');
  
  // Display not started stories
  if (notStarted.length > 0) {
    console.log(`\n🔴 NOT STARTED (${notStarted.length}):`);
    notStarted.forEach(story => {
      console.log(`   ${story.priorityEmoji} ${story.file} - ${story.title}`);
      console.log(`      📅 Created: ${story.date} | 🔴 Priority: ${story.priority}`);
    });
  }
  
  // Display in progress stories
  if (inProgress.length > 0) {
    console.log(`\n🟡 IN PROGRESS (${inProgress.length}):`);
    inProgress.forEach(story => {
      console.log(`   ${story.priorityEmoji} ${story.file} - ${story.title}`);
      console.log(`      📅 Created: ${story.date} | 🟡 Priority: ${story.priority}`);
    });
  }
  
  // Display review stories
  if (review.length > 0) {
    console.log(`\n🔵 IN REVIEW (${review.length}):`);
    review.forEach(story => {
      console.log(`   ${story.priorityEmoji} ${story.file} - ${story.title}`);
      console.log(`      📅 Created: ${story.date} | 🔵 Priority: ${story.priority}`);
    });
  }
  
  // Display complete stories
  if (complete.length > 0) {
    console.log(`\n🟢 COMPLETE (${complete.length}):`);
    complete.forEach(story => {
      console.log(`   ${story.priorityEmoji} ${story.file} - ${story.title}`);
      console.log(`      📅 Created: ${story.date} | 🟢 Priority: ${story.priority}`);
    });
  }
}

function generateSummary(stories) {
  const total = stories.length;
  const notStarted = stories.filter(s => s.status === 'Not Started').length;
  const inProgress = stories.filter(s => s.status === 'In Progress').length;
  const review = stories.filter(s => s.status === 'Review').length;
  const complete = stories.filter(s => s.status === 'Complete').length;
  
  const highPriority = stories.filter(s => s.priority === 'High').length;
  const mediumPriority = stories.filter(s => s.priority === 'Medium').length;
  const lowPriority = stories.filter(s => s.priority === 'Low').length;
  
  console.log('\n📊 STORY SUMMARY');
  console.log('============================================================');
  console.log(`📋 Total Stories: ${total}`);
  console.log(`🔴 Not Started: ${notStarted}`);
  console.log(`🟡 In Progress: ${inProgress}`);
  console.log(`🔵 In Review: ${review}`);
  console.log(`🟢 Complete: ${complete}`);
  
  console.log('\n🎯 Priority Breakdown:');
  console.log(`🔴 High Priority: ${highPriority}`);
  console.log(`🟡 Medium Priority: ${mediumPriority}`);
  console.log(`🟢 Low Priority: ${lowPriority}`);
  
  if (notStarted > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    if (highPriority > 0) {
      console.log('   🔴 Address high priority stories first');
    }
    if (inProgress === 0 && notStarted > 0) {
      console.log('   🚀 Consider starting work on not started stories');
    }
    console.log('   📝 Use pick-story command to start a story');
  }
  
  console.log('\n============================================================');
}

module.exports = {
  description: 'List all user stories',
  run: async (options) => {
    console.log('📖 User Stories List');
    console.log('============================================================');
    
    const result = listStories();
    
    if (!result.valid) {
      console.log('❌ Failed to scan stories directory');
      return;
    }
    
    displayStories(result.stories);
    generateSummary(result.stories);
    
    console.log('\n🎉 Story listing completed successfully');
  }
}; 