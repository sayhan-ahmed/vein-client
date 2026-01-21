const AllFundingsSkeleton = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-gray-200 rounded-xl w-10 h-10"></div>
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-4 w-72 bg-gray-100 rounded-full"></div>
        </div>

        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="space-y-2 text-right">
            <div className="h-3 w-16 bg-gray-100 rounded-full ml-auto"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-px h-8 bg-gray-100 mx-2"></div>
          <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
        </div>
      </div>

      {/* Table Section Skeleton */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-left">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </th>
                <th className="px-8 py-6 text-left">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </th>
                <th className="px-8 py-6 text-left">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                </th>
                <th className="px-8 py-6 text-right">
                  <div className="h-3 w-12 bg-gray-200 rounded ml-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-gray-200"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-3 w-40 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-6 w-20 bg-gray-200 rounded-lg"></div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="h-6 w-16 bg-gray-100 rounded-full ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllFundingsSkeleton;
