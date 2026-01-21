// ================= [ PROFILE SKELETON ] ================= //
// > Kinetic loading placeholder for profile views.
const ProfileSkeleton = () => {
  return (
    <div className="font-sans text-gray-900 w-full p-2 sm:p-4 pb-20">
      <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8">
        {/* Header Skeleton */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/50 relative overflow-hidden group">
          {/* Header background decoration */}
          <div className="absolute top-0 left-0 w-full h-32 bg-[#1D3557]/20 flex items-center justify-center"></div>

          {/* Mock Button */}
          <div className="absolute top-0 right-0 p-6 z-20">
            <div className="h-10 w-32 bg-slate-200 rounded-full animate-pulse"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 mt-4">
            <div className="relative group/avatar">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl bg-slate-100 animate-pulse"></div>
            </div>
            <div className="text-center md:text-left flex-1 space-y-4 mb-2">
              <div className="h-10 bg-slate-200 rounded-xl w-48 md:w-64 mx-auto md:mx-0 animate-pulse"></div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="h-8 bg-slate-100 rounded-full w-24 animate-pulse"></div>
                <div className="h-8 bg-slate-100 rounded-full w-16 animate-pulse"></div>
                <div className="h-8 bg-slate-100 rounded-full w-40 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Right Column */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            {/* Form Box */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="h-7 bg-slate-200 rounded-lg w-1/2 mb-6 animate-pulse"></div>
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-1/4 ml-1 animate-pulse"></div>
                    <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 animate-pulse"></div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-1/2 ml-1 animate-pulse"></div>
                    <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 animate-pulse"></div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3 bg-slate-100 rounded w-1/2 ml-1 animate-pulse"></div>
                    <div className="h-12 bg-gray-50 rounded-xl border border-gray-100 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Box */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-1 animate-pulse"></div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-slate-50/50 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Left Column */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-6 md:space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-32 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl animate-pulse"></div>
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <div className="h-6 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Box */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 h-96">
              <div className="flex justify-between items-center mb-8">
                <div className="h-6 bg-slate-200 rounded w-40 animate-pulse"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-slate-100 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded w-16 animate-pulse"></div>
                </div>
              </div>
              <div className="w-full h-64 bg-slate-50/50 rounded-2xl flex items-end justify-between px-6 md:px-12 pb-8">
                {[30, 60, 40, 85, 55, 75, 45, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-8 md:w-12 bg-slate-200/60 rounded-t-lg animate-pulse"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Activity Box */}
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 h-64">
              <div className="h-6 bg-slate-200 rounded w-48 mb-6 animate-pulse"></div>
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/3 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
