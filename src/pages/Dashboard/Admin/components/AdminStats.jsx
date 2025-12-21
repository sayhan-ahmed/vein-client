import {
  FaUsers,
  FaHandHoldingHeart,
  FaCoins,
  FaArrowUp,
  FaArrowRight,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router";

const AdminStats = ({ stats }) => {
  const statItems = [
    {
      id: 1,
      title: "Active Donors",
      count: stats.donorCount,
      icon: <FaUsers />,
      accentColor: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      hoverText:
        "group-hover:text-blue-600 group-hover:translate-x-1 transition-transform duration-500",
      hoverShadow: "group-hover:shadow-blue-100/50",
      hoverButtonBg: "hover:bg-blue-500/10",
      link: "/search",
    },
    {
      id: 2,
      title: "Total Funding",
      count: `$${stats.funding}`,
      icon: <FaCoins />,
      accentColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      hoverText:
        "group-hover:text-amber-600 group-hover:translate-x-1 transition-transform duration-500",
      hoverShadow: "group-hover:shadow-amber-100/50",
      hoverButtonBg: "hover:bg-amber-500/10",
      link: "/dashboard/all-funding",
    },
    {
      id: 3,
      title: "Pending Requests",
      count: stats.pendingRequests,
      icon: <FaHandHoldingHeart />,
      accentColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
      hoverText:
        "group-hover:text-red-600 group-hover:translate-x-1 transition-transform duration-500",
      hoverShadow: "group-hover:shadow-red-100/50",
      hoverButtonBg: "hover:bg-red-600/10",
      link: "/donation-requests",
    },
    {
      id: 4,
      title: "Total Requests",
      count: stats.totalRequests,
      icon: <FaClipboardList />,
      accentColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      hoverText:
        "group-hover:text-purple-600 group-hover:translate-x-1 transition-transform duration-500",
      hoverShadow: "group-hover:shadow-purple-100/50",
      hoverButtonBg: "hover:bg-purple-600/10",
      link: "/dashboard/all-blood-donation-request",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat) => (
        <div
          key={stat.id}
          className="group relative transition-all duration-300 hover:-translate-y-1"
        >
          {/* Main Card Content */}
          <div
            className={`relative bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] group-hover:shadow-lg ${stat.hoverShadow} overflow-hidden h-full`}
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="flex justify-between items-start">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${stat.bgColor} ${stat.accentColor} border ${stat.borderColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {stat.icon}
                </div>
              </div>

              <div>
                <h3
                  className={`text-4xl font-extrabold text-gray-900 tracking-tighter mb-1 transition-colors duration-300 ${stat.hoverText}`}
                >
                  {stat.count}
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  {stat.title}
                </p>
              </div>
            </div>

            {/* Decorative Background Icon */}
            <div
              className={`absolute -right-1 bottom-4 text-8xl opacity-[0.09] ${stat.accentColor} rotate-12 group-hover:rotate-0 transition-transform duration-700`}
            >
              {stat.icon}
            </div>
          </div>

          {/* Top-Right Hover Arrow */}
          <Link
            to={stat.link}
            className={`absolute right-3 top-3 w-10 h-10 rounded-full border flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 translate-y-4 hover:scale-110 hover:rotate-3 group-hover:translate-y-0 transition-all duration-500 bg-white ${stat.borderColor} ${stat.accentColor} ${stat.hoverButtonBg} z-20`}
          >
            <FaArrowRight className="-rotate-45" size={14} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
