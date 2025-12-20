import React from "react";
import { Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  MdOutlineBloodtype,
  MdSearch,
  MdVerifiedUser,
  MdSecurity,
  MdAccessTime,
  MdDashboard,
} from "react-icons/md";
import Container from "../Shared/Container";
import useAuth from "../../hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="relative w-full min-h-[700px] bg-[#0f172a] overflow-hidden flex items-center font-sans">
      {/* --- Animated Aurora Background --- */}
      <div className="absolute inset-0 bg-[#0f172a] z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-blob"></div>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-16 md:py-0">
          {/* --- LEFT: Hero Content --- */}
          <div className="space-y-10 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md shadow-xl transition-transform hover:scale-105 cursor-default">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-slate-200 text-sm font-semibold tracking-wide uppercase">
                Every Drop Counts
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
              Donate Blood, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-rose-500 to-orange-400 animate-text-shimmer bg-size-[200%_auto]">
                Save a Life.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Join our community of heroes. Your simple act of kindness creates
              a ripple effect of hope and healing for those in need.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2 justify-center lg:justify-start">
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="group relative px-8 py-4 bg-linear-to-r from-red-600 to-rose-600 rounded-full font-bold text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  {user ? (
                    <>
                      <MdDashboard className="text-2xl" />
                      <span>Go to Dashboard</span>
                    </>
                  ) : (
                    <>
                      <MdOutlineBloodtype className="text-2xl" />
                      <span>Join as a Donor</span>
                    </>
                  )}
                </div>
              </Link>

              <Link
                to="/search"
                className="group px-8 py-4 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-full font-bold text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <MdSearch className="text-2xl text-slate-300 group-hover:text-white transition-colors" />
                  <span>Search Donors</span>
                </div>
              </Link>
            </div>

            {/* Trust Indicators (Glass Cards) */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="p-2 rounded-full bg-red-500/10 text-red-400">
                  <MdSecurity className="text-xl" />
                </div>
                <span className="text-slate-300 text-sm font-medium">
                  Secure Process
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-400">
                  <MdVerifiedUser className="text-xl" />
                </div>
                <span className="text-slate-300 text-sm font-medium">
                  Verified Donors
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-sm hover:bg-slate-800/50 transition-colors">
                <div className="p-2 rounded-full bg-green-500/10 text-green-400">
                  <MdAccessTime className="text-xl" />
                </div>
                <span className="text-slate-300 text-sm font-medium">
                  24/7 Available
                </span>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Lottie Animation --- */}
          <div className="hidden lg:block relative h-[500px] md:h-[600px] w-full items-center justify-center lg:justify-end">
            {/* Spotlight Glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-red-500/10 via-transparent to-transparent blur-3xl rounded-full transform scale-75 pointer-events-none"></div>

            <div className="relative z-10 w-full h-full transform scale-110">
              <DotLottieReact
                src="https://lottie.host/3b8c9436-764f-4628-8515-5e10434bb907/umE7fQgiTj.lottie"
                loop
                autoplay
                className="w-full h-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Custom Styles for text shimmer and animations */}
      <style>{`
        @keyframes text-shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-text-shimmer {
            animation: text-shimmer 5s ease infinite;
        }
        @keyframes blob {
             0% { transform: translate(0px, 0px) scale(1); }
             33% { transform: translate(30px, -50px) scale(1.1); }
             66% { transform: translate(-20px, 20px) scale(0.9); }
             100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
