import React from 'react';
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
}