const fs = require('fs');
const path = require('path');

/**
 * Template Loader Utility
 * Loads and processes template files with variable substitution
 */

class TemplateLoader {
  constructor(templatesDir = 'automation/templates') {
    this.templatesDir = templatesDir;
  }

  /**
   * Load a template file and return its content
   * @param {string} templatePath - Path to template relative to templates directory
   * @returns {string} Template content
   */
  loadTemplate(templatePath) {
    const fullPath = path.join(this.templatesDir, templatePath);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Template not found: ${fullPath}`);
    }
    
    return fs.readFileSync(fullPath, 'utf8');
  }

  /**
   * Load a template and substitute variables
   * @param {string} templatePath - Path to template relative to templates directory
   * @param {Object} variables - Variables to substitute in template
   * @returns {string} Processed template content
   */
  loadAndProcess(templatePath, variables = {}) {
    let content = this.loadTemplate(templatePath);
    
    // Substitute variables in the format {{variableName}}
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      content = content.replace(regex, value);
    });
    
    return content;
  }

  /**
   * Write a processed template to a file
   * @param {string} templatePath - Path to template relative to templates directory
   * @param {string} outputPath - Path where to write the processed template
   * @param {Object} variables - Variables to substitute in template
   */
  writeTemplate(templatePath, outputPath, variables = {}) {
    const content = this.loadAndProcess(templatePath, variables);
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, content);
  }

  /**
   * Get list of available templates
   * @param {string} subdir - Optional subdirectory to list
   * @returns {Array} List of template files
   */
  listTemplates(subdir = '') {
    const dir = path.join(this.templatesDir, subdir);
    
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    return files
      .filter(file => file.isFile())
      .map(file => path.join(subdir, file.name));
  }

  /**
   * Validate that all required templates exist
   * @param {Array} requiredTemplates - List of required template paths
   * @returns {Object} Validation result with missing templates
   */
  validateTemplates(requiredTemplates) {
    const missing = [];
    
    requiredTemplates.forEach(templatePath => {
      const fullPath = path.join(this.templatesDir, templatePath);
      if (!fs.existsSync(fullPath)) {
        missing.push(templatePath);
      }
    });
    
    return {
      valid: missing.length === 0,
      missing
    };
  }
}

module.exports = TemplateLoader; 