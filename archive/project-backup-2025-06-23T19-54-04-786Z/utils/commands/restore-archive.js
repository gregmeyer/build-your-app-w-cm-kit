#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Restore Archive Script
 * Restores the archived configuration: archive-2025-06-23T19-41-08-250Z
 */

function restoreArchive() {
  console.log('🔄 Restoring archived configuration...\n');
  
  const archivePath = '/Users/grmeyer/playground/build-app-cm-kit/archive/archive-2025-06-23T19-41-08-250Z';
  const archiveName = 'archive-2025-06-23T19-41-08-250Z';
  
  try {
    // Check if archive exists
    if (!fs.existsSync(archivePath)) {
      console.error(`❌ Archive not found: ${archivePath}`);
      process.exit(1);
    }
    
    // Read metadata
    const metadataPath = path.join(archivePath, 'archive-metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      console.log(`📋 Archive created: ${metadata.archivedAt}`);
      console.log(`📦 Items archived: ${metadata.itemsArchived}/${metadata.totalItems}`);
    }
    
    // Items to restore
    const itemsToRestore = [
      'src/app',
      'src/components', 
      'src/lib',
      'src/types',
      'utils',
      'tickets',
      'stories',
      'issues',
      'docs',
      'logs',
      'package.json',
      'package-lock.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'jest.config.js',
      'jest.setup.js',
      '.gitignore',
      '.vscode',
      'README.md',
      'getting-started.md',
      'workflow-overview.md'
    ];
    
    let restoredCount = 0;
    
    itemsToRestore.forEach(item => {
      const sourcePath = path.join(archivePath, item);
      const destPath = path.join(process.cwd(), item);
      
      if (fs.existsSync(sourcePath)) {
        // Create destination directory if needed
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        if (fs.statSync(sourcePath).isDirectory()) {
          // Copy directory
          copyDirectory(sourcePath, destPath);
        } else {
          // Copy file
          fs.copyFileSync(sourcePath, destPath);
        }
        
        console.log(`   ✅ Restored: ${item}`);
        restoredCount++;
      } else {
        console.log(`   ⚠️  Skipped: ${item} (not in archive)`);
      }
    });
    
    console.log(`\n✅ Restore completed successfully!`);
    console.log(`📦 Items restored: ${restoredCount}`);
    console.log(`\n🚀 You can now run: npm run dev`);
    
  } catch (error) {
    console.error(`❌ Error restoring archive: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Copy directory recursively
 */
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  const items = fs.readdirSync(source);
  
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const destPath = path.join(destination, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

if (require.main === module) {
  restoreArchive();
}

module.exports = { restoreArchive };
