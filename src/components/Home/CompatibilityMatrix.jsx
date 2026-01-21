import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdBloodtype } from "react-icons/md";
import { FaHandHoldingHeart, FaPlusCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import Container from "../Shared/Container";

// ================= [ COMPATIBILITY MATRIX ] ================= //
// > A high-fidelity, interactive blood type relationship visualizer.

const CompatibilityMatrix = () => {
  const [hoveredType, setHoveredType] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const activeType = hoveredType || selectedType;

  // Blood type compatibility mapping
  const compatibilityMap = {
    "A+": {
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
    },
    "A-": {
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"],
    },
    "B+": {
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
    },
    "B-": {
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"],
    },
    "AB+": {
      canDonateTo: ["AB+"],
      canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    "AB-": {
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["A-", "B-", "AB-", "O-"],
    },
    "O+": {
      canDonateTo: ["A+", "B+", "AB+", "O+"],
      canReceiveFrom: ["O+", "O-"],
    },
    "O-": {
      canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      canReceiveFrom: ["O-"],
    },
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const getStatus = (type) => {
    if (!activeType) return "idle";
    if (activeType === type) return "active";
    const canDonate = compatibilityMap[activeType].canDonateTo.includes(type);
    const canReceive =
      compatibilityMap[activeType].canReceiveFrom.includes(type);
    if (canDonate) return "can-donate";
    if (canReceive) return "can-receive";
    return "inactive";
  };

  const handleTypeClick = (type) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <section className="py-16 bg-[#0C1222] relative overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {/* Panoramic Console Header & Ribbon */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-5 border-b border-white/10">
            <div className="shrink-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 mb-2">
                <MdBloodtype className="text-red-500 text-sm" />
                <span className="text-red-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                  Bio-intelligence
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-[40px] lg:text-5xl font-black text-white leading-none tracking-tighter">
                Compatibility <span className="text-red-600">Model</span>
              </h2>
            </div>

            {/* The Selection Ribbon */}
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center gap-2 md:mt-8">
              {bloodTypes.map((type, idx) => {
                const status = getStatus(type);
                const isSelected = selectedType === type;

                return (
                  <motion.button
                    key={type}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onMouseEnter={() => setHoveredType(type)}
                    onMouseLeave={() => setHoveredType(null)}
                    onClick={() => handleTypeClick(type)}
                    className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full border transition-all duration-300 flex items-center justify-center font-black text-xs md:text-sm
                      ${status === "active" ? "bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] scale-110 z-20" : ""}
                      ${status === "can-donate" ? "bg-red-500/10 border-red-500/40 text-red-100" : ""}
                      ${status === "can-receive" ? "bg-blue-500/10 border-blue-500/40 text-blue-100" : ""}
                      ${status === "inactive" ? "bg-white/5 border-white/5 text-slate-700 opacity-40 grayscale" : ""}
                      ${status === "idle" ? "bg-white/5 border-white/10 text-slate-300 hover:border-red-500/50 hover:bg-white/10" : ""}
                      ${isSelected ? "ring-2 ring-white/30 ring-offset-2 ring-offset-slate-950" : ""}
                    `}
                  >
                    {type}
                    {/* Interaction Glow */}
                    {status === "active" && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-red-500/20 -z-10"></span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Panoramic Analysis Board */}
          <div className="relative min-h-[160px]">
            <AnimatePresence mode="wait">
              {activeType ? (
                <motion.div
                  key={activeType}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden"
                >
                  {/* Backdrop Glow */}
                  <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-red-600/5 to-transparent pointer-events-none"></div>

                  {/* Primary Profile */}
                  <div className="flex flex-row md:flex-row items-center text-left md:text-left gap-4 md:gap-6 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-10 shrink-0 w-full md:w-auto">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-2xl md:text-4xl shadow-2xl shadow-red-900/60 transition-all">
                      {activeType}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg md:text-2xl leading-tight tracking-tighter">
                        {activeType === "O-"
                          ? "Universal Donor"
                          : activeType === "AB+"
                            ? "Universal Recipient"
                            : `Type ${activeType}`}
                      </h4>
                      <div className="flex items-center justify-start gap-2 mt-1">
                        <span className="text-amber-500 text-[9px] md:text-[10px] uppercase font-black tracking-widest flex items-center gap-1.5">
                          <HiOutlineLightBulb
                            className="animate-pulse"
                            size={12}
                          />{" "}
                          Biological Profile
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* High-Impact Connections */}
                  <div className="grow grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-2 w-full">
                    {/* Recipients Board */}
                    <div>
                      <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaHandHoldingHeart className="text-red-500" /> Key
                        Recipients
                      </h5>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {compatibilityMap[activeType].canDonateTo.map((t) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="px-3 py-1 bg-red-600/10 border border-red-500/20 rounded-lg text-red-100 text-xs font-black shadow-inner"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Source Board */}
                    <div>
                      <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FaPlusCircle className="text-blue-400" /> Input Sources
                      </h5>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {compatibilityMap[activeType].canReceiveFrom.map(
                          (t) => (
                            <motion.span
                              key={t}
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-lg text-blue-100 text-xs font-black shadow-inner"
                            >
                              {t}
                            </motion.span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary Micro-text */}
                  <div className="w-full md:w-64 border-l border-white/10 pl-8 hidden lg:block">
                    <p className="text-slate-400 text-xs leading-relaxed font-medium italic">
                      {activeType === "O-"
                        ? "Critical emergency reserve for all identified types."
                        : activeType === "AB+"
                          ? "Adaptive recipient node for all source streams."
                          : `Life-link for ${compatibilityMap[activeType].canDonateTo.length} network nodes.`}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-[140px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/5 rounded-2xl text-center group"
                >
                  <HiOutlineLightBulb
                    className="text-slate-700 transition-colors group-hover:text-amber-500/50"
                    size={38}
                  />
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-3">
                    Initialize connection by selecting a group above
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CompatibilityMatrix;
