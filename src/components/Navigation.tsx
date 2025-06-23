import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/admin/demo', label: 'Demo' },
  { href: '/docs', label: 'Documentation' }
];

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                ☕ CM Kit
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/demo">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Demo Blank Page</span>
            </Link>
            <Link href="/admin/demo">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 