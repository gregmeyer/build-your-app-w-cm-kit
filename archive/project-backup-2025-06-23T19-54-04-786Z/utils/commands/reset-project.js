const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

function promptConfirmation(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'yes');
    });
  });
}

function archiveAndRemove(targets, archiveDir) {
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }
  targets.forEach((item) => {
    if (fs.existsSync(item)) {
      const dest = path.join(archiveDir, path.basename(item));
      fs.renameSync(item, dest);
    }
  });
}

function removeIfExists(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

module.exports = {
  description: 'Reset the project: archive generated files, delete them, and restore to pre-setup state',
  run: async () => {
    console.log('⚠️  This will archive and delete all generated project files and restore the repo to its pre-setup state.');
    console.log('Type YES to confirm, or anything else to cancel.');
    const confirmed = await promptConfirmation('Are you sure you want to reset the project? Type YES to continue: ');
    if (!confirmed) {
      console.log('❌ Reset cancelled.');
      return;
    }
    // Archive generated directories
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveDir = path.join(process.cwd(), 'archive', `project-backup-${timestamp}`);
    const generatedDirs = [
      'tickets',
      'stories',
      'issues',
      'logs',
      'src',
      'utils',
      'node_modules',
      '.vscode',
      '.next',
      'public',
      'package-lock.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      '.eslintrc.json',
      'jest.config.js',
      'jest.setup.js',
      '.gitignore',
    ];
    archiveAndRemove(generatedDirs, archiveDir);
    // Remove any leftover generated files
    generatedDirs.forEach(removeIfExists);
    // Optionally, restore README.md and docs if needed (not removed)
    console.log(`✅ Project files archived to: ${archiveDir}`);
    console.log('✅ Project reset to pre-setup state.');
    console.log('You may now re-run the automated setup if you wish.');
  }
}; 