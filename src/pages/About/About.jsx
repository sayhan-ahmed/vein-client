// ================= [ ABOUT PAGE ] ================= //
// > Platform information, mission, and impact statistics.
import Container from "../../components/Shared/Container";
import {
  FaHeartbeat,
  FaUsers,
  FaHandHoldingHeart,
  FaAward,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const About = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {} } = useQuery({
    queryKey: ["public-life-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/public-stats");
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50/30 py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
            <MdBloodtype className="text-red-600 text-xl" />
            <span className="text-red-600 text-sm font-bold">About Vein</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#1D3658] mb-6">
            Saving Lives, <span className="text-red-600">One Drop</span> at a
            Time
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Vein is a modern blood donation platform connecting donors with
            those in need, making the process efficient, transparent, and
            accessible for everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
              <FaHeartbeat className="text-red-600 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-[#1D3658] mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To create a seamless, secure, and efficient platform that connects
              blood donors with recipients in need, ensuring that no life is
              lost due to blood unavailability.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <FaUsers className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-[#1D3658] mb-4">
              Our Vision
            </h2>
            <p className="text-slate-600 leading-relaxed">
              To build a community where blood donation is accessible,
              transparent, and celebrated, empowering individuals to save lives
              and make a meaningful impact.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 mb-16">
          <h2 className="text-4xl font-bold text-[#1D3658] mb-8 text-center">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdBloodtype className="text-red-600 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#1D3658] mb-3">
                Connect Donors
              </h3>
              <p className="text-slate-600">
                We connect verified blood donors with recipients in real-time,
                ensuring quick and efficient matches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandHoldingHeart className="text-green-600 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#1D3658] mb-3">
                Manage Requests
              </h3>
              <p className="text-slate-600">
                Our platform allows users to create, manage, and track blood
                donation requests with ease and transparency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-blue-600 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-[#1D3658] mb-3">
                Build Community
              </h3>
              <p className="text-slate-600">
                We foster a community of compassionate donors and recipients,
                celebrating every life saved together.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: stats.totalDonors || 0, label: "Active Donors" },
            { number: stats.totalDonations || 0, label: "Lives Saved" },
            { number: stats.totalDistricts || 0, label: "Districts Covered" },
            {
              number: stats.fundingContributions || 0,
              label: "Funding Contributions",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100"
            >
              <div className="text-4xl font-black text-red-600 mb-2">
                {typeof stat.number === "number" &&
                stat.number < 10 &&
                stat.number > 0
                  ? `0${stat.number}`
                  : stat.number}
              </div>
              <div className="text-slate-600 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default About;
