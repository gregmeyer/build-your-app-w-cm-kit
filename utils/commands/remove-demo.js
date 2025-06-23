#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DEMO_FILES = [
  'src/app/admin/demo/page.tsx',
  'src/app/admin',
  'src/components/Hello.tsx',
  'src/components/Hello.test.tsx'
];

function removeDemoFiles() {
  console.log('🧹 Removing demo files and directories...');
  
  let removedCount = 0;
  
  DEMO_FILES.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          // Remove directory and all contents
          fs.rmSync(filePath, { recursive: true, force: true });
          console.log(`   ✅ Removed directory: ${filePath}`);
        } else {
          // Remove file
          fs.unlinkSync(filePath);
          console.log(`   ✅ Removed file: ${filePath}`);
        }
        removedCount++;
      } else {
        console.log(`   ℹ️  File/directory not found: ${filePath}`);
      }
    } catch (error) {
      console.log(`   ❌ Error removing ${filePath}: ${error.message}`);
    }
  });
  
  // Clean up empty directories
  const emptyDirs = [
    'src/app/admin',
    'src/components'
  ];
  
  emptyDirs.forEach(dirPath => {
    try {
      if (fs.existsSync(dirPath) && fs.readdirSync(dirPath).length === 0) {
        fs.rmdirSync(dirPath);
        console.log(`   ✅ Removed empty directory: ${dirPath}`);
      }
    } catch (error) {
      // Directory not empty or doesn't exist, ignore
    }
  });
  
  console.log(`\n🎉 Demo cleanup completed! Removed ${removedCount} items.`);
  console.log('\n📝 Next steps:');
  console.log('   • Update your homepage to remove references to /admin/demo');
  console.log('   • Create your own components and pages');
  console.log('   • Run npm test to ensure your test suite still works');
}

async function run(options = {}) {
  console.log('🚀 Coffee Money Platform - Remove Demo Files');
  console.log('='.repeat(60));
  
  removeDemoFiles();
  
  console.log('\n' + '='.repeat(60));
}

// CLI module exports
module.exports = {
  description: 'Remove demo files and sample components',
  run
}; 