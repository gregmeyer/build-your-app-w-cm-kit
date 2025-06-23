import React from 'react';

export default function APIDocs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
        <p className="text-xl text-gray-600">API endpoints and integration guides for CM Kit.</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">CLI API</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Programmatic Usage</h3>
            <div className="bg-gray-50 rounded p-3">
              <code className="text-sm text-gray-800">
                {`const { run } = require('./utils/commands/create-prd');
await run({ title: 'New Feature', template: 'feature' });`}
              </code>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Custom Commands</h3>
            <div className="bg-gray-50 rounded p-3">
              <code className="text-sm text-gray-800">
                {`// utils/commands/custom-command.js
module.exports = {
  description: 'Custom command description',
  run: async (options) => {
    // Command implementation
  }
};`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}