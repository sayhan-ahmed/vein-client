import useRole from "../../../hooks/useRole";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import DonorHome from "../Donor/DonorHome";

const DashboardHome = () => {
  const [role, isLoading] = useRole();

  if (isLoading)
    return (
      <div className="container mx-auto px-4 sm:px-8 py-8">
        {/* Welcome Section Skeleton */}
        <div className="mb-8 h-32 rounded-2xl bg-red-50/50 border border-red-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          <div className="p-8 space-y-4">
            <div className="h-8 bg-gray-200/80 rounded-lg w-1/3"></div>
            <div className="h-4 bg-gray-200/60 rounded-lg w-1/4"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="py-4">
          <div className="flex justify-between items-center mb-6">
            <div className="h-7 bg-gray-200 rounded-lg w-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
            </div>
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg shadow-gray-100 rounded-xl overflow-hidden bg-white border border-gray-100">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
                <div className="grid grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-gray-300 rounded w-20 opacity-50"
                    ></div>
                  ))}
                </div>
              </div>
              {/* Rows */}
              <div className="divide-y divide-gray-100">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="px-5 py-5 grid grid-cols-5 gap-4 items-center relative overflow-hidden bg-white"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>

                    {/* Recipient */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-100 rounded w-20"></div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-28"></div>
                      <div className="h-3 bg-gray-100 rounded w-16"></div>
                    </div>

                    {/* StatusBadge */}
                    <div>
                      <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 w-8 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="mt-8 mx-auto w-48 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    );

  if (role === "donor") {
    return <DonorHome />;
  }

  // Default to Admin Stats (or Volunteer if applicable in future)
  return (
    <div>
      <AdminStatistics />
    </div>
  );
};

export default DashboardHome;
