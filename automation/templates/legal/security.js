import Link from 'next/link';

export default function Security() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Security</h1>
          <p className="text-xl text-gray-600">
            Our commitment to protecting your data and maintaining a secure environment
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Practices</h2>
            <p className="text-gray-600 mb-6">
              We take security seriously and implement industry-standard practices to protect your data and ensure 
              the integrity of our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Protection</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>All data is encrypted in transit using TLS/SSL protocols</li>
              <li>Sensitive data is encrypted at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure Security</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Secure hosting environments with regular updates</li>
              <li>Firewall protection and intrusion detection</li>
              <li>DDoS protection and mitigation</li>
              <li>Regular backup procedures and disaster recovery plans</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Application Security</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Secure coding practices and code reviews</li>
              <li>Input validation and sanitization</li>
              <li>Protection against common web vulnerabilities (OWASP Top 10)</li>
              <li>Regular dependency updates and security patches</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Monitoring</h2>
            <p className="text-gray-600 mb-6">
              We continuously monitor our systems for potential security threats and maintain comprehensive 
              logging for security analysis and incident response.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Incident Response</h2>
            <p className="text-gray-600 mb-6">
              In the event of a security incident, we have established procedures to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Quickly identify and contain the threat</li>
              <li>Assess the impact and scope</li>
              <li>Notify affected users as required by law</li>
              <li>Implement corrective measures</li>
              <li>Conduct post-incident analysis</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reporting Security Issues</h2>
            <p className="text-gray-600 mb-6">
              If you discover a security vulnerability or have concerns about our security practices, 
              please report them to us immediately.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Security Contact</h4>
              <p className="text-yellow-800">
                <strong>Email:</strong> security@example.com<br />
                <strong>Subject:</strong> Security Issue - [Brief Description]<br />
                <strong>Response Time:</strong> We aim to respond to security reports within 24 hours
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Certifications</h2>
            <p className="text-gray-600 mb-6">
              Our security practices align with industry standards and best practices, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>OWASP security guidelines</li>
              <li>NIST cybersecurity framework</li>
              <li>GDPR compliance (where applicable)</li>
              <li>Industry-specific security requirements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Security</h2>
            <p className="text-gray-600 mb-6">
              We also provide guidance to help you maintain security:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication when available</li>
              <li>Keep your devices and software updated</li>
              <li>Be cautious of phishing attempts</li>
              <li>Report suspicious activity immediately</li>
            </ul>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Built with CM Kit</h3>
              <p className="text-blue-700 text-sm">
                This application was built using the CM Kit workflow system, which includes security best practices 
                and secure development workflows. For more information about CM Kit, visit the{' '}
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