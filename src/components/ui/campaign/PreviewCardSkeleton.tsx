export default function CampaignPreviewCardSkeleton() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="h-11 bg-gray-200 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>

      <div className="space-y-2 text-sm mb-6">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
        <div className="bg-gray-100 rounded p-2">
          <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="bg-gray-100 rounded p-2">
          <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="bg-gray-100 rounded p-2">
          <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mb-1"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
      </div>

      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}
