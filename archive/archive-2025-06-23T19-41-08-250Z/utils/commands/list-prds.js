#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function listPRDs() {
  console.log('📋 Product Requirements Documents (PRDs)\n');
  
  const prdDirs = ['docs/prd/active', 'docs/prd/archive'];
  let foundPRDs = [];
  
  prdDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(file => file.endsWith('.md') && file !== 'README.md');
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract basic info from PRD
        const titleMatch = content.match(/^# (PRD-\d+): (.+)$/m);
        const createdMatch = content.match(/## Created\n📅 (.+)/);
        const statusMatch = content.match(/## Status\n([\s\S]*?)(?=##|$)/);
        const priorityMatch = content.match(/## Priority\n(.+)/);
        
        if (titleMatch) {
          const [, id, title] = titleMatch;
          const created = createdMatch ? createdMatch[1] : 'Unknown';
          const priority = priorityMatch ? priorityMatch[1].trim() : 'Not set';
          
          // Determine status
          let status = 'Unknown';
          if (statusMatch) {
            const statusContent = statusMatch[1];
            if (statusContent.includes('- [x] Complete')) status = 'Complete';
            else if (statusContent.includes('- [x] In Development')) status = 'In Development';
            else if (statusContent.includes('- [x] Approved')) status = 'Approved';
            else if (statusContent.includes('- [x] In Review')) status = 'In Review';
            else if (statusContent.includes('- [x] Draft')) status = 'Draft';
            else if (statusContent.includes('- [x] Deprecated')) status = 'Deprecated';
          }
          
          foundPRDs.push({
            id,
            title,
            created,
            status,
            priority,
            path: filePath,
            location: dir.includes('archive') ? 'Archive' : 'Active'
          });
        }
      });
    }
  });
  
  if (foundPRDs.length === 0) {
    console.log('   No PRDs found. Create your first PRD with:');
    console.log('   node utils/cli.js create-prd [name]\n');
    return;
  }
  
  // Sort by ID
  foundPRDs.sort((a, b) => a.id.localeCompare(b.id));
  
  // Group by location
  const activePRDs = foundPRDs.filter(prd => prd.location === 'Active');
  const archivedPRDs = foundPRDs.filter(prd => prd.location === 'Archive');
  
  if (activePRDs.length > 0) {
    console.log('🟢 Active PRDs:');
    activePRDs.forEach(prd => {
      const statusIcon = getStatusIcon(prd.status);
      const priorityIcon = getPriorityIcon(prd.priority);
      console.log(`   ${statusIcon} ${prd.id}: ${prd.title}`);
      console.log(`      📅 Created: ${prd.created} | ${priorityIcon} ${prd.priority} | 📊 ${prd.status}`);
    });
    console.log('');
  }
  
  if (archivedPRDs.length > 0) {
    console.log('📦 Archived PRDs:');
    archivedPRDs.forEach(prd => {
      const statusIcon = getStatusIcon(prd.status);
      const priorityIcon = getPriorityIcon(prd.priority);
      console.log(`   ${statusIcon} ${prd.id}: ${prd.title}`);
      console.log(`      📅 Created: ${prd.created} | ${priorityIcon} ${prd.priority} | 📊 ${prd.status}`);
    });
    console.log('');
  }
  
  console.log(`📊 Summary: ${activePRDs.length} active, ${archivedPRDs.length} archived PRDs`);
  console.log('');
  console.log('💡 Next steps:');
  console.log('   • View a PRD: node utils/cli.js view-prd [id]');
  console.log('   • Generate stories: node utils/cli.js generate-stories [prd-id]');
  console.log('   • Update status: node utils/cli.js update-prd-status [prd-id] [status]');
}

function getStatusIcon(status) {
  switch (status) {
    case 'Complete': return '✅';
    case 'In Development': return '🚧';
    case 'Approved': return '👍';
    case 'In Review': return '👀';
    case 'Draft': return '📝';
    case 'Deprecated': return '🗑️';
    default: return '❓';
  }
}

function getPriorityIcon(priority) {
  if (priority.includes('🟢')) return '🟢';
  if (priority.includes('🟡')) return '🟡';
  if (priority.includes('🔴')) return '🔴';
  return '⚪';
}

module.exports = {
  description: 'List all Product Requirements Documents (PRDs)',
  run: listPRDs
}; 