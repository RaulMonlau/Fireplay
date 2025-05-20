// src/app/search/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 w-64 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 w-80 rounded"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 w-40 rounded"></div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full md:w-48 rounded"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full md:w-48 rounded"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 w-24 rounded"></div>
        </div>
        
        {/* Results */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 w-48 mb-6 rounded"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg"></div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-lg">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}