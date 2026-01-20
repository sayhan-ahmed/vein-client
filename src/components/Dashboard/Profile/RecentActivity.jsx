import { FaChartLine } from "react-icons/fa";
import { Link } from "react-router";

const RecentActivity = ({ myDonations }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
        <FaChartLine className="text-blue-500" /> Recent Donations
      </h3>
      <div className="space-y-1 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
        {myDonations.length > 0 ? (
          [...myDonations]
            .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
            .slice(0, 1)
            .map((don, i) => (
              <div
                key={i}
                className="flex gap-4 items-center justify-between py-3 border-b border-gray-50 last:border-0 group animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 ring-4 ring-red-50 ml-1"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-tight mb-2">
                      Donated Blood
                    </p>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1">
                      {don.donationDate} • {don.recipientDistrict}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 text-[10px] font-black text-red-600 border border-red-100 mb-0.5">
                    {don.bloodGroup}
                  </div>
                  <p className="text-[10px] text-gray-500 font-semibold truncate max-w-[150px]">
                    {don.hospitalName}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
              <FaChartLine size={16} />
            </div>
            No recent activity recorded.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
