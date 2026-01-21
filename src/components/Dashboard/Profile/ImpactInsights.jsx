// ================= [ IMPACT INSIGHTS ] ================= //
// > Metrics summary of donor impact and reach.
import { FaTint, FaMapMarkerAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

const ImpactInsights = ({ myDonations }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
      <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
        <FaTint className="text-red-500" /> Impact Insights
      </h3>

      {/* Insight: Latest Activity */}
      <div className="bg-red-50/40 p-5 rounded-2xl flex items-center justify-between group hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Latest Contribution
          </p>
          <h4 className="text-base font-black text-gray-800 mt-1">
            {myDonations.length > 0
              ? [...myDonations].sort(
                  (a, b) => new Date(b.donationDate) - new Date(a.donationDate),
                )[0].donationDate
              : "No donations yet"}
          </h4>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm group-hover:rotate-12 transition-transform">
          <MdHistory size={20} />
        </div>
      </div>

      {/* Insight: Geographical Reach */}
      <div className="bg-blue-50/40 p-5 rounded-2xl flex items-center justify-between group hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Network Coverage
          </p>
          <h4 className="text-base font-black text-gray-800 mt-1">
            {new Set(myDonations.map((d) => d.recipientDistrict)).size}{" "}
            Application Areas
          </h4>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm group-hover:-rotate-12 transition-transform">
          <FaMapMarkerAlt size={18} />
        </div>
      </div>

      {/* Insight: Impact Level */}
      <div className="bg-purple-50/40 p-5 rounded-2xl flex items-center justify-between group hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100 mt-auto">
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Impact Level
          </p>
          <h4 className="text-base font-black text-gray-800 mt-1">
            {myDonations.length > 5
              ? "Elite Savior"
              : myDonations.length > 0
                ? "Regular Hero"
                : "Novice Donor"}
          </h4>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-500 shadow-sm group-hover:scale-110 transition-transform">
          <FaTint size={18} />
        </div>
      </div>
    </div>
  );
};

export default ImpactInsights;
