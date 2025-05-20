// src/app/game/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Breadcrumbs placeholder */}
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        
        {/* Game header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Image placeholder */}
          <div className="md:w-1/2">
            <div className="rounded-lg bg-gray-200 dark:bg-gray-700 aspect-video"></div>
          </div>
          
          {/* Details placeholder */}
          <div className="md:w-1/2">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            
            <div className="mt-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            </div>
          </div>
        </div>
        
        {/* Description placeholder */}
        <div className="mb-12">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/5 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-3"></div>
        </div>
        
        {/* Screenshots placeholder */}
        <div className="mb-12">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/5 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded aspect-video"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}