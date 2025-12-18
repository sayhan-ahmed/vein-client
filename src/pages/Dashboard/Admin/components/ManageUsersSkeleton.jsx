const ManageUsersSkeleton = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900 w-full overflow-hidden mt-2 animate-pulse">
      <div className="mx-auto space-y-8">
        {/* Header Section Skeleton */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="h-10 w-64 bg-gray-200 rounded-xl"></div>
              <div className="h-4 w-96 max-w-full bg-gray-100 rounded-full"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 bg-gray-200 rounded-full"></div>
              <div className="h-11 w-40 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Card Skeleton */}
        <div className="bg-white rounded-4xl p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col relative overflow-hidden">
          {/* Controls Bar Skeleton (Filter & Count) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 mt-6 mb-6">
            <div className="bg-gray-50/80 p-1.5 rounded-full inline-flex gap-2 border border-gray-100">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 w-24 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
            <div className="h-6 w-32 bg-gray-100 rounded-full"></div>
          </div>

          {/* Table Skeleton */}
          <div className="px-6 pb-8">
            <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-xs">
              <div className="w-full">
                {/* Table Header Skeleton */}
                <div className="bg-gray-50/50 border-b border-gray-100 flex items-center px-6 py-5 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-200 rounded w-24 flex-1"
                    ></div>
                  ))}
                  <div className="h-3 bg-gray-200 rounded w-10"></div>
                </div>
                {/* Table Rows Skeleton */}
                {[1, 2, 3, 4, 5, 6].map((row) => (
                  <div
                    key={row}
                    className="border-b border-gray-50 flex items-center px-6 py-5 gap-4"
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-3 w-40 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-10 flex justify-end">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
              <div className="h-4 w-32 bg-gray-100 rounded-full"></div>
              <div className="h-10 w-64 bg-gray-100 rounded-xl shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersSkeleton;
