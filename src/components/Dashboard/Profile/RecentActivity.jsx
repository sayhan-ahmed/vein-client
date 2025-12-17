import { FaChartLine } from "react-icons/fa";

const RecentActivity = ({ myDonations }) => {
  return (
    <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaChartLine className="text-blue-500" /> Recent Donations
      </h3>
      <div className="space-y-2">
        {myDonations.length > 0 ? (
          [...myDonations]
            .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
            .slice(0, 3)
            .map((don, i) => (
              <div
                key={i}
                className="flex gap-4 items-start animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <div className="w-px h-8 bg-gray-100 my-0.5"></div>
                </div>
                <div className="pb-2">
                  <p className="text-sm font-bold text-gray-700">
                    Donated Blood
                  </p>
                  <p className="text-xs text-gray-500">
                    {don.donationDate} • {don.recipientDistrict}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No recent activity recorded.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
