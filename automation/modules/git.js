const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Git Setup Module
 * Handles git repository initialization and initial commit
 */

class GitSetup {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Initialize git repository
   */
  initializeGit() {
    this.logger.log('\n📊 Initializing Git Repository...', 'blue');
    
    try {
      this.checkGitStatus();
      this.initializeRepository();
      this.addFiles();
      this.createInitialCommit();
      
      this.logger.log('   ✅ Git repository initialized successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error initializing git: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Check if git is already initialized
   */
  checkGitStatus() {
    if (fs.existsSync('.git')) {
      this.logger.log('     ℹ️  Git repository already exists', 'cyan');
      return false;
    }
    return true;
  }

  /**
   * Initialize git repository
   */
  initializeRepository() {
    this.logger.log('   🔄 Initializing git repository...', 'yellow');
    this.runCommand('git init', 'Initializing Git repository');
  }

  /**
   * Add all files to git
   */
  addFiles() {
    this.logger.log('   📁 Adding files to git...', 'yellow');
    this.runCommand('git add .', 'Adding all files to Git');
  }

  /**
   * Create initial commit
   */
  createInitialCommit() {
    this.logger.log('   💾 Creating initial commit...', 'yellow');
    this.runCommand('git commit -m "Initial setup with CM Kit workflow system"', 'Creating initial commit');
  }

  /**
   * Run a command with error handling
   */
  runCommand(command, description, options = {}) {
    this.logger.log(`     🔄 ${description}...`, 'yellow');
    try {
      const result = execSync(command, { 
        encoding: 'utf8', 
        stdio: options.silent ? 'pipe' : 'inherit',
        ...options 
      });
      this.logger.log(`     ✅ ${description} completed successfully`, 'green');
      return { success: true, output: result };
    } catch (error) {
      this.logger.log(`     ❌ ${description} failed: ${error.message}`, 'red');
      return { success: false, output: error.message };
    }
  }

  /**
   * Validate git setup
   */
  validateGit() {
    if (!fs.existsSync('.git')) {
      throw new Error('Git repository not initialized');
    }

    return true;
  }
}

module.exports = GitSetup; 