const fs = require('fs');
const path = require('path');
const TemplateLoader = require('../core/template-loader');

/**
 * Configuration Generator Module
 * Creates all configuration files for the project
 */

class ConfigGenerator {
  constructor(logger) {
    this.logger = logger;
    this.templateLoader = new TemplateLoader();
  }

  /**
   * Create all configuration files
   */
  createConfigurationFiles() {
    this.logger.log('\n⚙️  Creating Configuration Files...', 'blue');
    
    try {
      this.createNextConfig();
      this.createTypeScriptConfig();
      this.createTailwindConfig();
      this.createPostCSSConfig();
      this.createJestConfig();
      this.createJestSetup();
      
      this.logger.log('   ✅ All configuration files created successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating configuration files: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create Next.js configuration
   */
  createNextConfig() {
    try {
      this.templateLoader.writeTemplate('configs/next-config.js', 'next.config.js');
      this.logger.log('   ✅ Created: next.config.js', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating next.config.js: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create TypeScript configuration
   */
  createTypeScriptConfig() {
    try {
      const content = this.templateLoader.loadTemplate('configs/typescript-config.js');
      fs.writeFileSync('tsconfig.json', content);
      this.logger.log('   ✅ Created: tsconfig.json', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating tsconfig.json: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create Tailwind CSS configuration
   */
  createTailwindConfig() {
    try {
      this.templateLoader.writeTemplate('configs/tailwind-config.js', 'tailwind.config.js');
      this.logger.log('   ✅ Created: tailwind.config.js', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating tailwind.config.js: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create PostCSS configuration
   */
  createPostCSSConfig() {
    try {
      this.templateLoader.writeTemplate('configs/postcss-config.js', 'postcss.config.js');
      this.logger.log('   ✅ Created: postcss.config.js', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating postcss.config.js: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create Jest configuration
   */
  createJestConfig() {
    try {
      this.templateLoader.writeTemplate('configs/jest-config.js', 'jest.config.js');
      this.logger.log('   ✅ Created: jest.config.js', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating jest.config.js: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create Jest setup file
   */
  createJestSetup() {
    try {
      this.templateLoader.writeTemplate('configs/jest-setup.js', 'jest.setup.js');
      this.logger.log('   ✅ Created: jest.setup.js', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating jest.setup.js: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Validate all configuration files exist
   */
  validateConfigurations() {
    const requiredFiles = [
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
      'jest.config.js',
      'jest.setup.js'
    ];

    const missing = [];
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        missing.push(file);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing configuration files: ${missing.join(', ')}`);
    }

    return true;
  }

  /**
   * Update configuration files with custom settings
   * @param {Object} customConfig - Custom configuration overrides
   */
  updateConfigurations(customConfig = {}) {
    if (customConfig.tailwind) {
      this.updateTailwindConfig(customConfig.tailwind);
    }
    
    if (customConfig.typescript) {
      this.updateTypeScriptConfig(customConfig.typescript);
    }
    
    if (customConfig.next) {
      this.updateNextConfig(customConfig.next);
    }
  }

  /**
   * Update Tailwind configuration with custom settings
   * @param {Object} customTailwind - Custom Tailwind settings
   */
  updateTailwindConfig(customTailwind) {
    try {
      const configPath = 'tailwind.config.js';
      let content = fs.readFileSync(configPath, 'utf8');
      
      // Simple string replacement for common customizations
      if (customTailwind.theme) {
        content = content.replace(
          'theme: {\n    extend: {},\n  },',
          `theme: {\n    extend: ${JSON.stringify(customTailwind.theme, null, 2)},\n  },`
        );
      }
      
      if (customTailwind.plugins) {
        content = content.replace(
          'plugins: [],',
          `plugins: [${customTailwind.plugins.join(', ')}],`
        );
      }
      
      fs.writeFileSync(configPath, content);
      this.logger.log('   ✅ Updated: tailwind.config.js', 'green');
    } catch (error) {
      this.logger.log(`   ⚠️  Warning: Could not update tailwind.config.js: ${error.message}`, 'yellow');
    }
  }

  /**
   * Update TypeScript configuration with custom settings
   * @param {Object} customTypeScript - Custom TypeScript settings
   */
  updateTypeScriptConfig(customTypeScript) {
    try {
      const configPath = 'tsconfig.json';
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      // Merge custom settings
      if (customTypeScript.compilerOptions) {
        config.compilerOptions = { ...config.compilerOptions, ...customTypeScript.compilerOptions };
      }
      
      if (customTypeScript.include) {
        config.include = [...config.include, ...customTypeScript.include];
      }
      
      if (customTypeScript.exclude) {
        config.exclude = [...config.exclude, ...customTypeScript.exclude];
      }
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      this.logger.log('   ✅ Updated: tsconfig.json', 'green');
    } catch (error) {
      this.logger.log(`   ⚠️  Warning: Could not update tsconfig.json: ${error.message}`, 'yellow');
    }
  }

  /**
   * Update Next.js configuration with custom settings
   * @param {Object} customNext - Custom Next.js settings
   */
  updateNextConfig(customNext) {
    try {
      const configPath = 'next.config.js';
      let content = fs.readFileSync(configPath, 'utf8');
      
      // Simple string replacement for common customizations
      const customConfigString = Object.entries(customNext)
        .map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`)
        .join(',\n');
      
      content = content.replace(
        'const nextConfig = {\n  // App Router is now the default in Next.js 15\n}',
        `const nextConfig = {\n  // App Router is now the default in Next.js 15\n${customConfigString}\n}`
      );
      
      fs.writeFileSync(configPath, content);
      this.logger.log('   ✅ Updated: next.config.js', 'green');
    } catch (error) {
      this.logger.log(`   ⚠️  Warning: Could not update next.config.js: ${error.message}`, 'yellow');
    }
  }
}

module.exports = ConfigGenerator; 