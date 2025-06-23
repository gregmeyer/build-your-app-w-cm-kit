#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DEMO_FILES = [
  'src/app/admin/demo/page.tsx',
  'src/app/admin',
  'src/components/Hello.tsx',
  'src/components/Hello.test.tsx'
];

// Files to preserve (documentation pages and UI components)
const PRESERVE_FILES = [
  'src/app/docs/page.tsx',
  'src/app/docs/cli/page.tsx',
  'src/app/docs/workflow/page.tsx',
  'src/app/docs/components/page.tsx',
  'src/app/docs/api/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/security/page.tsx',
  'src/app/terms/page.tsx',
  'src/components/ui/Lightbox.tsx',
  'src/components/ui/Button.tsx',
  'src/components/ui/Card.tsx',
  'src/components/ui/Badge.tsx',
  'src/components/ui/Footer.tsx'
];

function removeDemoFiles() {
  console.log('🧹 Removing demo files and directories...');
  
  let removedCount = 0;
  
  DEMO_FILES.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
          // Remove directory and all contents, but preserve docs
          if (filePath === 'src/app/admin') {
            // Only remove admin/demo, preserve other admin content
            const demoPath = path.join(filePath, 'demo');
            if (fs.existsSync(demoPath)) {
              fs.rmSync(demoPath, { recursive: true, force: true });
              console.log(`   ✅ Removed directory: ${demoPath}`);
              removedCount++;
            }
          } else {
            fs.rmSync(filePath, { recursive: true, force: true });
            console.log(`   ✅ Removed directory: ${filePath}`);
            removedCount++;
          }
        } else {
          // Remove file
          fs.unlinkSync(filePath);
          console.log(`   ✅ Removed file: ${filePath}`);
          removedCount++;
        }
      } else {
        console.log(`   ℹ️  File/directory not found: ${filePath}`);
      }
    } catch (error) {
      console.log(`   ❌ Error removing ${filePath}: ${error.message}`);
    }
  });
  
  // Clean up empty directories
  const emptyDirs = [
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
  console.log('\n📝 Documentation and UI components preserved:');
  PRESERVE_FILES.forEach(file => {
    console.log(`   • ${file}`);
  });
  console.log('\n📝 Next steps:');
  console.log('   • Update your homepage to remove references to /admin/demo');
  console.log('   • Create your own components and pages');
  console.log('   • Run npm test to ensure your test suite still works');
  console.log('   • Documentation is available at /docs');
  console.log('   • UI components are available in src/components/ui/');
}

async function run(options = {}) {
  console.log('🚀 CM Kit Platform - Remove Demo Files');
  console.log('='.repeat(60));
  
  removeDemoFiles();
  
  console.log('\n' + '='.repeat(60));
  console.log('');
  console.log('🎉 Demo files removed successfully!');
  console.log('');
  console.log('📚 Documentation pages have been preserved:');
  console.log('   • /docs - Main documentation index');
  console.log('   • /docs/cli - CLI reference');
  console.log('   • /docs/workflow - Workflow guide');
  console.log('   • /docs/components - Component library');
  console.log('   • /docs/api - API documentation');
  console.log('');
  console.log('⚖️  Legal pages have been preserved:');
  console.log('   • /privacy - Privacy Policy');
  console.log('   • /security - Security Information');
  console.log('   • /terms - Terms of Service');
  console.log('');
  console.log('🧩 UI components have been preserved:');
  console.log('   • src/components/ui/ - Reusable UI components');
  console.log('');
  console.log('🚀 CM Kit Platform - Remove Demo Files');
  console.log('   Your project is now clean and ready for development.');
}

// CLI module exports
module.exports = {
  description: 'Remove demo files and sample components',
  run
}; 