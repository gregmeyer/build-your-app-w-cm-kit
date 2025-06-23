const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Dependencies Manager Module
 * Handles package.json creation and dependency installation
 */

class DependenciesManager {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Install all dependencies
   */
  installDependencies() {
    this.logger.log('\n📦 Installing Dependencies...', 'blue');
    
    try {
      this.createPackageJson();
      this.installCoreDependencies();
      this.installDevDependencies();
      
      this.logger.log('   ✅ All dependencies installed successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error installing dependencies: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create package.json if it doesn't exist
   */
  createPackageJson() {
    this.logger.log('   📝 Checking package.json...', 'yellow');
    
    if (!fs.existsSync('package.json')) {
      this.logger.log('   📝 Creating package.json...', 'yellow');
      this.runCommand('npm init -y', 'Initializing package.json');
    } else {
      this.logger.log('     ℹ️  package.json already exists', 'cyan');
    }
  }

  /**
   * Install core dependencies
   */
  installCoreDependencies() {
    this.logger.log('   📦 Installing core dependencies...', 'yellow');
    
    const coreDeps = [
      'next@latest',
      'react@latest', 
      'react-dom@latest'
    ];
    
    this.runCommand(`npm install ${coreDeps.join(' ')}`, 'Installing core dependencies');
  }

  /**
   * Install development dependencies
   */
  installDevDependencies() {
    this.logger.log('   📦 Installing development dependencies...', 'yellow');
    
    const devDeps = [
      'typescript',
      '@types/react',
      '@types/node',
      'tailwindcss@^3.4.17',
      'postcss',
      'autoprefixer',
      'eslint',
      'eslint-config-next',
      'jest',
      '@testing-library/react',
      '@testing-library/jest-dom',
      'prettier'
    ];
    
    this.runCommand(`npm install --save-dev ${devDeps.join(' ')}`, 'Installing development dependencies');
  }

  /**
   * Add scripts to package.json
   */
  addScripts() {
    this.logger.log('   📝 Adding scripts to package.json...', 'yellow');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      packageJson.scripts = {
        ...packageJson.scripts,
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint",
        "test": "jest",
        "test:watch": "jest --watch",
        "format": "prettier --write .",
        "type-check": "tsc --noEmit"
      };
      
      fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
      this.logger.log('     ✅ Scripts added to package.json', 'green');
      
    } catch (error) {
      this.logger.log(`     ❌ Error adding scripts: ${error.message}`, 'red');
      throw error;
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
   * Validate dependencies are installed
   */
  validateDependencies() {
    const requiredFiles = [
      'package.json',
      'package-lock.json',
      'node_modules'
    ];

    const missing = [];
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        missing.push(file);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing dependency files: ${missing.join(', ')}`);
    }

    return true;
  }
}

module.exports = DependenciesManager; 