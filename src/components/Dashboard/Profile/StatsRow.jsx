import {
  FaHandHoldingHeart,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

const StatsRow = ({ totalDonations, totalRequests, impactScore }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 group hover:border-red-100 transition-colors">
        <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
          <FaHandHoldingHeart size={20} />
        </div>
        <h4 className="text-3xl font-black text-gray-800">{totalDonations}</h4>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Donations
        </p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 group hover:border-red-100 transition-colors">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
          <FaClipboardList size={20} />
        </div>
        <h4 className="text-3xl font-black text-gray-800">{totalRequests}</h4>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Requests
        </p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 md:col-span-1 col-span-2 group hover:border-red-100 transition-colors">
        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
          <FaChartLine size={20} />
        </div>
        <h4 className="text-3xl font-black text-gray-800">{impactScore}</h4>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Impact Score
        </p>
      </div>
    </div>
  );
};

export default StatsRow;
