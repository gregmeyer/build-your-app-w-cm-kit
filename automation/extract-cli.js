#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extract CLI code from markdown documentation
 * This script helps users extract the JavaScript code from cli-implementation.md
 */

function extractCodeBlocks(markdownContent) {
  const codeBlocks = [];
  const lines = markdownContent.split('\n');
  let inCodeBlock = false;
  let currentBlock = { language: '', content: [], filename: '' };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for code block start
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Starting a new code block
        inCodeBlock = true;
        const language = line.slice(3).trim();
        currentBlock = { language, content: [], filename: '' };
        
        // Check if next line contains filename
        if (i + 1 < lines.length && lines[i + 1].includes('(') && lines[i + 1].includes(')')) {
          const filenameMatch = lines[i + 1].match(/`([^`]+)`/);
          if (filenameMatch) {
            currentBlock.filename = filenameMatch[1];
          }
        }
      } else {
        // Ending a code block
        inCodeBlock = false;
        if (currentBlock.language === 'javascript' || currentBlock.language === 'js') {
          codeBlocks.push(currentBlock);
        }
      }
    } else if (inCodeBlock) {
      currentBlock.content.push(line);
    }
  }
  
  return codeBlocks;
}

function createCLIFiles() {
  console.log('🚀 Extracting CLI code from documentation...\n');
  
  // Read the CLI implementation markdown
  const cliDocPath = path.join(__dirname, 'cli-implementation.md');
  if (!fs.existsSync(cliDocPath)) {
    console.error('❌ cli-implementation.md not found');
    process.exit(1);
  }
  
  const markdownContent = fs.readFileSync(cliDocPath, 'utf-8');
  const codeBlocks = extractCodeBlocks(markdownContent);
  
  console.log(`📋 Found ${codeBlocks.length} JavaScript code blocks\n`);
  
  // Create utils directory structure
  const utilsDir = path.join(process.cwd(), 'utils');
  const commandsDir = path.join(utilsDir, 'commands');
  const libDir = path.join(utilsDir, 'lib');
  
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }
  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
  }
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  
  let filesCreated = 0;
  
  codeBlocks.forEach((block, index) => {
    if (block.filename) {
      const filePath = path.join(process.cwd(), block.filename);
      const content = block.content.join('\n');
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Created: ${block.filename}`);
      filesCreated++;
    } else {
      console.log(`⚠️  Skipping block ${index + 1}: No filename specified`);
    }
  });
  
  console.log(`\n🎉 Successfully created ${filesCreated} CLI files!`);
  console.log('\n📝 Next steps:');
  console.log('1. Make the CLI executable: chmod +x utils/cli.js');
  console.log('2. Test the CLI: node utils/cli.js help');
  console.log('3. Start your first session: node utils/cli.js session-start');
}

if (require.main === module) {
  createCLIFiles();
}

module.exports = { extractCodeBlocks, createCLIFiles }; 