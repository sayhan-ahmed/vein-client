import React from "react";
import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa6";
import Container from "../Shared/Container";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Regular Donor",
    location: "New York, USA",
    quote:
      "Donating blood used to feel like a chore. Vein made it an experience. Knowing exactly when my donation saved a life changed everything for me.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Recipient",
    location: "San Francisco, USA",
    quote:
      "In my darkest hour, a stranger's kindness gave me a second chance. Vein's network isn't just about blood; it's about connecting souls.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Dr. Emily Hayes",
    role: "Partner Surgeon",
    location: "London, UK",
    quote:
      "The speed and reliability of Vein's donor matching system has revolutionized how we handle emergency cases. It is truly lifesaving technology.",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d2",
  },
];

const VoiceOfPeople = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-900 text-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-medium tracking-widest uppercase text-red-400">
              Community Voices
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Stories of <span className="text-red-500">Hope</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Real people, real impact. Discover how our community is reshaping
            the future of healthcare, one drop at a time.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:bg-slate-800/60 transition-colors duration-300">
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-white/5 group-hover:text-red-500/20 transition-colors duration-300">
                  <FaQuoteRight size={40} />
                </div>

                {/* Content */}
                <div className="flex flex-col h-full z-10 relative">
                  <div className="mb-6 grow">
                    <p className="text-slate-300 italic leading-relaxed text-lg">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-red-500/50 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              {/* Hover Glow */}
              <div className="absolute inset-0 -z-10 bg-red-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VoiceOfPeople;
