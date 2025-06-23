import Link from 'next/link';

export default function ComponentsDocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/docs" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documentation
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
          <p className="text-xl text-gray-600">
            UI components, their props, and usage examples for CM Kit. Click on examples to view them in detail.
          </p>
        </div>
        {/* ...rest of the template omitted for brevity... */}
      </div>
    </div>
  );
} 