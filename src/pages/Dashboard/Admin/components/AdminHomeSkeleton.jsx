const AdminHomeSkeleton = () => {
  return (
    <div className="min-h-screen font-sans text-gray-800 w-full pb-12 animate-pulse">
      <div className="mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-4xl shadow-sm">
          <div className="space-y-3">
            <div className="h-10 w-64 bg-gray-200 rounded-xl"></div>
            <div className="h-4 w-48 bg-gray-100 rounded-full"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-32 bg-gray-100 rounded-full"></div>
            <div className="h-11 w-11 bg-gray-200 rounded-full"></div>
            <div className="h-11 w-11 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-gray-100 h-40 flex flex-col justify-between"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-10 w-20 bg-gray-200 rounded-lg"></div>
                <div className="h-3 w-32 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 h-[350px]">
            <div className="space-y-2 mb-8">
              <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
              <div className="h-3 w-32 bg-gray-100 rounded-full"></div>
            </div>
            <div className="h-48 w-full bg-gray-50 rounded-2xl"></div>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 h-[350px] flex flex-col items-center justify-center">
            <div className="self-start space-y-2 mb-8 w-full">
              <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
              <div className="h-3 w-24 bg-gray-100 rounded-full"></div>
            </div>
            <div className="w-40 h-40 rounded-full border-15 border-gray-100 flex items-center justify-center">
              <div className="w-12 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Activity & Command Center Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Panel */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 w-40 bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-16 bg-gray-100 rounded-full"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-50 rounded-2xl border border-gray-100"
                ></div>
              ))}
            </div>
          </div>
          {/* Command Center Panel */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 h-[400px]">
            <div className="space-y-2 mb-8">
              <div className="h-8 w-48 bg-slate-800 rounded-lg"></div>
              <div className="h-3 w-40 bg-slate-800/50 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-28 bg-slate-800/40 rounded-2xl border border-slate-700/50"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeSkeleton;
