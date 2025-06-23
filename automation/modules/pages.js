const fs = require('fs');
const path = require('path');
const TemplateLoader = require('../core/template-loader');

/**
 * Pages Generator Module
 * Creates all page files for the Next.js application
 */

class PagesGenerator {
  constructor(logger) {
    this.logger = logger;
    this.templateLoader = new TemplateLoader();
  }

  /**
   * Create all page files
   */
  createPages() {
    this.logger.log('\n📱 Creating Page Files...', 'blue');
    
    try {
      this.createBasicPages();
      this.createErrorPages();
      this.createDocumentationPages();
      this.createLegalPages();
      
      this.logger.log('   ✅ All page files created successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating page files: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create basic app pages (layout, homepage, admin demo)
   */
  createBasicPages() {
    this.logger.log('   📄 Creating basic pages...', 'yellow');
    
    try {
      // Create app directory structure
      const appDirs = [
        'src/app',
        'src/app/admin',
        'src/app/admin/demo',
        'src/app/docs',
        'src/app/docs/cli',
        'src/app/docs/workflow',
        'src/app/docs/components',
        'src/app/docs/api',
        'src/app/privacy',
        'src/app/security',
        'src/app/terms'
      ];
      
      appDirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          this.logger.log(`     ✅ Created: ${dir}`, 'green');
        }
      });

      // Create layout
      this.templateLoader.writeTemplate('pages/layout.tsx', 'src/app/layout.tsx');
      this.logger.log('     ✅ Created: src/app/layout.tsx', 'green');

      // Create global CSS
      this.templateLoader.writeTemplate('pages/globals.css', 'src/app/globals.css');
      this.logger.log('     ✅ Created: src/app/globals.css', 'green');

      // Create homepage
      this.templateLoader.writeTemplate('pages/homepage.js', 'src/app/page.tsx');
      this.logger.log('     ✅ Created: src/app/page.tsx', 'green');

      // Create admin demo page
      this.templateLoader.writeTemplate('pages/admin-demo.js', 'src/app/admin/demo/page.tsx');
      this.logger.log('     ✅ Created: src/app/admin/demo/page.tsx', 'green');

    } catch (error) {
      this.logger.log(`     ❌ Error creating basic pages: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create error handling pages
   */
  createErrorPages() {
    this.logger.log('   ⚠️  Creating error pages...', 'yellow');
    
    try {
      // Create error page
      this.templateLoader.writeTemplate('pages/error.tsx', 'src/app/error.tsx');
      this.logger.log('     ✅ Created: src/app/error.tsx', 'green');

      // Create not-found page
      this.templateLoader.writeTemplate('pages/not-found.tsx', 'src/app/not-found.tsx');
      this.logger.log('     ✅ Created: src/app/not-found.tsx', 'green');

      // Create global error page
      this.templateLoader.writeTemplate('pages/global-error.tsx', 'src/app/global-error.tsx');
      this.logger.log('     ✅ Created: src/app/global-error.tsx', 'green');

    } catch (error) {
      this.logger.log(`     ❌ Error creating error pages: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create documentation pages
   */
  createDocumentationPages() {
    this.logger.log('   📚 Creating documentation pages...', 'yellow');
    
    try {
      // Create main docs page
      this.templateLoader.writeTemplate('docs/main-docs.js', 'src/app/docs/page.tsx');
      this.logger.log('     ✅ Created: src/app/docs/page.tsx', 'green');

      // Create CLI docs page
      this.templateLoader.writeTemplate('docs/cli-docs.js', 'src/app/docs/cli/page.tsx');
      this.logger.log('     ✅ Created: src/app/docs/cli/page.tsx', 'green');

      // Create workflow docs page
      this.templateLoader.writeTemplate('docs/workflow-docs.js', 'src/app/docs/workflow/page.tsx');
      this.logger.log('     ✅ Created: src/app/docs/workflow/page.tsx', 'green');

      // Create components docs page
      this.templateLoader.writeTemplate('docs/components-docs.js', 'src/app/docs/components/page.tsx');
      this.logger.log('     ✅ Created: src/app/docs/components/page.tsx', 'green');

      // Create API docs page
      this.templateLoader.writeTemplate('docs/api-docs.js', 'src/app/docs/api/page.tsx');
      this.logger.log('     ✅ Created: src/app/docs/api/page.tsx', 'green');

    } catch (error) {
      this.logger.log(`     ❌ Error creating documentation pages: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create legal pages
   */
  createLegalPages() {
    this.logger.log('   ⚖️  Creating legal pages...', 'yellow');
    
    try {
      // Create privacy policy page
      this.templateLoader.writeTemplate('legal/privacy-policy.js', 'src/app/privacy/page.tsx');
      this.logger.log('     ✅ Created: src/app/privacy/page.tsx', 'green');

      // Create security page
      this.templateLoader.writeTemplate('legal/security.js', 'src/app/security/page.tsx');
      this.logger.log('     ✅ Created: src/app/security/page.tsx', 'green');

      // Create terms of service page
      this.templateLoader.writeTemplate('legal/terms.js', 'src/app/terms/page.tsx');
      this.logger.log('     ✅ Created: src/app/terms/page.tsx', 'green');

    } catch (error) {
      this.logger.log(`     ❌ Error creating legal pages: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Validate all page files exist
   */
  validatePages() {
    const requiredFiles = [
      'src/app/layout.tsx',
      'src/app/globals.css',
      'src/app/page.tsx',
      'src/app/error.tsx',
      'src/app/not-found.tsx',
      'src/app/global-error.tsx',
      'src/app/admin/demo/page.tsx',
      'src/app/docs/page.tsx',
      'src/app/docs/cli/page.tsx',
      'src/app/docs/workflow/page.tsx',
      'src/app/docs/components/page.tsx',
      'src/app/docs/api/page.tsx',
      'src/app/privacy/page.tsx',
      'src/app/security/page.tsx',
      'src/app/terms/page.tsx'
    ];

    const missing = [];
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        missing.push(file);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing page files: ${missing.join(', ')}`);
    }

    return true;
  }
}

module.exports = PagesGenerator; 