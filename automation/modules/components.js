const fs = require('fs');
const path = require('path');
const TemplateLoader = require('../core/template-loader');

/**
 * Components Generator Module
 * Creates all UI components for the Next.js application
 */

class ComponentsGenerator {
  constructor(logger) {
    this.logger = logger;
    this.templateLoader = new TemplateLoader();
  }

  /**
   * Create all UI components
   */
  createComponents() {
    this.logger.log('\n🧩 Creating UI Components...', 'blue');
    
    try {
      this.createComponentDirectories();
      this.createBasicComponents();
      this.createFooterComponent();
      
      this.logger.log('   ✅ All UI components created successfully', 'green');
    } catch (error) {
      this.logger.log(`   ❌ Error creating UI components: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create component directory structure
   */
  createComponentDirectories() {
    this.logger.log('   📁 Creating component directories...', 'yellow');
    
    const componentDirs = [
      'src/components',
      'src/components/ui'
    ];
    
    componentDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.logger.log(`     ✅ Created: ${dir}`, 'green');
      }
    });
  }

  /**
   * Create basic UI components
   */
  createBasicComponents() {
    this.logger.log('   🎨 Creating basic components...', 'yellow');
    
    try {
      // Create Button component
      const buttonComponent = `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 hover:text-gray-900'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`;
      
      fs.writeFileSync('src/components/ui/Button.tsx', buttonComponent);
      this.logger.log('     ✅ Created: src/components/ui/Button.tsx', 'green');

      // Create Card component
      const cardComponent = `import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={\`bg-white rounded-lg shadow-sm border border-gray-200 p-6 \${className}\`}>
      {children}
    </div>
  );
}`;
      
      fs.writeFileSync('src/components/ui/Card.tsx', cardComponent);
      this.logger.log('     ✅ Created: src/components/ui/Card.tsx', 'green');

      // Create Badge component
      const badgeComponent = `import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${className}\`;
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
}`;
      
      fs.writeFileSync('src/components/ui/Badge.tsx', badgeComponent);
      this.logger.log('     ✅ Created: src/components/ui/Badge.tsx', 'green');

      // Create Navigation component
      const navigationComponent = `import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ☕ CM Kit
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
              Docs
            </Link>
            <Link href="/admin/demo" className="text-gray-600 hover:text-gray-900">
              Demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}`;
      
      fs.writeFileSync('src/components/Navigation.tsx', navigationComponent);
      this.logger.log('     ✅ Created: src/components/Navigation.tsx', 'green');

      // Create Lightbox component
      const lightboxComponent = `'use client';

import React from 'react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Lightbox({ isOpen, onClose, children, title }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title || 'Details'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}`;
      
      fs.writeFileSync('src/components/ui/Lightbox.tsx', lightboxComponent);
      this.logger.log('     ✅ Created: src/components/ui/Lightbox.tsx', 'green');

    } catch (error) {
      this.logger.log(`     ❌ Error creating basic components: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Create Footer component
   */
  createFooterComponent() {
    this.logger.log('   🦶 Creating footer component...', 'yellow');
    
    try {
      const footerComponent = `import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">☕ CM Kit</h3>
            <p className="text-gray-600 mb-4">
              A comprehensive development workflow system for building scalable applications.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Documentation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-gray-900 text-sm">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/docs/cli" className="text-gray-600 hover:text-gray-900 text-sm">
                  CLI Reference
                </Link>
              </li>
              <li>
                <Link href="/docs/workflow" className="text-gray-600 hover:text-gray-900 text-sm">
                  Workflow Guide
                </Link>
              </li>
              <li>
                <Link href="/docs/components" className="text-gray-600 hover:text-gray-900 text-sm">
                  Components
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-600 hover:text-gray-900 text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} CM Kit. Built with Next.js and Tailwind CSS.
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              Made with ☕ by the CM Kit team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}`;
      
      fs.writeFileSync('src/components/ui/Footer.tsx', footerComponent);
      this.logger.log('     ✅ Created: src/components/ui/Footer.tsx', 'green');

    } catch (error) {
      this.logger.log(`     ❌ Error creating footer component: ${error.message}`, 'red');
      throw error;
    }
  }

  /**
   * Validate all component files exist
   */
  validateComponents() {
    const requiredFiles = [
      'src/components/ui/Button.tsx',
      'src/components/ui/Card.tsx',
      'src/components/ui/Badge.tsx',
      'src/components/ui/Lightbox.tsx',
      'src/components/ui/Footer.tsx',
      'src/components/Navigation.tsx'
    ];

    const missing = [];
    
    requiredFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        missing.push(file);
      }
    });

    if (missing.length > 0) {
      throw new Error(`Missing component files: ${missing.join(', ')}`);
    }

    return true;
  }
}

module.exports = ComponentsGenerator; 