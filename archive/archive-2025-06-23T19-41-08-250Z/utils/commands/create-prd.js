#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function createPRD() {
  const args = process.argv.slice(3);
  
  if (args.length === 0) {
    console.log('❌ Error: Please provide a PRD name');
    console.log('Usage: node utils/cli.js create-prd "Feature Name"');
    console.log('');
    console.log('Example:');
    console.log('  node utils/cli.js create-prd "User Authentication"');
    return;
  }
  
  const prdName = args.join(' ');
  const today = new Date().toISOString().split('T')[0];
  
  // Find next PRD ID
  const nextId = getNextPRDId();
  const prdId = `PRD-${nextId.toString().padStart(3, '0')}`;
  
  // Ensure directories exist
  const activeDir = 'docs/prd/active';
  if (!fs.existsSync(activeDir)) {
    fs.mkdirSync(activeDir, { recursive: true });
  }
  
  // Read template
  const templatePath = 'docs/prd/templates/feature-prd.md';
  if (!fs.existsSync(templatePath)) {
    console.log('❌ Error: PRD template not found at', templatePath);
    console.log('Please ensure the template exists before creating PRDs');
    return;
  }
  
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Replace template placeholders
  template = template
    .replace(/PRD-\[ID\]: \[Feature Name\]/g, `${prdId}: ${prdName}`)
    .replace(/📅 YYYY-MM-DD/g, `📅 ${today}`)
    .replace(/\[Feature Name\]/g, prdName)
    .replace(/\[user type\]/g, 'user')
    .replace(/\[action\/feature\]/g, 'perform this action')
    .replace(/\[benefit\/value\]/g, 'achieve this benefit')
    .replace(/\[Specific, testable criteria\]/g, 'User can perform the action successfully')
    .replace(/\[1-13\]/g, '5')
    .replace(/\[High\/Medium\/Low\]/g, 'Medium');
  
  // Create PRD file
  const fileName = `${prdId.toLowerCase().replace('prd-', 'prd-')}-${prdName.toLowerCase().replace(/\s+/g, '-')}.md`;
  const filePath = path.join(activeDir, fileName);
  
  fs.writeFileSync(filePath, template);
  
  console.log('✅ Created new PRD:');
  console.log(`   📄 File: ${filePath}`);
  console.log(`   🆔 ID: ${prdId}`);
  console.log(`   📝 Title: ${prdName}`);
  console.log(`   📅 Created: ${today}`);
  console.log('');
  console.log('💡 Next steps:');
  console.log('   • Edit the PRD to add your specific requirements');
  console.log('   • Add user stories with acceptance criteria');
  console.log('   • Set priority and timeline');
  console.log('   • Generate stories: node utils/cli.js generate-stories', prdId);
  console.log('');
  console.log('📖 PRD Structure:');
  console.log('   • Executive Summary - Brief overview and business value');
  console.log('   • Problem Statement - What problem this solves');
  console.log('   • User Stories - Detailed user stories with acceptance criteria');
  console.log('   • Technical Requirements - Functional and non-functional requirements');
  console.log('   • Success Metrics - How success will be measured');
  console.log('   • Dependencies - What this depends on');
  console.log('   • Timeline - Estimated development timeline');
}

function getNextPRDId() {
  const prdDirs = ['docs/prd/active', 'docs/prd/archive'];
  let maxId = 0;
  
  prdDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(file => file.endsWith('.md') && file !== 'README.md');
      
      files.forEach(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8');
        const titleMatch = content.match(/^# (PRD-(\d+)):/m);
        
        if (titleMatch) {
          const id = parseInt(titleMatch[2]);
          if (id > maxId) maxId = id;
        }
      });
    }
  });
  
  return maxId + 1;
}

module.exports = {
  description: 'Create a new Product Requirements Document (PRD)',
  run: createPRD
}; 