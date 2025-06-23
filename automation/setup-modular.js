#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import all modules
const StructureGenerator = require('./modules/structure');
const DependenciesManager = require('./modules/dependencies');
const CLISetup = require('./modules/cli');
const ConfigGenerator = require('./modules/configs');
const ComponentsGenerator = require('./modules/components');
const PagesGenerator = require('./modules/pages');
const TestingModule = require('./modules/testing');
const GitSetup = require('./modules/git');
const CompletionModule = require('./modules/completion');

/**
 * Modular Setup Script for CM Kit Workflow System
 * This script uses individual modules to set up the project
 */

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Simple logger class
class Logger {
  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }
}

/**
 * Check prerequisites
 */
function checkPrerequisites() {
  const logger = new Logger();
  logger.log('\n🔍 Checking Prerequisites...', 'blue');
  
  const { execSync } = require('child_process');
  
  const checks = [
    { name: 'Node.js', command: 'node --version', minVersion: 'v18.0.0' },
    { name: 'npm', command: 'npm --version', minVersion: 'v8.0.0' },
    { name: 'Git', command: 'git --version', minVersion: 'v2.0.0' }
  ];
  
  let allPassed = true;
  
  checks.forEach(check => {
    try {
      const result = execSync(check.command, { encoding: 'utf8', stdio: 'pipe' });
      const version = result.trim();
      logger.log(`   ✅ ${check.name}: ${version}`, 'green');
    } catch (error) {
      logger.log(`   ❌ ${check.name}: Not found or version too low`, 'red');
      allPassed = false;
    }
  });
  
  return allPassed;
}

/**
 * Main setup function
 */
async function main() {
  const logger = new Logger();
  
  logger.log('🚀 CM Kit Workflow System - Modular Setup', 'bright');
  logger.log('='.repeat(60), 'blue');
  
  // Check prerequisites
  if (!checkPrerequisites()) {
    logger.log('\n❌ Prerequisites check failed. Please install the required software and try again.', 'red');
    process.exit(1);
  }
  
  try {
    // Initialize all modules
    const structure = new StructureGenerator(logger);
    const dependencies = new DependenciesManager(logger);
    const cli = new CLISetup(logger);
    const configs = new ConfigGenerator(logger);
    const components = new ComponentsGenerator(logger);
    const pages = new PagesGenerator(logger);
    const testing = new TestingModule(logger);
    const git = new GitSetup(logger);
    const completion = new CompletionModule(logger);
    
    // Execute setup steps in order
    logger.log('\n🔄 Starting modular setup process...', 'blue');
    
    // 1. Create project structure
    structure.createProjectStructure();
    structure.createGitignore();
    structure.createCursorConfig();
    
    // 2. Install dependencies
    dependencies.installDependencies();
    dependencies.addScripts();
    
    // 3. Setup CLI
    cli.setupCLI();
    
    // 4. Create configuration files
    configs.createConfigurationFiles();
    
    // 5. Create UI components
    components.createComponents();
    
    // 6. Create pages
    pages.createPages();
    
    // 7. Test setup
    testing.testSetup();
    
    // 8. Initialize git
    git.initializeGit();
    
    // 9. Generate completion summary
    completion.generateCompletion();
    
    logger.log('\n✅ Modular setup completed successfully!', 'green');
    
  } catch (error) {
    logger.log(`\n❌ Setup failed: ${error.message}`, 'red');
    logger.log('Please check the error messages above and try again.', 'yellow');
    process.exit(1);
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { main }; 