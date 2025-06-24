#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Remove demo documentation and sample content',
  
  async run(options) {
    console.log('🧹 Removing demo documentation and sample content...\n');
    
    const projectRoot = process.cwd();
    const backupDir = path.join(projectRoot, 'archive', 'demo-backup');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `demo-backup-${timestamp}`);
    
    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Items to remove/backup
    const itemsToRemove = [
      {
        path: 'src/app/docs',
        description: 'Documentation pages',
        type: 'directory'
      },
      {
        path: 'src/app/admin/demo',
        description: 'Admin demo page',
        type: 'directory'
      },
      {
        path: 'src/app/admin/blank',
        description: 'Blank page example',
        type: 'directory'
      },
      {
        path: 'src/components/ui',
        description: 'UI components',
        type: 'directory'
      },
      {
        path: 'src/components/Footer.tsx',
        description: 'Footer component',
        type: 'file'
      },
      {
        path: 'src/components/Lightbox.tsx',
        description: 'Lightbox component',
        type: 'file'
      },
      {
        path: 'src/app/privacy',
        description: 'Privacy policy page',
        type: 'directory'
      },
      {
        path: 'src/app/security',
        description: 'Security page',
        type: 'directory'
      },
      {
        path: 'src/app/terms',
        description: 'Terms of service page',
        type: 'directory'
      },
      {
        path: 'src/app/error.tsx',
        description: 'Error page',
        type: 'file'
      },
      {
        path: 'src/app/global-error.tsx',
        description: 'Global error page',
        type: 'file'
      },
      {
        path: 'src/app/not-found.tsx',
        description: 'Not found page',
        type: 'file'
      }
    ];
    
    // Create backup
    console.log('📦 Creating backup...');
    fs.mkdirSync(backupPath, { recursive: true });
    
    let backedUpItems = [];
    let removedItems = [];
    
    for (const item of itemsToRemove) {
      const itemPath = path.join(projectRoot, item.path);
      const backupItemPath = path.join(backupPath, item.path);
      
      if (fs.existsSync(itemPath)) {
        try {
          // Create backup
          if (item.type === 'directory') {
            if (!fs.existsSync(path.dirname(backupItemPath))) {
              fs.mkdirSync(path.dirname(backupItemPath), { recursive: true });
            }
            fs.cpSync(itemPath, backupItemPath, { recursive: true });
          } else {
            if (!fs.existsSync(path.dirname(backupItemPath))) {
              fs.mkdirSync(path.dirname(backupItemPath), { recursive: true });
            }
            fs.copyFileSync(itemPath, backupItemPath);
          }
          
          // Remove original
          if (item.type === 'directory') {
            fs.rmSync(itemPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(itemPath);
          }
          
          backedUpItems.push(item.description);
          removedItems.push(item.description);
          console.log(`  ✅ ${item.description} - backed up and removed`);
        } catch (error) {
          console.log(`  ⚠️  ${item.description} - error: ${error.message}`);
        }
      } else {
        console.log(`  ℹ️  ${item.description} - not found, skipping`);
      }
    }
    
    // Create backup manifest
    const manifest = {
      timestamp: new Date().toISOString(),
      backupPath: backupPath,
      removedItems: removedItems,
      instructions: {
        restore: 'Run: node utils/cli.js restore-demo',
        manual: `Manual restore: Copy contents from ${backupPath} back to project root`
      }
    };
    
    fs.writeFileSync(
      path.join(backupPath, 'backup-manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`\n📦 Backup created at: ${backupPath}`);
    console.log(`📋 Backup manifest: ${path.join(backupPath, 'backup-manifest.json')}`);
    
    console.log('\n✅ Demo removal completed successfully!');
    console.log('\n📝 Summary:');
    console.log(`  • ${backedUpItems.length} items backed up and removed`);
    console.log(`  • Backup location: ${backupPath}`);
    console.log('\n🔄 To restore demo content:');
    console.log('  node utils/cli.js restore-demo');
    
    if (backedUpItems.length > 0) {
      console.log('\n📋 Removed items:');
      backedUpItems.forEach(item => {
        console.log(`  • ${item}`);
      });
    }
  }
};
