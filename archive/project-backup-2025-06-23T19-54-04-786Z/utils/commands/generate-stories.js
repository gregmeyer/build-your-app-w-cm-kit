#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateStories() {
  const args = process.argv.slice(3);
  
  if (args.length === 0) {
    console.log('❌ Error: Please provide a PRD ID');
    console.log('Usage: node utils/cli.js generate-stories [prd-id]');
    console.log('');
    console.log('Example:');
    console.log('  node utils/cli.js generate-stories PRD-001');
    return;
  }
  
  const prdId = args[0].toUpperCase();
  
  // Find PRD file
  const prdFile = findPRDFile(prdId);
  if (!prdFile) {
    console.log(`❌ Error: PRD ${prdId} not found`);
    console.log('Use "node utils/cli.js list-prds" to see available PRDs');
    return;
  }
  
  console.log(`📖 Reading PRD: ${prdId}`);
  const prdContent = fs.readFileSync(prdFile, 'utf8');
  
  // Extract stories from PRD
  const stories = extractStoriesFromPRD(prdContent, prdId);
  
  if (stories.length === 0) {
    console.log('❌ No user stories found in PRD');
    console.log('Please add user stories to the PRD before generating');
    return;
  }
  
  console.log(`📝 Found ${stories.length} user stories in ${prdId}`);
  console.log('');
  
  // Ensure stories directory exists
  const storiesDir = 'stories';
  if (!fs.existsSync(storiesDir)) {
    fs.mkdirSync(storiesDir, { recursive: true });
  }
  
  let createdCount = 0;
  let skippedCount = 0;
  
  stories.forEach((story, index) => {
    const storyFileName = `STORY-${story.id}-${story.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    const storyFilePath = path.join(storiesDir, storyFileName);
    
    if (fs.existsSync(storyFilePath)) {
      console.log(`⏭️  Skipped: ${storyFileName} (already exists)`);
      skippedCount++;
      return;
    }
    
    const storyContent = generateStoryContent(story, prdId);
    fs.writeFileSync(storyFilePath, storyContent);
    
    console.log(`✅ Created: ${storyFileName}`);
    console.log(`   📝 ${story.title}`);
    console.log(`   🎯 Priority: ${story.priority}`);
    console.log(`   📊 Story Points: ${story.storyPoints}`);
    console.log('');
    
    createdCount++;
  });
  
  console.log(`📊 Summary: ${createdCount} created, ${skippedCount} skipped`);
  console.log('');
  console.log('💡 Next steps:');
  console.log('   • Review and refine the generated stories');
  console.log('   • Create tickets: node utils/cli.js create-ticket [story-id]');
  console.log('   • Update PRD status: node utils/cli.js update-prd-status', prdId, 'In Development');
}

function findPRDFile(prdId) {
  const prdDirs = ['docs/prd/active', 'docs/prd/archive'];
  
  for (const dir of prdDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(file => file.endsWith('.md') && file !== 'README.md');
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const titleMatch = content.match(/^# (PRD-\d+):/m);
        
        if (titleMatch && titleMatch[1] === prdId) {
          return filePath;
        }
      }
    }
  }
  
  return null;
}

function extractStoriesFromPRD(prdContent, prdId) {
  const stories = [];
  const storyRegex = /### STORY-(\d+): (.+?)(?=### STORY-|## |$)/gs;
  
  let match;
  while ((match = storyRegex.exec(prdContent)) !== null) {
    const [, storyId, title] = match;
    const storyContent = match[0];
    
    // Extract story details
    const asMatch = storyContent.match(/\*\*As a\*\* (.+?)\s*\*\*I want to\*\* (.+?)\s*\*\*So that\*\* (.+?)(?=\*\*Acceptance Criteria:|$)/s);
    const criteriaMatch = storyContent.match(/\*\*Acceptance Criteria:\*\*\s*((?:- \[ \].*?\n?)*)/s);
    const pointsMatch = storyContent.match(/\*\*Story Points:\*\* (\d+)/);
    const priorityMatch = storyContent.match(/\*\*Priority:\*\* (High|Medium|Low)/);
    
    if (asMatch) {
      const [, userType, action, benefit] = asMatch;
      
      // Extract acceptance criteria
      let acceptanceCriteria = [];
      if (criteriaMatch) {
        const criteriaText = criteriaMatch[1];
        const criteriaLines = criteriaText.split('\n').filter(line => line.trim().startsWith('- [ ]'));
        acceptanceCriteria = criteriaLines.map(line => line.replace('- [ ]', '').trim());
      }
      
      stories.push({
        id: storyId.padStart(3, '0'),
        title: title.trim(),
        userType: userType.trim(),
        action: action.trim(),
        benefit: benefit.trim(),
        acceptanceCriteria,
        storyPoints: pointsMatch ? parseInt(pointsMatch[1]) : 5,
        priority: priorityMatch ? priorityMatch[1] : 'Medium',
        prdId
      });
    }
  }
  
  return stories;
}

function generateStoryContent(story, prdId) {
  const today = new Date().toISOString().split('T')[0];
  
  return `# STORY-${story.id}: ${story.title}

## Created
📅 ${today}

## Last Updated
📅 ${today}

## Status
- [x] Not Started
- [ ] In Progress
- [ ] Review
- [ ] Complete

## Priority
${getPriorityEmoji(story.priority)} ${story.priority}

## Story Points
${story.storyPoints}

## PRD
${prdId}

## As a
${story.userType}

## I want to
${story.action}

## So that
${story.benefit}

## Acceptance Criteria
${story.acceptanceCriteria.map(criteria => `- [ ] ${criteria}`).join('\n')}

## Technical Notes
[Add any technical implementation details here]

## Dependencies
[Add any dependencies on other stories or tickets]

## Notes
[Additional notes or context]
`;
}

function getPriorityEmoji(priority) {
  switch (priority.toLowerCase()) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
    default: return '⚪';
  }
}

module.exports = {
  description: 'Generate user stories from a Product Requirements Document (PRD)',
  run: generateStories
}; 