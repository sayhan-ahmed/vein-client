import { Link } from "react-router";
import {
  MdOutlineBloodtype,
  MdSearch,
  MdVerifiedUser,
  MdSecurity,
  MdPeople,
  MdArrowForward,
  MdDashboard,
} from "react-icons/md";
import Container from "../Shared/Container";
import useAuth from "../../hooks/useAuth";
import { motion } from "motion/react";
import bloodDrop from "../../assets/images/blood_drop_isolated.png";

const Banner = () => {
  const { user } = useAuth();

  return (
    <div className="relative w-full min-h-screen bg-[#020202] overflow-hidden flex items-center font-sans">
      {/* 
        --- THE CRIMSON GENESIS (SPATIAL ARCHITECTURE) --- 
        World-class depth using layered light and kinetic grids.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Deep Spatial Mesh gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[1400px] h-[1400px] bg-red-950/30 rounded-full blur-[220px] animate-mesh-primary"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-red-600/10 rounded-full blur-[200px] animate-mesh-secondary"></div>

        {/* traveling Laser Sync Lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-full w-[200%] h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent animate-laser-travel"
            style={{
              top: `${15 + i * 14}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${12 + i * 2}s`,
            }}
          ></div>
        ))}

        {/* Static Precision Grid with Glint Edge */}
        <div className="absolute inset-0 opacity-[0.04] bg-size-[100px_100px] bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)]"></div>
      </div>

      <Container className="relative z-10 pt-20 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center min-h-[90vh]">
          {/* --- LEFT: The Elite Communication Hub --- */}
          <div className="flex flex-col space-y-12 text-center lg:text-left order-2 lg:order-1">
            {/* Status Plectrum: Glass Material */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex self-center lg:self-start py-2.5 px-6 rounded-full bg-white/3 backdrop-blur-3xl border border-white/10 items-center gap-4 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -inset-x-full -inset-y-full bg-conic-gradient from-red-600/20 via-transparent to-transparent animate-glint opacity-40"></div>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_10px_#EF4444]"></span>
              </span>
              <span className="text-white/50 text-[10px] font-black tracking-[0.5em] uppercase font-mono relative z-10">
                Genesis Network Active
              </span>
            </motion.div>

            {/* Typography: Proportional Excellence */}
            <div className="space-y-6 lg:space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl lg:text-[6.5rem] font-black tracking-[-0.05em] text-white leading-[0.9] drop-shadow-2xl"
              >
                Pulse of <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-rose-200 to-red-700 animate-shimmer bg-size-[200%_auto]">
                  Persistence.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg lg:text-xl text-white/40 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium tracking-tight"
              >
                The undisputed global standard for Clinical Blood Orchestration.
                Synchronizing the world's heartbeats through high-fidelity
                glass.
              </motion.p>
            </div>

            {/* Statistical Glass Slab */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center justify-between p-10 rounded-[2.5rem] bg-white/4 backdrop-blur-3xl border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {[
                { val: "2.5k", label: "Donors" },
                { val: "100%", label: "Verified" },
                { val: "O-", label: "Priority" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5 relative z-10">
                  <span className="text-3xl lg:text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-lg">
                    {stat.val}
                  </span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Executive Control Hub */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start"
            >
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="group relative h-[72px] px-12 bg-white text-black rounded-4xl font-black text-lg hover:bg-red-600 hover:text-white transition-all duration-700 flex items-center justify-center gap-4 overflow-hidden shadow-2xl active:scale-95"
              >
                {user ? (
                  <MdDashboard className="text-2xl" />
                ) : (
                  <MdOutlineBloodtype className="text-2xl" />
                )}
                <span>{user ? "Dashboard" : "Join as a Donor"}</span>
                <MdArrowForward className="group-hover:translate-x-2 transition-transform" />
              </Link>

              <Link
                to="/search"
                className="group h-[72px] px-12 bg-white/4 backdrop-blur-3xl border border-white/10 text-white rounded-4xl font-black text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-700 flex items-center justify-center gap-4 active:scale-95 shadow-2xl"
              >
                <MdSearch className="text-2xl text-white/30 group-hover:text-red-500 transition-colors" />
                <span>Search Donors</span>
              </Link>
            </motion.div>
          </div>

          {/* --- RIGHT: THE GENESIS CORE (IMMERSIVE HUB) --- */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center min-h-[500px]">
            {/* 1. SPATIAL BACKGROUND ARCHITECTURE (Behind the Drop) */}
            <div className="absolute inset-[-20%] flex items-center justify-center pointer-events-none z-10">
              {/* Layered Concentration Rings */}
              <div className="absolute w-[450px] lg:w-[600px] h-[450px] lg:h-[600px] border border-white/3 rounded-full animate-spin-slow"></div>
              <div className="absolute w-[500px] lg:w-[680px] h-[500px] lg:h-[680px] border border-white/1.5 rounded-full animate-spin-reverse-slow"></div>

              {/* The "Event Horizon" Glow */}
              <div className="absolute w-[350px] lg:w-[450px] h-[350px] lg:h-[450px] bg-red-600/10 rounded-full blur-[120px] animate-pulse-ultra"></div>

              {/* Kinetic Pulse Matrix */}
              <div className="absolute inset-0 opacity-20 animate-pulse-slow">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-linear-to-b from-transparent via-red-500/50 to-transparent blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent blur-sm"></div>
              </div>

              {/* Glint Orbiters */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-red-500/60 blur-[1px] shadow-[0_0_15px_#EF4444]"
                  style={{
                    width: "4px",
                    height: "4px",
                    animation: `orbit ${8 + i * 4}s linear infinite`,
                    offsetPath: `path('M 0 -${220 + i * 40} A ${220 + i * 40} ${
                      220 + i * 40
                    } 0 1 1 0 ${220 + i * 40} A ${220 + i * 40} ${
                      220 + i * 40
                    } 0 1 1 0 -${220 + i * 40}')`,
                  }}
                ></div>
              ))}
            </div>

            {/* 2. THE FOCAL ASSET: Isolated Blood Drop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-full max-w-[550px] aspect-square flex items-center justify-center"
            >
              {/* Central Refractive Bloom */}
              <div className="absolute inset-0 bg-red-600/5 rounded-full blur-[80px]"></div>

              <img
                src={bloodDrop}
                alt="Executive Blood Drop"
                className="w-full h-full object-contain animate-float-exclusive relative z-30 drop-shadow-[0_0_120px_rgba(239,68,68,0.4)]"
              />

              {/* SPATIAL WIDGETS: Data Feeds */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 1.4 }}
                className="absolute top-[25%] right-[-8%] bg-white/3 backdrop-blur-3xl border border-white/10 p-5 rounded-2xl z-40 shadow-2xl flex items-center gap-5 group cursor-default"
              >
                <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform duration-500">
                  <MdSecurity className="text-white text-xl" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                    Clinic Hash
                  </span>
                  <span className="text-white font-black text-[12px] tabular-nums">
                    0xEF4...42RF
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.6 }}
                className="absolute bottom-[10%] left-[-8%] bg-white/3 backdrop-blur-3xl border border-white/10 p-6 rounded-[2.5rem] z-40 shadow-2xl flex flex-col gap-3 min-w-[200px] text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]"></span>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">
                    Live Flow Verified
                  </span>
                </div>
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="h-full w-3/4 bg-red-500 shadow-[0_0_15px_#EF4444]"
                  />
                </div>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">
                  N-Node Syncing...
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* --- KINETIC SYMPHONY STYLING --- */}
      <style>{`
        @keyframes mesh-primary {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, -5%) scale(1.15); }
        }
        @keyframes mesh-secondary {
          0%, 100% { transform: translate(0, 0) scale(1.15); }
          50% { transform: translate(-5%, 5%) scale(1); }
        }
        .animate-mesh-primary { animation: mesh-primary 20s ease-in-out infinite; }
        .animate-mesh-secondary { animation: mesh-secondary 25s ease-in-out infinite; }

        @keyframes laser-travel {
          0% { left: -100%; opacity: 0; }
          20%, 80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-laser-travel { animation: laser-travel 12s linear infinite; }

        @keyframes float-exclusive {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.08); }
        }
        .animate-float-exclusive { animation: float-exclusive 10s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-shimmer { animation: shimmer 8s linear infinite; }

        @keyframes glint {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-glint { animation: glint 10s linear infinite; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }

        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse-slow { animation: spin-reverse-slow 30s linear infinite; }

        @keyframes spin-exclusive {
          0% { transform: rotate(0deg); border-width: 1px; }
          50% { transform: rotate(180deg); border-width: 2px; }
          100% { transform: rotate(360deg); border-width: 1px; }
        }
        .animate-spin-exclusive { animation: spin-exclusive 20s linear infinite; }

        @keyframes pulse-ultra {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.3); }
        }
        .animate-pulse-ultra { animation: pulse-ultra 8s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow { animation: pulse-slow 12s ease-in-out infinite; }

        @keyframes orbit {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }

        .bg-conic-gradient {
          background-image: conic-gradient(var(--tw-gradient-from), var(--tw-gradient-to), var(--tw-gradient-from));
        }
        
        /* Premium Webkit Hide Scrollbars */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020202; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default Banner;
