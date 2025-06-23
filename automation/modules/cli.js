const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * CLI Setup Module
 * Handles CLI extraction and setup from documentation
 */

class CLISetup {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Setup CLI system
   */
  setupCLI() {
    this.logger.log('\n🔧 Setting up CLI System...', 'blue');
    
    try {
      this.extractCLI();
      this.makeCLIExecutable();
      this.testCLI();
      
      this.logger.log('   ✅ CLI system setup completed successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error setting up CLI: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Extract CLI code from documentation
   */
  extractCLI() {
    this.logger.log('   📋 Extracting CLI code...', 'yellow');
    
    const extractScript = path.join(__dirname, '..', 'extract-cli.js');
    if (fs.existsSync(extractScript)) {
      this.runCommand(`node ${extractScript}`, 'Extracting CLI code from documentation');
    } else {
      this.logger.log('     ⚠️  CLI extraction script not found, skipping...', 'yellow');
    }
  }

  /**
   * Make CLI executable
   */
  makeCLIExecutable() {
    this.logger.log('   🔐 Making CLI executable...', 'yellow');
    
    if (fs.existsSync('utils/cli.js')) {
      this.runCommand('chmod +x utils/cli.js', 'Making CLI executable');
    } else {
      this.logger.log('     ⚠️  CLI file not found, skipping...', 'yellow');
    }
  }

  /**
   * Test CLI functionality
   */
  testCLI() {
    this.logger.log('   🧪 Testing CLI...', 'yellow');
    
    if (fs.existsSync('utils/cli.js')) {
      this.runCommand('node utils/cli.js help', 'Testing CLI help command', { silent: true });
    } else {
      this.logger.log('     ⚠️  CLI file not found, skipping test...', 'yellow');
    }
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
   * Validate CLI setup
   */
  validateCLI() {
    const requiredFiles = [
      'utils/cli.js',
      'utils/commands/',
      'utils/lib/'
    ];

    const missing = [];
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        missing.push(file);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing CLI files: ${missing.join(', ')}`);
    }

    return true;
  }
}

module.exports = CLISetup; 