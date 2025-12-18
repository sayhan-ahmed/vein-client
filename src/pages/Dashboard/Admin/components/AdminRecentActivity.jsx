import { Link } from "react-router";
import {
  FaTint,
  FaUserCog,
  FaClipboardList,
  FaChartLine,
  FaCalendarAlt,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

const AdminRecentActivity = ({ requests }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Requests Panel */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6 z-10">
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tighter">
              Latest Activity
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Real-time Request Feed
            </p>
          </div>
          <Link
            to="/dashboard/all-blood-donation-request"
            className="group flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors"
          >
            View All
            <span className="w-6 h-6 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
              <FaChevronRight size={8} />
            </span>
          </Link>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {requests.slice(0, 5).map((request, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:shadow-lg hover:shadow-red-50/50 hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
            >
              {/* Blood Group */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shadow-sm transition-transform duration-500 group-hover:rotate-12 ${
                  request.donationStatus === "pending"
                    ? "bg-amber-100 text-amber-600"
                    : request.donationStatus === "done"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span className="font-black text-xs">{request.bloodGroup}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-bold text-gray-900 text-sm truncate pr-2">
                    {request.recipientName}
                  </h4>
                  <span className="text-[10px] font-medium text-gray-400">
                    {request.donationDate || "Just now"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-semibold truncate w-2/3">
                    {request.hospitalName}
                  </p>
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider ${
                      request.donationStatus === "pending"
                        ? "text-amber-500"
                        : request.donationStatus === "done"
                        ? "text-emerald-500"
                        : "text-gray-400"
                    }`}
                  >
                    {request.donationStatus === "done"
                      ? "Completed"
                      : request.donationStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-2 py-10">
              <FaClipboardList size={24} className="opacity-20" />
              <span className="text-xs font-bold uppercase tracking-widest">
                No Recent Activity
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Command Center (Quick Actions) - Flat Premium Design */}
      <div className="bg-[#0f172a] rounded-3xl p-6 shadow-xl text-white relative flex flex-col justify-between group border border-slate-800">
        <div className="relative z-10 mb-8">
          <h3 className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-3">
            <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
            Command Center
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 pl-4">
            Administrative Control Panel
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <Link
            to="/dashboard/all-users"
            className="bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-4 transition-all duration-300 group/item flex flex-col justify-between h-28 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 shadow-inner text-blue-400 flex items-center justify-center group-hover/item:scale-105 transition-transform border border-slate-700">
              <FaUserCog size={16} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover/item:text-white transition-colors">
                Control Users
              </span>
              <FaArrowRight
                size={10}
                className="text-slate-500 group-hover/item:text-blue-400 transition-colors"
              />
            </div>
          </Link>

          <Link
            to="/dashboard/all-blood-donation-request"
            className="bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-orange-500/50 rounded-2xl p-4 transition-all duration-300 group/item flex flex-col justify-between h-28 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 shadow-inner text-orange-400 flex items-center justify-center group-hover/item:scale-105 transition-transform border border-slate-700">
              <FaClipboardList size={16} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover/item:text-white transition-colors">
                All Requests
              </span>
              <FaArrowRight
                size={10}
                className="text-slate-500 group-hover/item:text-orange-400 transition-colors"
              />
            </div>
          </Link>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between h-28 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-900 shadow-inner text-purple-400 flex items-center justify-center border border-slate-700">
              <FaChartLine size={16} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Edit Content
              </span>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold border border-slate-700">
                SOON
              </span>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between h-28 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-900 shadow-inner text-emerald-400 flex items-center justify-center border border-slate-700">
              <FaCalendarAlt size={16} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Events
              </span>
              <span className="text-[8px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold border border-slate-700">
                SOON
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRecentActivity;
