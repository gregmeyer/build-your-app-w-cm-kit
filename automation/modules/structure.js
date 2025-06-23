const fs = require('fs');
const path = require('path');

/**
 * Project Structure Generator Module
 * Creates the basic project directory structure and essential files
 */

class StructureGenerator {
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Create project structure
   */
  createProjectStructure() {
    this.logger.log('\n📁 Creating Project Structure...', 'blue');
    
    try {
      this.createDirectories();
      this.createEssentialFiles();
      
      this.logger.log('   ✅ Project structure created successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating project structure: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create all necessary directories
   */
  createDirectories() {
    this.logger.log('   📂 Creating directories...', 'yellow');
    
    const directories = [
      'tickets',
      'stories', 
      'issues',
      'docs',
      'utils/commands',
      'utils/lib',
      'logs',
      'src/app',
      'src/app/admin',
      'src/app/admin/demo',
      'src/components',
      'src/components/ui',
      'src/lib',
      'src/types',
      '.vscode'
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.logger.log(`     ✅ Created: ${dir}`, 'green');
      } else {
        this.logger.log(`     ℹ️  Exists: ${dir}`, 'cyan');
      }
    });
  }

  /**
   * Create essential files
   */
  createEssentialFiles() {
    this.logger.log('   📝 Creating essential files...', 'yellow');
    
    const essentialFiles = [
      {
        path: 'docs/README.md',
        content: `# Documentation

This directory contains project documentation.

## Structure

- \`prd/\` - Product Requirements Documents
- \`api/\` - API documentation
- \`workflow/\` - Development workflow guides

Created by CM Kit automated setup.
`
      },
      {
        path: 'tickets/AGENT-CONTEXT.md',
        content: `# Agent Context

This file provides context for AI agents working on this project.

## Project Overview

This is a Next.js 15 application built with CM Kit workflow system.

## Key Technologies

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React 18+

## Development Workflow

1. Use the CLI tools in \`utils/commands/\`
2. Create tickets for new features
3. Follow the workflow documentation
4. Test thoroughly before committing

## Important Files

- \`src/app/\` - Next.js app router pages
- \`src/components/\` - Reusable UI components
- \`utils/cli.js\` - Main CLI interface
- \`automation/\` - Setup and automation scripts

Created by CM Kit automated setup.
`
      },
      {
        path: 'stories/README.md',
        content: `# User Stories

This directory contains user stories for the project.

## Format

Each story should follow this format:

\`\`\`
# STORY-XXX: [Title]

## As a [user type]
I want [feature/action]
So that [benefit/value]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Notes
Additional context or implementation details.
\`\`\`

Created by CM Kit automated setup.
`
      },
      {
        path: 'issues/README.md',
        content: `# Issues

This directory contains bug reports and issues.

## Format

Each issue should follow this format:

\`\`\`
# BUG-XXX: [Title]

## Description
Brief description of the issue.

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [Operating System]
- Browser: [Browser and version]
- Version: [App version]

## Additional Context
Screenshots, logs, or other relevant information.
\`\`\`

Created by CM Kit automated setup.
`
      }
    ];
    
    essentialFiles.forEach(file => {
      if (!fs.existsSync(file.path)) {
        fs.writeFileSync(file.path, file.content);
        this.logger.log(`     ✅ Created: ${file.path}`, 'green');
      } else {
        this.logger.log(`     ℹ️  Exists: ${file.path}`, 'cyan');
      }
    });
  }

  /**
   * Create .gitignore file
   */
  createGitignore() {
    this.logger.log('   🚫 Creating .gitignore...', 'yellow');
    
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/

# CM Kit specific
tickets/*.md
!tickets/AGENT-CONTEXT.md
!tickets/README.md
stories/*.md
!stories/README.md
issues/*.md
!issues/README.md
logs/*.log
`;

    if (!fs.existsSync('.gitignore')) {
      fs.writeFileSync('.gitignore', gitignoreContent);
      this.logger.log('     ✅ Created: .gitignore', 'green');
    } else {
      this.logger.log('     ℹ️  Exists: .gitignore', 'cyan');
    }
  }

  /**
   * Create Cursor configuration
   */
  createCursorConfig() {
    this.logger.log('   🎨 Creating Cursor configuration...', 'yellow');
    
    const cursorSettings = `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.md": "markdown"
  },
  "markdown.preview.breaks": true,
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.linux": "bash",
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}`;

    if (!fs.existsSync('.vscode/settings.json')) {
      fs.writeFileSync('.vscode/settings.json', cursorSettings);
      this.logger.log('     ✅ Created: .vscode/settings.json', 'green');
    } else {
      this.logger.log('     ℹ️  Exists: .vscode/settings.json', 'cyan');
    }
  }

  /**
   * Validate project structure
   */
  validateStructure() {
    const requiredDirs = [
      'tickets',
      'stories',
      'issues',
      'docs',
      'utils/commands',
      'utils/lib',
      'logs',
      'src/app',
      'src/components',
      'src/lib',
      'src/types'
    ];

    const missing = [];
    
    requiredDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        missing.push(dir);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing directories: ${missing.join(', ')}`);
    }

    return true;
  }
}

module.exports = StructureGenerator; 