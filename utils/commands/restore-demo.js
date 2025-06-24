#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Restore demo documentation and sample content from backup',
  
  async run(options) {
    console.log('🔄 Restoring demo documentation and sample content...\n');
    
    const projectRoot = process.cwd();
    const backupDir = path.join(projectRoot, 'archive', 'demo-backup');
    
    if (!fs.existsSync(backupDir)) {
      console.log('❌ No demo backup directory found.');
      console.log('   Run remove-demo first to create a backup.');
      return;
    }
    
    // Find the most recent backup
    const backupFolders = fs.readdirSync(backupDir)
      .filter(item => {
        const itemPath = path.join(backupDir, item);
        return fs.statSync(itemPath).isDirectory() && item.startsWith('demo-backup-');
      })
      .sort()
      .reverse();
    
    if (backupFolders.length === 0) {
      console.log('❌ No demo backup found.');
      console.log('   Run remove-demo first to create a backup.');
      return;
    }
    
    const latestBackup = backupFolders[0];
    const backupPath = path.join(backupDir, latestBackup);
    const manifestPath = path.join(backupPath, 'backup-manifest.json');
    
    console.log(`📦 Found backup: ${latestBackup}`);
    
    // Read backup manifest
    let manifest = null;
    if (fs.existsSync(manifestPath)) {
      try {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        console.log(`📋 Backup created: ${manifest.timestamp}`);
        console.log(`📋 Items to restore: ${manifest.removedItems.length}`);
      } catch (error) {
        console.log(`⚠️  Could not read backup manifest: ${error.message}`);
      }
    }
    
    // Restore items
    console.log('\n🔄 Restoring items...');
    let restoredItems = [];
    let failedItems = [];
    
    if (fs.existsSync(backupPath)) {
      const items = fs.readdirSync(backupPath, { withFileTypes: true });
      
      for (const item of items) {
        if (item.name === 'backup-manifest.json') continue;
        
        const sourcePath = path.join(backupPath, item.name);
        const targetPath = path.join(projectRoot, item.name);
        
        try {
          if (item.isDirectory()) {
            // Restore directory
            if (fs.existsSync(targetPath)) {
              fs.rmSync(targetPath, { recursive: true, force: true });
            }
            fs.cpSync(sourcePath, targetPath, { recursive: true });
          } else {
            // Restore file
            if (fs.existsSync(targetPath)) {
              fs.unlinkSync(targetPath);
            }
            fs.copyFileSync(sourcePath, targetPath);
          }
          
          restoredItems.push(item.name);
          console.log(`  ✅ ${item.name} - restored`);
        } catch (error) {
          failedItems.push(item.name);
          console.log(`  ❌ ${item.name} - failed: ${error.message}`);
        }
      }
    }
    
    // Restore nested items (like src/app/docs, etc.)
    const nestedItems = [
      'src/app/docs',
      'src/app/admin/demo',
      'src/app/admin/blank',
      'src/components/ui',
      'src/components/Footer.tsx',
      'src/components/Lightbox.tsx',
      'src/app/privacy',
      'src/app/security',
      'src/app/terms',
      'src/app/error.tsx',
      'src/app/global-error.tsx',
      'src/app/not-found.tsx'
    ];
    
    for (const itemPath of nestedItems) {
      const sourcePath = path.join(backupPath, itemPath);
      const targetPath = path.join(projectRoot, itemPath);
      
      if (fs.existsSync(sourcePath)) {
        try {
          const stats = fs.statSync(sourcePath);
          
          if (stats.isDirectory()) {
            // Restore directory
            if (fs.existsSync(targetPath)) {
              fs.rmSync(targetPath, { recursive: true, force: true });
            }
            fs.cpSync(sourcePath, targetPath, { recursive: true });
          } else {
            // Restore file
            if (fs.existsSync(targetPath)) {
              fs.unlinkSync(targetPath);
            }
            fs.copyFileSync(sourcePath, targetPath);
          }
          
          if (!restoredItems.includes(itemPath)) {
            restoredItems.push(itemPath);
          }
          console.log(`  ✅ ${itemPath} - restored`);
        } catch (error) {
          if (!failedItems.includes(itemPath)) {
            failedItems.push(itemPath);
          }
          console.log(`  ❌ ${itemPath} - failed: ${error.message}`);
        }
      }
    }
    
    console.log('\n✅ Demo restoration completed!');
    console.log('\n📝 Summary:');
    console.log(`  • ${restoredItems.length} items restored`);
    if (failedItems.length > 0) {
      console.log(`  • ${failedItems.length} items failed to restore`);
    }
    console.log(`  • Backup location: ${backupPath}`);
    
    if (restoredItems.length > 0) {
      console.log('\n📋 Restored items:');
      restoredItems.forEach(item => {
        console.log(`  • ${item}`);
      });
    }
    
    if (failedItems.length > 0) {
      console.log('\n❌ Failed items:');
      failedItems.forEach(item => {
        console.log(`  • ${item}`);
      });
      console.log('\n💡 You may need to manually restore these items from the backup.');
    }
    
    console.log('\n🌐 Your demo pages should now be accessible:');
    console.log('  • Homepage: /');
    console.log('  • Admin Demo: /admin/demo');
    console.log('  • Documentation: /docs');
    console.log('  • Legal Pages: /privacy, /security, /terms');
  }
};
