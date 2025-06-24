const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = {
  description: 'Archive project or specific components with timestamp',
  run: async (options) => {
    console.log('📦 Project Archiver');
    console.log('============================================================');
    
    const projectRoot = process.cwd();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveType = options.type || 'full';
    
    try {
      // Create archive directory
      const archiveDir = path.join(projectRoot, 'archive');
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir);
      }
      
      const archiveName = `archive-${archiveType}-${timestamp}`;
      const archivePath = path.join(archiveDir, archiveName);
      fs.mkdirSync(archivePath);
      
      console.log(`📁 Creating archive: ${archiveName}`);
      
      switch (archiveType) {
        case 'config':
          await archiveConfig(projectRoot, archivePath);
          break;
        case 'docs':
          await archiveDocs(projectRoot, archivePath);
          break;
        case 'cli':
          await archiveCLI(projectRoot, archivePath);
          break;
        case 'templates':
          await archiveTemplates(projectRoot, archivePath);
          break;
        case 'full':
        default:
          await archiveFull(projectRoot, archivePath);
          break;
      }
      
      console.log(`✅ Archive created successfully at: ${archivePath}`);
      
      // Create archive manifest
      const manifest = {
        timestamp: new Date().toISOString(),
        type: archiveType,
        path: archivePath,
        contents: await getArchiveContents(archivePath),
        gitInfo: await getGitInfo(projectRoot)
      };
      
      fs.writeFileSync(
        path.join(archivePath, 'manifest.json'), 
        JSON.stringify(manifest, null, 2)
      );
      
      console.log('📋 Archive manifest created');
      console.log('============================================================');
      
    } catch (error) {
      console.error('❌ Archive creation failed:', error.message);
    }
  }
};

async function archiveConfig(projectRoot, archivePath) {
  console.log('🔧 Archiving configuration files...');
  
  const configFiles = [
    'package.json',
    'package-lock.json',
    'next.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'jest.config.js',
    'jest.setup.js',
    'playwright.config.js',
    '.eslintrc.json',
    '.npmrc'
  ];
  
  const configDirs = [
    'src',
    'public',
    'components'
  ];
  
  // Copy config files
  for (const file of configFiles) {
    const sourcePath = path.join(projectRoot, file);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, path.join(archivePath, file));
    }
  }
  
  // Copy config directories
  for (const dir of configDirs) {
    const sourcePath = path.join(projectRoot, dir);
    if (fs.existsSync(sourcePath)) {
      copyDirectory(sourcePath, path.join(archivePath, dir));
    }
  }
}

async function archiveDocs(projectRoot, archivePath) {
  console.log('📚 Archiving documentation...');
  
  const docDirs = [
    'docs',
    'README.md',
    'getting-started.md',
    'workflow-overview.md',
    'PR-MESSAGE.md'
  ];
  
  for (const item of docDirs) {
    const sourcePath = path.join(projectRoot, item);
    if (fs.existsSync(sourcePath)) {
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirectory(sourcePath, path.join(archivePath, item));
      } else {
        fs.copyFileSync(sourcePath, path.join(archivePath, item));
      }
    }
  }
}

async function archiveCLI(projectRoot, archivePath) {
  console.log('🖥️ Archiving CLI system...');
  
  const cliDirs = [
    'utils',
    'automation'
  ];
  
  for (const dir of cliDirs) {
    const sourcePath = path.join(projectRoot, dir);
    if (fs.existsSync(sourcePath)) {
      copyDirectory(sourcePath, path.join(archivePath, dir));
    }
  }
}

async function archiveTemplates(projectRoot, archivePath) {
  console.log('📋 Archiving templates...');
  
  const templateDirs = [
    'automation/templates',
    'examples'
  ];
  
  for (const dir of templateDirs) {
    const sourcePath = path.join(projectRoot, dir);
    if (fs.existsSync(sourcePath)) {
      copyDirectory(sourcePath, path.join(archivePath, dir));
    }
  }
}

async function archiveFull(projectRoot, archivePath) {
  console.log('📦 Archiving full project...');
  
  const excludeDirs = [
    'node_modules',
    '.git',
    'archive',
    '.next',
    'out',
    'dist',
    'build',
    'coverage',
    'playwright-report',
    'test-results'
  ];
  
  const excludeFiles = [
    '.DS_Store'
  ];
  
  const excludePatterns = [
    /\.log$/,
    /\.tmp$/,
    /\.cache$/
  ];
  
  // Copy all files and directories except excluded ones
  const items = fs.readdirSync(projectRoot);
  
  for (const item of items) {
    const sourcePath = path.join(projectRoot, item);
    const targetPath = path.join(archivePath, item);
    
    // Skip excluded directories
    if (excludeDirs.includes(item)) {
      continue;
    }
    
    // Skip excluded files
    if (excludeFiles.includes(item)) {
      continue;
    }
    
    // Skip files matching exclude patterns
    if (excludePatterns.some(pattern => pattern.test(item))) {
      continue;
    }
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyDirectory(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  const items = fs.readdirSync(source);
  
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

async function getArchiveContents(archivePath) {
  const contents = [];
  
  function scanDirectory(dir, prefix = '') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(prefix, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        contents.push(`${relativePath}/`);
        scanDirectory(fullPath, relativePath);
      } else {
        contents.push(relativePath);
      }
    }
  }
  
  scanDirectory(archivePath);
  return contents;
}

async function getGitInfo(projectRoot) {
  try {
    const commitHash = execSync('git rev-parse HEAD', { 
      cwd: projectRoot, 
      encoding: 'utf8' 
    }).trim();
    
    const branch = execSync('git branch --show-current', { 
      cwd: projectRoot, 
      encoding: 'utf8' 
    }).trim();
    
    const lastCommit = execSync('git log -1 --format="%h - %s (%cr)"', { 
      cwd: projectRoot, 
      encoding: 'utf8' 
    }).trim();
    
    return {
      commitHash,
      branch,
      lastCommit,
      hasUncommittedChanges: hasUncommittedChanges(projectRoot)
    };
  } catch (error) {
    return { error: 'Git not available' };
  }
}

function hasUncommittedChanges(projectRoot) {
  try {
    const status = execSync('git status --porcelain', { 
      cwd: projectRoot, 
      encoding: 'utf8' 
    });
    return status.trim().length > 0;
  } catch {
    return false;
  }
}