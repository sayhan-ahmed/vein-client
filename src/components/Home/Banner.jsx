// ================= [ HOME BANNER ] ================= //
// > Interactive hero section with site introduction.
import { Link } from "react-router";
import {
  MdOutlineBloodtype,
  MdSearch,
  MdDashboard,
  MdSecurity,
} from "react-icons/md";
import Container from "../Shared/Container";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import bloodDrop from "../../assets/images/blood_drop_isolated.png";

const Banner = () => {
  const { user } = useAuth();

  // Staggered Animation Variants for Content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariant = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="relative w-full min-h-[600px] bg-[#0B1120] overflow-hidden flex items-center font-sans text-white py-12 lg:py-0">
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Ambient Glows with Pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] lg:w-[800px] aspect-square bg-blue-900/20 rounded-full blur-[80px] lg:blur-[120px] mix-blend-screen"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[250px] sm:w-[400px] lg:w-[600px] aspect-square bg-red-900/20 rounded-full blur-[70px] lg:blur-[100px] mix-blend-screen"
        ></motion.div>

        {/* Clean Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

        {/* Animated Fire Embers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-red-500/60 rounded-full blur-[1px]"
              initial={{
                y: "110%",
                x: Math.random() * 100 - 50,
                opacity: 0,
              }}
              animate={{
                y: -100,
                x: Math.random() * 100 - 50,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
              }}
            />
          ))}
        </div>
      </div>

      <Container className="relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 h-full items-center">
          {/* --- LEFT: Executive Messaging --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center space-y-6 sm:space-y-8 order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-emerald-400">
                    Vein Network
                  </span>
                </div>
                <div className="w-px h-3 bg-white/20"></div>
                <span className="text-[9px] sm:text-[10px] font-medium text-white/60 tracking-wide">
                  Every Drop Counts
                </span>
              </div>
            </motion.div>

            {/* Typography */}
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] px-4 sm:px-0"
              >
                Connecting Donors, <br className="hidden sm:block" />
                <span className="text-red-500">Saving Futures.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-slate-400 leading-relaxed font-light max-w-lg mx-auto lg:mx-0 px-6 sm:px-0"
              >
                Our intelligent platform bridges the gap between urgent medical
                needs and verified donors. Real-time coordination when every
                second counts.
              </motion.p>
            </div>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 px-6 sm:px-0"
            >
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="inline-flex items-center justify-center gap-3 h-12 px-8 bg-white text-[#0B1120] rounded-xl font-bold text-sm tracking-wide hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5 w-full sm:w-auto"
              >
                {user ? (
                  <MdDashboard size={18} />
                ) : (
                  <MdOutlineBloodtype size={18} />
                )}
                {user ? "Dashboard" : "Join as Donor"}
              </Link>

              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-3 h-12 px-8 bg-white/5 text-white border border-white/10 rounded-xl font-medium text-sm tracking-wide hover:bg-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm w-full sm:w-auto"
              >
                <MdSearch size={18} className="text-white/70" />
                Search Donors
              </Link>
            </motion.div>
          </motion.div>

          {/* --- RIGHT: Refined Visual Centerpiece --- */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center py-6 sm:py-10 lg:py-0">
            {/* Central Composition */}
            <div className="relative w-[240px] sm:w-[320px] lg:w-[420px] aspect-square flex items-center justify-center">
              {/* Background Rings - Animated */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-red-500/20 border-dashed"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[15%] rounded-full border border-white/10"
              ></motion.div>

              {/* Core Glow */}
              <motion.div
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-red-600/20 rounded-full blur-2xl sm:blur-[60px] lg:blur-[80px]"
              ></motion.div>

              {/* Floating Asset */}
              <motion.div
                variants={floatingVariant}
                animate="animate"
                className="relative z-10 w-3/4 h-3/4"
              >
                <img
                  src={bloodDrop}
                  alt="Vein Logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating Glass Stats - Staggered Floating */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, -10, 0], // independent float
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.8 },
                  x: { duration: 1, delay: 0.8 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
                className="absolute top-[10%] sm:top-[20%] -right-4 sm:-right-[5%] lg:-right-[10%] bg-white/5 border border-white/10 backdrop-blur-xl p-2.5 sm:p-3 lg:p-4 rounded-xl flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-xl pointer-events-none z-20"
              >
                <div className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg text-white shrink-0">
                  <MdSecurity className="text-xs sm:text-sm lg:text-base" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-[8px] lg:text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                    Verified
                  </div>
                  <div className="text-xs lg:text-sm font-bold text-white whitespace-nowrap">
                    100% Secure
                  </div>
                </div>
                <div className="sm:hidden text-[10px] font-bold text-white">
                  Secure
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: [0, 10, 0], // independent float reverse
                }}
                transition={{
                  opacity: { duration: 1, delay: 1 },
                  x: { duration: 1, delay: 1 },
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                className="absolute bottom-[10%] sm:bottom-[20%] -left-4 sm:-left-[5%] lg:-left-[10%] bg-white/5 border border-white/10 backdrop-blur-xl p-2.5 sm:p-3 lg:p-4 rounded-xl flex items-center gap-2 sm:gap-3 lg:gap-4 shadow-xl pointer-events-none z-20"
              >
                <div className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg text-white shrink-0">
                  <MdOutlineBloodtype className="text-xs sm:text-sm lg:text-base" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-[8px] lg:text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                    Platform
                  </div>
                  <div className="text-xs lg:text-sm font-bold text-white whitespace-nowrap">
                    Always Active
                  </div>
                </div>
                <div className="sm:hidden text-[10px] font-bold text-white">
                  Active
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
