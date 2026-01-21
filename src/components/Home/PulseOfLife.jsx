import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Link } from "react-router";
import {
  FaUsers,
  FaBullhorn,
  FaHandHoldingHeart,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Container from "../Shared/Container";

// Kinetic Number Component
const KineticNumber = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: duration,
      onUpdate: (latest) => setCount(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const TimelineNode = ({
  icon: Icon,
  label,
  value,
  description,
  link,
  color,
  delay,
  isLast,
}) => {
  return (
    <div className="relative flex group items-center">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[24px] top-[50%] h-[calc(100%+24px)] w-[2px] bg-slate-100 group-hover:bg-red-100 transition-colors duration-500 overflow-hidden z-0">
          <motion.div
            initial={{ y: "-100%" }}
            whileInView={{ y: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className={`w-full h-1/2 bg-linear-to-b from-transparent via-${color.split("-")[1]}-400 to-transparent`}
          />
        </div>
      )}

      {/* Node Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="flex items-center gap-6 py-3 w-full"
      >
        {/* Icon Node */}
        <Link to={link || "#"} className="relative shrink-0 z-10">
          <div
            className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-xl text-white shadow-lg group-hover:scale-110 transition-all duration-500`}
          >
            <Icon />
          </div>
          {/* Pulse Effect */}
          <div
            className={`absolute inset-0 rounded-xl bg-linear-to-br ${color} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500`}
          />
        </Link>

        {/* Text Area */}
        <div className="flex-1 min-w-0">
          <Link
            to={link || "#"}
            className="block group/card bg-white/40 backdrop-blur-md border border-slate-100/50 rounded-3xl p-6 hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:border-white"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                    {label}
                  </h4>
                  <div className="h-px w-8 bg-red-100" />
                </div>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                    <KineticNumber value={value} />
                  </h3>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Live
                  </span>
                </div>
              </div>

              <div className="md:w-[50%]">
                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-3">
                  {description}
                </p>
                <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover/card:text-red-500 transition-colors">
                  Check Details{" "}
                  <FaArrowRight className="ml-2 group-hover/card:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default function PulseOfLife() {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {} } = useQuery({
    queryKey: ["public-life-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/public-stats");
      return data;
    },
  });

  return (
    <section className="py-16 relative overflow-hidden bg-slate-50/50">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Header Portion */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:pt-8 h-fit">
            <span className="inline-block px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[10px] font-bold text-red-600 uppercase tracking-[0.3em] mb-4">
              Life Cycle Flow
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              The{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-500">
                Journey
              </span>{" "}
              of a Single Drop
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Witness how our ecosystem breathes. From registration to the final
              life saved, every pulse on this timeline represents a heartbeat
              protected.
            </p>

            <div className="mt-10 flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-xs max-w-xs">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Network Operational
              </span>
            </div>
          </div>

          {/* Timeline Portion */}
          <div className="lg:col-span-8 pl-0 md:pl-6">
            <TimelineNode
              icon={FaUsers}
              label="The Registry"
              value={stats.totalDonors || 0}
              description="Explore our vast network of ready-to-help heroes and find your match."
              link="/search"
              color="from-blue-500 to-indigo-600"
              delay={0.1}
            />
            <TimelineNode
              icon={FaBullhorn}
              label="The Call"
              value={stats.pendingRequests || 0}
              description="Witness the real-time heartbeat of community needs and active requests."
              link="/donation-requests"
              color="from-red-500 to-rose-600"
              delay={0.2}
            />
            <TimelineNode
              icon={FaHandHoldingHeart}
              label="The Support"
              value={stats.fundingContributions || 0}
              description="Empower the network through contributions that keep the lifeline flowing."
              link="/funding"
              color="from-emerald-500 to-teal-600"
              delay={0.3}
            />
            <TimelineNode
              icon={FaGlobe}
              label="The Impact"
              value={stats.totalDistricts || 0}
              description="Discover our mission and how we've scaled across districts nationwide."
              link="/about"
              color="from-amber-500 to-orange-600"
              delay={0.4}
              isLast={true}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
