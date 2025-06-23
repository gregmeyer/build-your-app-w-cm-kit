import Link from 'next/link';

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
}