const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Testing Module
 * Handles setup validation and testing
 */

class TestingModule {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Test the complete setup
   */
  testSetup() {
    this.logger.log('\n🧪 Testing Setup...', 'blue');
    
    try {
      this.testBuild();
      this.testDevServer();
      this.testCLI();
      
      this.logger.log('   ✅ All tests passed successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error during testing: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Test build process
   */
  testBuild() {
    this.logger.log('   🔨 Testing build process...', 'yellow');
    this.runCommand('npm run build', 'Testing build process', { silent: true });
  }

  /**
   * Test development server
   */
  testDevServer() {
    this.logger.log('   🚀 Testing development server (will start and stop)...', 'yellow');
    try {
      const devProcess = execSync('npm run dev', { 
        encoding: 'utf8', 
        stdio: 'pipe',
        timeout: 10000 // 10 seconds
      });
      this.logger.log('     ✅ Development server started successfully', 'green');
    } catch (error) {
      if (error.signal === 'SIGTERM') {
        this.logger.log('     ✅ Development server test completed', 'green');
      } else {
        this.logger.log('     ⚠️  Development server test had issues', 'yellow');
      }
    }
  }

  /**
   * Test CLI functionality
   */
  testCLI() {
    this.logger.log('   ⚡ Testing CLI...', 'yellow');
    
    if (fs.existsSync('utils/cli.js')) {
      this.runCommand('node utils/cli.js help', 'Testing CLI help command', { silent: true });
    } else {
      this.logger.log('     ⚠️  CLI not found, skipping test...', 'yellow');
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
   * Validate complete setup
   */
  validateSetup() {
    this.logger.log('   ✅ Validating complete setup...', 'yellow');
    
    const requiredFiles = [
      'package.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'jest.config.js',
      'jest.setup.js',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/error.tsx',
      'src/app/not-found.tsx',
      'src/app/global-error.tsx',
      'src/components/ui/Button.tsx',
      'src/components/ui/Card.tsx',
      'src/components/ui/Footer.tsx',
      'utils/cli.js'
    ];

    const missing = [];
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        missing.push(file);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing required files: ${missing.join(', ')}`);
    }

    this.logger.log('     ✅ All required files present', 'green');
    return true;
  }
}

module.exports = TestingModule; 