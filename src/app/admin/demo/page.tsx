export default function AdminDemo() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Coffee Money Workflow System - Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          This is a demonstration of the comprehensive development workflow system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">3</div>
          <div className="text-sm text-gray-600 mt-1">Active Tickets</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="text-sm text-gray-600 mt-1">Completed Stories</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">8</div>
          <div className="text-sm text-gray-600 mt-1">Development Sessions</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
          <div className="text-3xl font-bold text-gray-900">15</div>
          <div className="text-sm text-gray-600 mt-1">Issues Resolved</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            🚀 Start Session
          </button>
          <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            📋 Create Ticket
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            📊 Status Report
          </button>
        </div>
      </div>
    </div>
  );
}