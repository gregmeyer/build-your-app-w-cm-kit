import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-6">
              This application is built with CM Kit and may collect certain information to provide and improve our services. 
              The types of information we collect depend on how you use our application.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Account information (if applicable)</li>
              <li>Contact information</li>
              <li>Usage data and preferences</li>
              <li>Communication with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Device information and identifiers</li>
              <li>Log data and usage analytics</li>
              <li>Cookies and similar technologies</li>
              <li>IP address and location data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Provide and maintain our services</li>
              <li>Improve user experience and functionality</li>
              <li>Communicate with you about updates and changes</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this policy or as required by law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-6">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@example.com<br />
                <strong>Address:</strong> [Your Company Address]<br />
                <strong>Phone:</strong> [Your Phone Number]
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Built with CM Kit</h3>
              <p className="text-blue-700 text-sm">
                This application was built using the CM Kit workflow system. 
                For more information about CM Kit, visit the{' '}
                <Link 
                  href="https://github.com/gregmeyer/build-your-app-w-cm-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  GitHub repository
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 