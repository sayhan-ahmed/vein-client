const DonationRequestSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FD] relative py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 relative">
          {/* Badge Skeleton */}
          <div className="mx-auto w-48 h-8 rounded-full bg-gray-200 mb-6"></div>

          {/* Title Skeleton */}
          <div className="mx-auto w-3/4 max-w-lg h-12 bg-gray-200 rounded-2xl mb-4"></div>

          {/* Subtitle Skeleton */}
          <div className="mx-auto w-2/3 max-w-md h-6 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Card Skeleton */}
        <div className="bg-white/60 backdrop-blur-2xl backdrop-saturate-150 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-white/60 relative overflow-hidden ring-1 ring-black/5 animate-pulse">
          {/* Top Accent Skeleton */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gray-200 opacity-80"></div>

          <div className="p-8 sm:p-12 relative space-y-8">
            {/* Section 1 Skeleton */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/50">
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  <div className="h-12 w-full bg-white rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  <div className="h-12 w-full bg-white rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Section 2 Skeleton */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-6 w-40 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-12 w-full bg-gray-100 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 Skeleton */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="h-6 w-40 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-12 w-full bg-white rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-12 w-full bg-white rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Button Skeleton */}
            <div className="pt-6">
              <div className="w-full h-14 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestSkeleton;
