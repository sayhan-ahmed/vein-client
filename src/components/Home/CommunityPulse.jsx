import { useQuery } from "@tanstack/react-query";
import { FaBolt, FaHeartPulse } from "react-icons/fa6";
import { Link } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { getUrgencyLevel } from "../../utils/urgency";
import Container from "../Shared/Container";

const CommunityPulse = () => {
  const axiosPublic = useAxiosPublic();

  // 1. Fetch live activity data
  const { data: requests = [], isError } = useQuery({
    queryKey: ["community-pulse"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/donation-requests");
        if (!Array.isArray(data)) return [];
        // Filter for pending only, then sort by newest
        return data
          .filter((req) => req.donationStatus === "pending")
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
          )
          .slice(0, 5); // Take top 5 for the ticker
      } catch (err) {
        console.error("Pulse Error:", err);
        return [];
      }
    },
    refetchInterval: 15000,
    retry: false,
  });

  // 2. Fetch global stats
  const { data: stats } = useQuery({
    queryKey: ["public-stats-mini"],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get("/public-stats");
        return data;
      } catch (err) {
        return null;
      }
    },
  });

  if (isError) return null; // Graceful degradation: show nothing if broken

  return (
    <section className="bg-slate-900 border-y border-slate-800 relative overflow-hidden py-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-20 bg-blue-500/10 blur-[100px] pointer-events-none" />

      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Status & Ticker */}
          <div className="flex items-center gap-6 flex-1 min-w-0 overflow-hidden">
            {/* Live Indicator */}
            <div className="flex items-center gap-2 shrink-0 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Live Feed
              </span>
            </div>

            {/* Seamless Scrolling Ticker */}
            <div className="relative flex-1 overflow-hidden h-6 mask-linear-x group cursor-default">
              <div className="flex min-w-full">
                {/* We render the content twice to create a seamless infinite loop */}
                {[0, 1].map((i) => {
                  // Ensure we have enough items density (at least 10)
                  let marqueeItems = requests.length > 0 ? [...requests] : [];
                  const MIN_ITEMS = 10;
                  while (
                    marqueeItems.length > 0 &&
                    marqueeItems.length < MIN_ITEMS
                  ) {
                    marqueeItems = [...marqueeItems, ...requests];
                  }

                  return (
                    <div
                      key={i}
                      className="flex shrink-0 min-w-full items-center justify-around animate-marquee"
                      aria-hidden={i === 1}
                    >
                      {marqueeItems.length > 0 ? (
                        marqueeItems.map((req, idx) => {
                          const urgency = getUrgencyLevel(req);
                          const colorClass =
                            urgency.color === "red"
                              ? "bg-red-500/20 text-red-400"
                              : urgency.color === "purple"
                                ? "bg-purple-500/20 text-purple-400"
                                : urgency.color === "orange"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "bg-blue-500/20 text-blue-400";
                          return (
                            <Link
                              key={`${req._id}-${i}-${idx}`}
                              to={`/donation-requests/${req._id}`}
                              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-8"
                            >
                              <span
                                className={`text-xs font-bold px-1.5 rounded ${colorClass}`}
                              >
                                {urgency.label}
                              </span>
                              <span className="font-medium whitespace-nowrap">
                                {req.bloodGroup} request in{" "}
                                {req.recipientDistrict}
                              </span>
                            </Link>
                          );
                        })
                      ) : (
                        <span className="text-slate-500 text-sm italic px-4">
                          Scanning for real-time signals...
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Mini Stats */}
          <div className="hidden md:flex items-center gap-8 pl-8 border-l border-slate-800/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-red-500">
                <FaHeartPulse />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">
                  Donors
                </p>
                <p className="text-sm font-bold text-white">
                  {stats?.totalDonors || "---"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-800 text-yellow-500">
                <FaBolt />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">
                  Impact
                </p>
                <p className="text-sm font-bold text-white">
                  {stats?.totalDonations || "---"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* CSS for Seamless Marquee */}
      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        /* Pause on hover for better UX */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .mask-linear-x {
           mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </section>
  );
};

export default CommunityPulse;
