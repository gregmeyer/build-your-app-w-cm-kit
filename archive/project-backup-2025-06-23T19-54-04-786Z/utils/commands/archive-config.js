#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Archive Configuration Command
 * Archives the current project configuration and state for safe testing
 */

function archiveConfig() {
  console.log('📦 Archiving current configuration...\n');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveName = `archive-${timestamp}`;
  const archivePath = path.join(process.cwd(), 'archive', archiveName);
  
  try {
    // Create archive directory
    if (!fs.existsSync('archive')) {
      fs.mkdirSync('archive', { recursive: true });
    }
    
    if (!fs.existsSync(archivePath)) {
      fs.mkdirSync(archivePath, { recursive: true });
    }
    
    console.log(`📁 Creating archive: ${archiveName}`);
    
    // Files and directories to archive
    const itemsToArchive = [
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
    
    let archivedCount = 0;
    
    itemsToArchive.forEach(item => {
      const sourcePath = path.join(process.cwd(), item);
      const destPath = path.join(archivePath, item);
      
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
        
        console.log(`   ✅ Archived: ${item}`);
        archivedCount++;
      } else {
        console.log(`   ⚠️  Skipped: ${item} (not found)`);
      }
    });
    
    // Create archive metadata
    const metadata = {
      archivedAt: new Date().toISOString(),
      archiveName: archiveName,
      itemsArchived: archivedCount,
      totalItems: itemsToArchive.length,
      gitStatus: getGitStatus(),
      nodeVersion: process.version,
      npmVersion: getNpmVersion(),
      description: 'Archive created before testing modular setup script'
    };
    
    fs.writeFileSync(
      path.join(archivePath, 'archive-metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    
    console.log(`\n📋 Archive metadata saved`);
    
    // Create restore script
    createRestoreScript(archivePath, archiveName);
    
    console.log(`\n✅ Archive completed successfully!`);
    console.log(`📁 Archive location: ${archivePath}`);
    console.log(`🔄 To restore: node utils/commands/restore-archive.js ${archiveName}`);
    console.log(`\n🚀 You can now safely test the new modular setup script!`);
    
  } catch (error) {
    console.error(`❌ Error creating archive: ${error.message}`);
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

/**
 * Get git status information
 */
function getGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    
    return {
      branch: branch,
      commit: commit,
      hasChanges: status.length > 0,
      changes: status || 'No changes'
    };
  } catch (error) {
    return {
      error: 'Git not available or not a git repository',
      details: error.message
    };
  }
}

/**
 * Get npm version
 */
function getNpmVersion() {
  try {
    return execSync('npm --version', { encoding: 'utf8' }).trim();
  } catch (error) {
    return 'Unknown';
  }
}

/**
 * Create restore script for this archive
 */
function createRestoreScript(archivePath, archiveName) {
  const restoreScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Restore Archive Script
 * Restores the archived configuration: ${archiveName}
 */

function restoreArchive() {
  console.log('🔄 Restoring archived configuration...\\n');
  
  const archivePath = '${archivePath.replace(/\\/g, '\\\\')}';
  const archiveName = '${archiveName}';
  
  try {
    // Check if archive exists
    if (!fs.existsSync(archivePath)) {
      console.error(\`❌ Archive not found: \${archivePath}\`);
      process.exit(1);
    }
    
    // Read metadata
    const metadataPath = path.join(archivePath, 'archive-metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      console.log(\`📋 Archive created: \${metadata.archivedAt}\`);
      console.log(\`📦 Items archived: \${metadata.itemsArchived}/\${metadata.totalItems}\`);
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
        
        console.log(\`   ✅ Restored: \${item}\`);
        restoredCount++;
      } else {
        console.log(\`   ⚠️  Skipped: \${item} (not in archive)\`);
      }
    });
    
    console.log(\`\\n✅ Restore completed successfully!\`);
    console.log(\`📦 Items restored: \${restoredCount}\`);
    console.log(\`\\n🚀 You can now run: npm run dev\`);
    
  } catch (error) {
    console.error(\`❌ Error restoring archive: \${error.message}\`);
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
`;
  
  const restoreScriptPath = path.join(process.cwd(), 'utils', 'commands', 'restore-archive.js');
  fs.writeFileSync(restoreScriptPath, restoreScript);
  
  // Make restore script executable
  try {
    execSync(`chmod +x ${restoreScriptPath}`);
  } catch (error) {
    // Ignore chmod errors on Windows
  }
  
  console.log(`📜 Restore script created: utils/commands/restore-archive.js`);
}

// Run if called directly
if (require.main === module) {
  archiveConfig();
}

// Export for CLI compatibility
module.exports = {
  description: 'Archive current project configuration for safe testing',
  run: archiveConfig
}; 