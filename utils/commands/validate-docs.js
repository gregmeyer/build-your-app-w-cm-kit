const fs = require('fs');
const path = require('path');

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function validateReadme() {
  console.log('\n📖 Validating README.md...');
  const issues = [];
  
  if (!checkFileExists('README.md')) {
    issues.push('README.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('README.md', 'utf-8');
  
  // Check for key sections
  const requiredSections = [
    'Automated Testing & CI/CD',
    'Development Tools',
    'Ready-to-Use Features'
  ];
  
  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      issues.push(`Missing section: ${section}`);
    }
  });
  
  // Check for testing infrastructure mention
  if (!content.includes('Jest') || !content.includes('Playwright')) {
    issues.push('Missing testing infrastructure documentation');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateGettingStarted() {
  console.log('\n🚀 Validating getting-started.md...');
  const issues = [];
  
  if (!checkFileExists('getting-started.md')) {
    issues.push('getting-started.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('getting-started.md', 'utf-8');
  
  // Check for key sections
  const requiredSections = [
    'Automated Testing & CI/CD',
    'Development Environment Setup',
    'Next Steps'
  ];
  
  requiredSections.forEach(section => {
    if (!content.includes(section)) {
      issues.push(`Missing section: ${section}`);
    }
  });
  
  // Check for test commands
  if (!content.includes('npm test') || !content.includes('npm run test:e2e')) {
    issues.push('Missing test command documentation');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateDocsReadme() {
  console.log('\n📚 Validating docs/README.md...');
  const issues = [];
  
  if (!checkFileExists('docs/README.md')) {
    issues.push('docs/README.md file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('docs/README.md', 'utf-8');
  
  // Check for testing mention
  if (!content.includes('testing') && !content.includes('Testing')) {
    issues.push('Missing testing infrastructure reference');
  }
  
  return { valid: issues.length === 0, issues };
}

function validateSetupAutomated() {
  console.log('\n🔧 Validating automation/setup-automated.js...');
  const issues = [];
  
  if (!checkFileExists('automation/setup-automated.js')) {
    issues.push('automation/setup-automated.js file is missing');
    return { valid: false, issues };
  }
  
  const content = fs.readFileSync('automation/setup-automated.js', 'utf-8');
  
  // Check for Jest version specification
  if (!content.includes('jest@29.7.0')) {
    issues.push('Missing Jest version specification (should be 29.7.0)');
  }
  
  // Check for package.json overrides
  if (!content.includes('updatePackageJsonOverrides')) {
    issues.push('Missing package.json overrides function');
  }
  
  // Check for .npmrc creation
  if (!content.includes('.npmrc') || !content.includes('loglevel=error')) {
    issues.push('Missing .npmrc creation with loglevel=error');
  }
  
  return { valid: issues.length === 0, issues };
}

function checkConsistency() {
  console.log('\n🔍 Checking documentation consistency...');
  const issues = [];
  
  // Check if package.json has the right scripts
  if (checkFileExists('package.json')) {
    const packageContent = fs.readFileSync('package.json', 'utf-8');
    const packageJson = JSON.parse(packageContent);
    
    const requiredScripts = [
      'test',
      'test:watch',
      'test:coverage',
      'test:e2e',
      'test:all'
    ];
    
    requiredScripts.forEach(script => {
      if (!packageJson.scripts || !packageJson.scripts[script]) {
        issues.push(`Missing npm script: ${script}`);
      }
    });
    
    // Check for overrides
    if (!packageJson.overrides) {
      issues.push('Missing package.json overrides for deprecation warnings');
    }
  }
  
  // Check if .npmrc exists
  if (!checkFileExists('.npmrc')) {
    issues.push('Missing .npmrc file for deprecation warning suppression');
  }
  
  // Check if Jest config exists
  if (!checkFileExists('jest.config.js')) {
    issues.push('Missing jest.config.js file');
  }
  
  // Check if Playwright config exists
  if (!checkFileExists('playwright.config.js')) {
    issues.push('Missing playwright.config.js file');
  }
  
  return { valid: issues.length === 0, issues };
}

module.exports = {
  description: 'Validate documentation consistency and completeness',
  run: async (options) => {
    console.log('📋 Documentation Validation Report');
    console.log('============================================================');
    
    const results = {
      readme: validateReadme(),
      gettingStarted: validateGettingStarted(),
      docsReadme: validateDocsReadme(),
      setupAutomated: validateSetupAutomated(),
      consistency: checkConsistency()
    };
    
    let totalIssues = 0;
    let allValid = true;
    
    Object.entries(results).forEach(([name, result]) => {
      if (!result.valid) {
        allValid = false;
        totalIssues += result.issues.length;
      }
    });
    
    console.log('\n📊 Validation Results:');
    console.log('============================================================');
    
    Object.entries(results).forEach(([name, result]) => {
      const status = result.valid ? '✅ PASS' : '❌ FAIL';
      const nameFormatted = name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      console.log(`${status} ${nameFormatted}`);
      
      if (!result.valid && result.issues.length > 0) {
        result.issues.forEach(issue => {
          console.log(`   ⚠️  ${issue}`);
        });
      }
    });
    
    console.log('\n============================================================');
    console.log(`📈 Summary: ${totalIssues} issues found`);
    
    if (allValid) {
      console.log('🎉 All documentation is consistent and up to date!');
    } else {
      console.log('🔧 Please fix the issues above to ensure documentation consistency.');
      console.log('\n💡 Tips:');
      console.log('   • Run this command after making changes to documentation');
      console.log('   • Check that all new features are documented');
      console.log('   • Ensure automation scripts match documented behavior');
    }
    
    console.log('============================================================');
  }
};
