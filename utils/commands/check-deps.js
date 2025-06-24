const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function checkPackageJson() {
  console.log('\n📦 Checking package.json...');
  
  if (!fs.existsSync('package.json')) {
    console.log('❌ package.json not found');
    return { valid: false, issues: ['Missing package.json'] };
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    console.log('✅ package.json found and valid');
    
    return { 
      valid: true, 
      data: {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: Object.keys(packageJson.dependencies || {}).length,
        devDependencies: Object.keys(packageJson.devDependencies || {}).length
      }
    };
  } catch (error) {
    console.log('❌ Invalid package.json format');
    return { valid: false, issues: ['Invalid package.json format'] };
  }
}

function checkNodeModules() {
  console.log('\n📁 Checking node_modules...');
  
  if (!fs.existsSync('node_modules')) {
    console.log('❌ node_modules not found');
    return { valid: false, issues: ['Missing node_modules directory'] };
  }
  
  try {
    const stats = fs.statSync('node_modules');
    if (!stats.isDirectory()) {
      console.log('❌ node_modules is not a directory');
      return { valid: false, issues: ['node_modules is not a directory'] };
    }
    
    console.log('✅ node_modules directory exists');
    return { valid: true };
  } catch (error) {
    console.log('❌ Error checking node_modules');
    return { valid: false, issues: ['Error accessing node_modules'] };
  }
}

function checkPackageLock() {
  console.log('\n🔒 Checking package-lock.json...');
  
  if (!fs.existsSync('package-lock.json')) {
    console.log('⚠️  package-lock.json not found (this is normal for new projects)');
    return { valid: true, warning: 'No package-lock.json found' };
  }
  
  console.log('✅ package-lock.json found');
  return { valid: true };
}

function checkOutdatedDeps() {
  console.log('\n🔄 Checking for outdated dependencies...');
  
  try {
    const result = execSync('npm outdated --json', { encoding: 'utf8', stdio: 'pipe' });
    const outdated = JSON.parse(result);
    
    if (Object.keys(outdated).length === 0) {
      console.log('✅ All dependencies are up to date');
      return { valid: true, outdated: [] };
    } else {
      console.log(`⚠️  Found ${Object.keys(outdated).length} outdated dependencies`);
      return { valid: true, outdated: Object.keys(outdated) };
    }
  } catch (error) {
    if (error.status === 1) {
      // npm outdated returns 1 when there are outdated packages
      try {
        const result = execSync('npm outdated --json', { encoding: 'utf8', stdio: 'pipe' });
        const outdated = JSON.parse(result);
        console.log(`⚠️  Found ${Object.keys(outdated).length} outdated dependencies`);
        return { valid: true, outdated: Object.keys(outdated) };
      } catch (parseError) {
        console.log('⚠️  Some dependencies may be outdated');
        return { valid: true, outdated: ['Unable to parse outdated list'] };
      }
    } else {
      console.log('⚠️  Unable to check for outdated dependencies');
      return { valid: true, warning: 'Could not check outdated dependencies' };
    }
  }
}

function checkSecurityAudit() {
  console.log('\n🔒 Running security audit...');
  
  try {
    const result = execSync('npm audit --json', { encoding: 'utf8', stdio: 'pipe' });
    const audit = JSON.parse(result);
    
    if (audit.vulnerabilities === 0) {
      console.log('✅ No security vulnerabilities found');
      return { valid: true, vulnerabilities: 0 };
    } else {
      console.log(`⚠️  Found ${audit.vulnerabilities} security vulnerabilities`);
      return { valid: false, vulnerabilities: audit.vulnerabilities };
    }
  } catch (error) {
    if (error.status === 1) {
      // npm audit returns 1 when vulnerabilities are found
      try {
        const result = execSync('npm audit --json', { encoding: 'utf8', stdio: 'pipe' });
        const audit = JSON.parse(result);
        console.log(`⚠️  Found ${audit.vulnerabilities} security vulnerabilities`);
        return { valid: false, vulnerabilities: audit.vulnerabilities };
      } catch (parseError) {
        console.log('⚠️  Security vulnerabilities may exist');
        return { valid: false, vulnerabilities: 'Unknown' };
      }
    } else {
      console.log('⚠️  Unable to run security audit');
      return { valid: true, warning: 'Could not run security audit' };
    }
  }
}

function generateRecommendations(packageValid, nodeModulesValid, packageLockValid, outdatedDeps, securityAudit) {
  console.log('\n============================================================');
  console.log('📦 DEPENDENCY CHECK REPORT');
  console.log('============================================================');
  
  console.log('\n📊 DEPENDENCY STATUS:');
  if (packageValid.valid && nodeModulesValid.valid) {
    console.log('   ✅ Dependencies are properly installed');
  } else {
    console.log('   ❌ Dependency issues detected');
  }
  
  if (packageValid.data) {
    console.log('\n📋 PACKAGE INFO:');
    console.log(`   📦 Package: ${packageValid.data.name} v${packageValid.data.version}`);
    console.log(`   🔗 Dependencies: ${packageValid.data.dependencies}`);
    console.log(`   🛠️  Dev Dependencies: ${packageValid.data.devDependencies}`);
  }
  
  console.log('\n🔍 DETAILED CHECKS:');
  console.log(`   ${packageValid.valid ? '✅' : '❌'} Package.json: ${packageValid.valid ? 'Valid' : 'Issues found'}`);
  console.log(`   ${nodeModulesValid.valid ? '✅' : '❌'} Node modules: ${nodeModulesValid.valid ? 'Installed' : 'Missing'}`);
  console.log(`   ${packageLockValid.valid ? '✅' : '⚠️'} Package lock: ${packageLockValid.warning ? 'Not found' : 'Present'}`);
  
  if (outdatedDeps.outdated && outdatedDeps.outdated.length > 0) {
    console.log(`   ⚠️  Outdated: ${outdatedDeps.outdated.length} packages need updates`);
  } else {
    console.log('   ✅ Dependencies: All up to date');
  }
  
  if (securityAudit.vulnerabilities > 0) {
    console.log(`   🔒 Security: ${securityAudit.vulnerabilities} vulnerabilities found`);
  } else {
    console.log('   ✅ Security: No vulnerabilities detected');
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  if (!packageValid.valid || !nodeModulesValid.valid) {
    console.log('   🔧 Run npm install to fix dependency issues');
  }
  if (outdatedDeps.outdated && outdatedDeps.outdated.length > 0) {
    console.log('   🔄 Run npm update to update outdated dependencies');
  }
  if (securityAudit.vulnerabilities > 0) {
    console.log('   🔒 Run npm audit fix to address security vulnerabilities');
  }
  if (!packageLockValid.warning) {
    console.log('   💾 Consider committing package-lock.json to version control');
  }
  
  console.log('\n============================================================');
}

module.exports = {
  description: 'Check and validate project dependencies',
  run: async (options) => {
    console.log('📦 Dependency Check');
    console.log('============================================================');
    
    const packageValid = checkPackageJson();
    const nodeModulesValid = checkNodeModules();
    const packageLockValid = checkPackageLock();
    const outdatedDeps = checkOutdatedDeps();
    const securityAudit = checkSecurityAudit();
    
    generateRecommendations(
      packageValid,
      nodeModulesValid,
      packageLockValid,
      outdatedDeps,
      securityAudit
    );
    
    console.log('\n🎉 Dependency check completed successfully');
  }
}; 