export default function BlankPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blank Page Example
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This is a blank page with navigation. It's intentionally empty by design.
          </p>
          
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <div className="text-gray-400 text-lg mb-4">
              ✨ Ready for your content
            </div>
            <p className="text-gray-500">
              This page demonstrates the basic layout structure with navigation.
              Add your content here when building your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 