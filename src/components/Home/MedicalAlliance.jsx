import React from "react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaStethoscope,
  FaDna,
  FaHospital,
  FaUserMd,
  FaAmbulance,
  FaSyringe,
  FaNotesMedical,
  FaPills,
  FaFlask,
} from "react-icons/fa";
import { MdHealthAndSafety, MdBloodtype } from "react-icons/md";
import Container from "../Shared/Container";

// ================= [ MEDICAL ALLIANCE ] ================= //
// > A scrolling "Trust Strip" featuring premium medical partners.

const partners = [
  { name: "Aria Health", icon: FaHeartbeat },
  { name: "Nova BioLabs", icon: FaDna },
  { name: "Zenith Care", icon: FaStethoscope },
  { name: "Apex Medical", icon: FaHospital },
  { name: "Vitality Cross", icon: MdHealthAndSafety },
  { name: "Prime Hemo", icon: MdBloodtype },
  { name: "Global Relief", icon: FaAmbulance },
  { name: "MediCore", icon: FaUserMd },
  { name: "PureLife", icon: FaFlask },
  { name: "Optima Health", icon: FaNotesMedical },
];

const MedicalAlliance = () => {
  return (
    <section className="py-12 bg-white border-t border-slate-100 relative overflow-hidden">
      <Container>
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Trusted by World-Class Institutions
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden mask-linear-fade">
          {/* Gradient Masks */}
          <div className="absolute top-0 left-0 h-full w-24 bg-linear-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-linear-to-l from-white to-transparent z-10"></div>

          {/* Scrolling Track */}
          <div className="flex">
            <motion.div
              className="flex items-center gap-12 pr-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ width: "fit-content" }}
            >
              {/* Render items twice for seamless loop */}
              {[...partners, ...partners].map((partner, index) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 group cursor-default grayscale hover:grayscale-0"
                  >
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                      <Icon size={24} />
                    </div>
                    <span className="text-lg font-bold text-slate-700 font-sans tracking-tight whitespace-nowrap">
                      {partner.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MedicalAlliance;
