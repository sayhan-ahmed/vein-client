const DonorHomeSkeleton = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900 w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 animate-pulse">
            <div className="space-y-3">
              <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-96 max-w-full bg-gray-100 rounded"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded-xl"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Top Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
          {/* Card 1 Skeleton */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-gray-100"></div>
              <div className="h-5 w-24 bg-gray-100 rounded-full"></div>
            </div>
            <div className="mt-auto space-y-2">
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-100 rounded"></div>
            </div>
          </div>

          {/* Card 2 Skeleton */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-gray-100"></div>
              <div className="h-5 w-20 bg-gray-100 rounded-full"></div>
            </div>
            <div className="mt-auto flex justify-between items-end">
              <div className="space-y-2">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                <div className="h-3 w-32 bg-gray-100 rounded"></div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* Card 3 (Stats) Skeleton */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-40">
            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-end justify-between h-24 px-1 gap-3 pb-1">
              <div className="w-full bg-gray-100 rounded-t-lg h-[60%]"></div>
              <div className="w-full bg-gray-100 rounded-t-lg h-[80%]"></div>
              <div className="w-full bg-gray-100 rounded-t-lg h-[40%]"></div>
            </div>
          </div>

          {/* Card 4 (CTA) Skeleton */}
          <div className="bg-gray-200 rounded-2xl p-5 h-40 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-48 bg-gray-300/50 rounded"></div>
            </div>
            <div className="h-8 w-24 bg-white/50 rounded-lg self-start"></div>
          </div>
        </div>

        {/* Recent Requests Skeleton */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full animate-pulse">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-9 w-full md:w-56 bg-gray-100 rounded-xl"></div>
          </div>

          <div className="overflow-x-auto">
            <div className="w-full">
              {/* Table Header */}
              <div className="flex items-center gap-4 bg-gray-50/50 p-4 border-b border-gray-100">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="h-3 bg-gray-200 rounded w-24 flex-1"
                  ></div>
                ))}
              </div>
              {/* Table Rows */}
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="flex items-center gap-4 p-4 border-b border-gray-50"
                >
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-20 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex-1 flex justify-end gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorHomeSkeleton;
