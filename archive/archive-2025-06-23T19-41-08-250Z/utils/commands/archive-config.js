const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getGitInfo() {
  try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    const gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    const gitCommit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    return {
      hasChanges: gitStatus.length > 0,
      branch: gitBranch,
      commit: gitCommit,
      status: gitStatus
    };
  } catch (error) {
    return {
      hasChanges: false,
      branch: 'unknown',
      commit: 'unknown',
      status: ''
    };
  }
}

function createArchiveMetadata(archiveDir, gitInfo) {
  const metadata = {
    timestamp: new Date().toISOString(),
    archiveType: 'config-backup',
    description: 'CM Kit project configuration and essential files backup',
    gitInfo: gitInfo,
    includedFiles: [
      'package.json',
      'package-lock.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      '.eslintrc.json',
      'jest.config.js',
      'jest.setup.js',
      '.gitignore',
      'README.md',
      'getting-started.md',
      'workflow-overview.md',
      'src/',
      'utils/',
      'docs/',
      'examples/',
      'implementation/',
      'automation/',
      'tickets/',
      'stories/',
      'issues/',
      'logs/'
    ],
    excludedFiles: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'dist/',
      'coverage/',
      'archive/',
      '.DS_Store',
      '*.log'
    ]
  };
  
  fs.writeFileSync(
    path.join(archiveDir, 'archive-metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
}

module.exports = {
  description: 'Archive current project configuration and essential files to archive directory',
  run: async (options = {}) => {
    console.log('📦 Creating project configuration archive...\n');
    
    // Get git information
    const gitInfo = getGitInfo();
    console.log(`🔍 Git Status: ${gitInfo.branch} (${gitInfo.commit})`);
    if (gitInfo.hasChanges) {
      console.log('⚠️  Warning: You have uncommitted changes');
    }
    
    // Create timestamp for archive name
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveName = `archive-${timestamp}`;
    const archiveDir = path.join(process.cwd(), 'archive', archiveName);
    
    // Create archive directory
    if (!fs.existsSync(path.dirname(archiveDir))) {
      fs.mkdirSync(path.dirname(archiveDir), { recursive: true });
    }
    
    // Define files and directories to archive
    const itemsToArchive = [
      'package.json',
      'package-lock.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      '.eslintrc.json',
      'jest.config.js',
      'jest.setup.js',
      '.gitignore',
      'README.md',
      'getting-started.md',
      'workflow-overview.md',
      'src',
      'utils',
      'docs',
      'examples',
      'implementation',
      'automation',
      'tickets',
      'stories',
      'issues',
      'logs'
    ];
    
    // Copy files and directories
    let copiedCount = 0;
    let skippedCount = 0;
    
    for (const item of itemsToArchive) {
      const srcPath = path.join(process.cwd(), item);
      const destPath = path.join(archiveDir, item);
      
      if (fs.existsSync(srcPath)) {
        try {
          if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
            console.log(`✅ Copied directory: ${item}`);
          } else {
            fs.copyFileSync(srcPath, destPath);
            console.log(`✅ Copied file: ${item}`);
          }
          copiedCount++;
        } catch (error) {
          console.log(`❌ Failed to copy ${item}: ${error.message}`);
          skippedCount++;
        }
      } else {
        console.log(`⚠️  Skipped (not found): ${item}`);
        skippedCount++;
      }
    }
    
    // Create archive metadata
    createArchiveMetadata(archiveDir, gitInfo);
    
    // Create a simple README for the archive
    const archiveReadme = `# CM Kit Configuration Archive

This archive contains a backup of the CM Kit project configuration and essential files.

## Archive Details
- **Created**: ${new Date().toISOString()}
- **Type**: Configuration Backup
- **Git Branch**: ${gitInfo.branch}
- **Git Commit**: ${gitInfo.commit}

## What's Included
- Project configuration files (package.json, next.config.js, etc.)
- Source code (src/)
- CLI utilities (utils/)
- Documentation (docs/)
- Examples and templates
- Project management files (tickets, stories, issues)

## What's Excluded
- node_modules/ (can be rebuilt with npm install)
- Build artifacts (.next/, out/, build/)
- Coverage reports
- Log files
- Other archives

## To Restore
1. Copy the contents to a new directory
2. Run \`npm install\` to install dependencies
3. Run \`npm run dev\` to start development server

## Metadata
See \`archive-metadata.json\` for detailed information about this archive.
`;
    
    fs.writeFileSync(path.join(archiveDir, 'README.md'), archiveReadme);
    
    // Calculate archive size
    const archiveSize = execSync(`du -sh "${archiveDir}"`, { encoding: 'utf8' }).trim().split('\t')[0];
    
    console.log('\n📊 Archive Summary:');
    console.log(`📁 Archive Location: ${archiveDir}`);
    console.log(`📦 Archive Size: ${archiveSize}`);
    console.log(`✅ Files Copied: ${copiedCount}`);
    console.log(`⚠️  Files Skipped: ${skippedCount}`);
    console.log(`🔗 Git Branch: ${gitInfo.branch} (${gitInfo.commit})`);
    
    if (gitInfo.hasChanges) {
      console.log('\n💡 Tip: Consider committing your changes before creating archives for cleaner backups.');
    }
    
    console.log('\n🎉 Configuration archive created successfully!');
    console.log('💾 The archive contains all essential project files and can be used to restore the project.');
    console.log('📖 See the README.md file in the archive for restoration instructions.');
  }
}; 