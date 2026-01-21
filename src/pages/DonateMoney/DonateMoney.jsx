// ================= [ DONATE MONEY PAGE ] ================= //
// > Fundraising interface for platform support.
import { useState } from "react";
import {
  FaCheckCircle,
  FaHeart,
  FaShieldAlt,
  FaUsers,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { MdAttachMoney, MdVerified, MdTrendingUp } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import donate1 from "../../assets/images/donate1.jpeg";
import donate2 from "../../assets/images/donate2.jpg";
import donate3 from "../../assets/images/donate3.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

// Add stripe publishable key
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) {
  console.error(
    "VITE_STRIPE_PUBLISHABLE_KEY is missing in your .env.local file!",
  );
}
const stripePromise = stripeKey
  ? loadStripe(stripeKey)
  : Promise.reject("Missing Stripe Key");

const DonateMoney = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [selectedAmount, setSelectedAmount] = useState(null);

  const { data: stats = {} } = useQuery({
    queryKey: ["public-life-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/public-stats");
      return data;
    },
  });
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const { data: funding = [], refetch } = useQuery({
    queryKey: ["funding-public"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/funding");
      return data;
    },
  });

  const totalRaised = funding.reduce(
    (acc, curr) => acc + (curr.amount || 0),
    0,
  );
  const targetAmount = 5000;
  const progressPercentage = Math.min(
    Math.round((totalRaised / targetAmount) * 100),
    100,
  );
  const isGoalReached = totalRaised >= targetAmount;

  const predefinedAmounts = [
    { value: 10, label: "Starter", impact: "Helps 1 connection" },
    { value: 25, label: "Supporter", impact: "Helps 3 connections" },
    { value: 50, label: "Advocate", impact: "Helps 7 connections" },
    { value: 100, label: "Champion", impact: "Helps 15 connections" },
    { value: 250, label: "Hero", impact: "Helps 40 connections" },
    { value: 500, label: "Guardian", impact: "Helps 100+ connections" },
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const getFinalAmount = () => {
    return customAmount ? parseInt(customAmount) : selectedAmount;
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const amount = getFinalAmount();

    if (!amount || amount <= 0) {
      Swal.fire({
        title: "Invalid Amount",
        text: "Please select or enter a valid donation amount.",
        icon: "warning",
        iconColor: "#F59E0B",
        position: "center",
        confirmButtonText: "Okay",
        confirmButtonColor: "#1D3658",
        customClass: {
          popup: "rounded-3xl shadow-2xl",
          title: "text-2xl font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton:
            "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
        },
      });
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = (transactionId) => {
    Swal.fire({
      title: "Thank You!",
      html: `<p style="color: #666;">Your generous ${
        isMonthly ? "monthly " : ""
      }donation has been processed. <br/> Transaction ID: <span style="color: #ef4444; font-weight: bold;">${transactionId}</span></p>`,
      icon: "success",
      iconColor: "#10B981",
      position: "center",
      confirmButtonText: "Great!",
      confirmButtonColor: "#1D3658",
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        title: "text-2xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton:
          "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
      },
    });

    setSelectedAmount(null);
    setCustomAmount("");
    setShowDonationForm(false);
    setShowPayment(false);
    refetch();
  };

  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-rose-500",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Fundraising Hero Banner */}
      <div className="relative bg-[#0F172A] text-white py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column: Content */}
              <div className="space-y-10 py-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                    <span className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                      Be a Hero
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                    Fuel the <span className="text-red-500">Lifeline</span> of
                    Our Community
                  </h1>

                  <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                    Your heroism provides the vital infrastructure that powers
                    every connection between those who give and those in need.
                  </p>
                </div>

                {/* Integrated Impact Stats Grid */}
                <div className="grid grid-cols-3 gap-6 p-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/5 to-red-600/0 -translate-x-100% group-hover:translate-x-100% transition-transform duration-1000"></div>
                  {[
                    {
                      label: "Lives Touched",
                      val: stats.totalDonations
                        ? `${stats.totalDonations.toLocaleString()}+`
                        : "0+",
                      icon: FaUsers,
                    },
                    {
                      label: "Active Donors",
                      val: stats.totalDonors
                        ? `${stats.totalDonors.toLocaleString()}+`
                        : "0+",
                      icon: FaHeart,
                    },
                    { label: "Systems Ready", val: "24/7", icon: FaClock },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center lg:text-left relative z-10"
                    >
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-2 text-red-500">
                        <stat.icon className="text-xs" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                          {stat.label}
                        </span>
                      </div>
                      <div className="text-2xl font-bold tracking-tight">
                        {stat.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="relative lg:h-[600px]">
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                  <div className="row-span-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 relative group">
                    <img
                      src={donate3}
                      alt="Mission"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 relative group">
                    <img
                      src={donate2}
                      alt="Support"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 relative group">
                    <img
                      src={donate1}
                      alt="Impact"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Funding History */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 px-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                  Recent Contributions
                </h2>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                  LIVE UPDATES
                </div>
              </div>

              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:block bg-white/40 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-1.5 mb-6 shadow-sm">
                <div className="grid grid-cols-12 w-full items-center">
                  <div className="col-span-6 px-4">
                    <div className="bg-[#0F172A] text-white rounded-xl px-4 py-2 inline-flex items-center gap-2 shadow-lg shadow-blue-900/10">
                      <FaUsers className="text-[10px] text-red-400" />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Contributors
                      </span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] px-3">
                      Amount
                    </div>
                  </div>
                  <div className="col-span-3 text-right pr-6">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                      Date
                    </div>
                  </div>
                </div>
              </div>

              {/* Donor Rows */}
              <div className="space-y-4">
                {funding.slice(0, 10).map((donation, index) => {
                  const avatarColor = colors[index % colors.length];

                  return (
                    <div
                      key={index}
                      className="md:grid md:grid-cols-12 md:gap-4 px-4 sm:px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-red-100 hover:shadow-xl hover:shadow-red-900/5 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 w-1 h-full bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div
                                className={`w-12 h-12 ${avatarColor} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-inner transition-transform group-hover:scale-110 duration-500 overflow-hidden`}
                              >
                                {donation.image ? (
                                  <img
                                    src={donation.image}
                                    alt={donation.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  donation.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                )}
                              </div>
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                <MdVerified className="text-blue-500 text-sm" />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-800 text-sm tracking-tight group-hover:text-red-600 transition-colors">
                                {donation.name}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                Verified Donor
                              </span>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-[#0F172A] tracking-tight">
                            ${donation.amount}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px] font-bold tracking-tight pl-15">
                          {new Date(donation.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:contents">
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative">
                            <div
                              className={`w-12 h-12 ${avatarColor} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-inner transition-transform group-hover:scale-110 duration-500 overflow-hidden`}
                            >
                              {donation.image ? (
                                <img
                                  src={donation.image}
                                  alt={donation.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                donation.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                              <MdVerified className="text-blue-500 text-sm" />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm tracking-tight group-hover:text-red-600 transition-colors">
                              {donation.name}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              Verified Donor
                            </span>
                          </div>
                        </div>
                        <div className="col-span-3 flex items-center">
                          <span className="text-xl font-bold text-[#0F172A] tracking-tight">
                            ${donation.amount}
                          </span>
                        </div>
                        <div className="col-span-3 flex items-center justify-end pr-2 text-slate-400 text-[11px] font-bold tracking-tight">
                          {new Date(donation.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Summary Hero */}
              <div className="mt-14 relative overflow-hidden bg-[#0F172A] rounded-4xl p-10 text-white shadow-2xl border border-white/5">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-10">
                    <div className="text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full mb-4 border border-white/10">
                        <MdTrendingUp className="text-red-500 text-xs" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                          Platform Momentum
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold mb-3 tracking-tight">
                        Impact Summary
                      </h3>
                      <p className="text-slate-400 text-sm max-w-sm">
                        Joining forces with{" "}
                        {stats.totalDonors
                          ? stats.totalDonors.toLocaleString()
                          : "..."}{" "}
                        heroes to provide critical infrastructure.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center lg:text-left min-w-[240px]">
                      <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">
                        Total Raised
                      </div>
                      <div className="flex items-baseline justify-center lg:justify-start gap-2">
                        <span className="text-4xl font-bold text-white">
                          ${totalRaised.toLocaleString()}
                        </span>
                        <span className="text-red-500 font-bold text-sm">
                          / ${targetAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                          Campaign Progress
                        </span>
                        {isGoalReached && (
                          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[9px] font-black uppercase tracking-tighter text-emerald-400 animate-in zoom-in duration-500">
                            <FaCheckCircle className="text-[10px]" />
                            Campaign Successful
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          isGoalReached ? "text-emerald-400" : "text-red-500"
                        }`}
                      >
                        {progressPercentage}%
                      </span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div
                        className={`h-full ${
                          isGoalReached
                            ? "bg-linear-to-r from-emerald-600 to-amber-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            : "bg-linear-to-r from-red-600 to-red-400"
                        } rounded-full relative transition-all duration-1000`}
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <div className="absolute top-0 right-0 w-4 h-full bg-white/30 blur-sm"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                    <button
                      onClick={() => {
                        const el = document.getElementById("action-sidebar");
                        el?.scrollIntoView({ behavior: "smooth" });
                        setShowDonationForm(true);
                      }}
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-red-900/20"
                    >
                      {isGoalReached ? "Maintain Momentum" : "Maximize Impact"}
                    </button>
                    <p className="text-[11px] text-slate-400 font-medium italic">
                      Tax-deductible contributions supporting{" "}
                      {stats.totalDonations
                        ? `${stats.totalDonations.toLocaleString()}+`
                        : "..."}{" "}
                      lives.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction Sidebar */}
            <div
              className="space-y-6 outline-none focus:outline-none focus:ring-0"
              id="action-sidebar"
            >
              {/* Donate funds button */}
              {!showDonationForm && (
                <button
                  onClick={() => setShowDonationForm(true)}
                  className="w-full py-5 bg-red-600 text-white rounded-3xl font-bold text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl hover:shadow-red-600/20 active:scale-[0.98] flex items-center justify-center gap-3 group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
                >
                  <FaHeart className="text-base group-hover:scale-110 transition-transform" />
                  Donate Funds
                </button>
              )}

              {!showDonationForm ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700 outline-none focus:outline-none focus:ring-0">
                  {/* Your Impact Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <HiSparkles className="text-2xl text-yellow-500" />
                      <h3 className="text-xl font-bold text-slate-900">
                        Your Impact
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Platform Maintenance",
                          desc: "24/7 uptime for critical connections",
                          icon: FaClock,
                        },
                        {
                          title: "Donor Network",
                          desc: "Expand reach to save more lives",
                          icon: FaUsers,
                        },
                        {
                          title: "Emergency Support",
                          desc: "Rapid response for urgent cases",
                          icon: FaHeart,
                        },
                      ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div key={index} className="flex items-start gap-4">
                            <div className="shrink-0 p-2.5 bg-green-50 rounded-xl">
                              <Icon className="text-green-600 text-lg" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm mb-0.5">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
                    <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-4 relative z-10">
                      <FaHeart className="text-2xl" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 relative z-10">
                      100% Transparent
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4 relative z-10">
                      Every dollar directly supports our mission. Full
                      accountability guaranteed.
                    </p>
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-700 relative z-10">
                      <FaShieldAlt className="text-green-400 text-base" />
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                        Verified & Trusted Platform
                      </span>
                    </div>
                  </div>

                  {/* Recognition */}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FaStar className="text-xl text-amber-600" />
                      <h4 className="text-sm font-bold text-amber-900">
                        Donor Recognition
                      </h4>
                    </div>
                    <p className="text-[11px] text-amber-800/80 leading-relaxed">
                      Major donors receive exclusive updates and recognition in
                      our annual impact report.
                    </p>
                  </div>
                </div>
              ) : (
                /* Donation Form within Sidebar */
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-500 outline-none focus:outline-none focus:ring-0">
                  <div className="bg-slate-50/80 p-6 border-b border-slate-200 flex items-center justify-between outline-none focus:outline-none">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-red-600 rounded-lg text-white shadow-lg shadow-red-600/20">
                        <BiDonateHeart className="text-xl" />
                      </div>
                      <h2 className="text-lg font-bold text-slate-800">
                        {showPayment ? "Secure Payment" : "Donation"}
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setShowDonationForm(false);
                        setShowPayment(false);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none"
                    >
                      ×
                    </button>
                  </div>

                  {!showPayment ? (
                    <form onSubmit={handleDonate} className="p-6">
                      <div className="mb-6 bg-slate-100 rounded-xl p-1 flex">
                        <button
                          type="button"
                          onClick={() => setIsMonthly(false)}
                          className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-all outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                            !isMonthly
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-500"
                          }`}
                        >
                          One-Time
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsMonthly(true)}
                          className={`flex-1 py-2.5 rounded-lg font-bold text-xs transition-all outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${
                            isMonthly
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-500"
                          }`}
                        >
                          Monthly
                        </button>
                      </div>

                      <div className="mb-6">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                          Choose Amount
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {predefinedAmounts.map((item) => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => handleAmountSelect(item.value)}
                              className={`py-3 rounded-xl border font-bold text-sm transition-all outline-none focus:outline-none focus:ring-0 active:outline-none focus-visible:outline-none ${
                                selectedAmount === item.value
                                  ? "border-red-600 bg-red-50 text-red-600"
                                  : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                              }`}
                            >
                              ${item.value}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Custom Amount
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <MdAttachMoney className="text-xl" />
                          </div>
                          <input
                            type="text"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            placeholder="0.00"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:border-red-600 focus:bg-white focus:ring-0 transition-all shadow-inner outline-none active:outline-none focus-visible:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!selectedAmount && !customAmount}
                        className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-red-600/10 active:scale-95 text-xs uppercase tracking-widest outline-none focus:outline-none focus:ring-0 active:outline-none focus-visible:outline-none"
                      >
                        Proceed to Pay ${getFinalAmount() || "0"}
                      </button>
                    </form>
                  ) : (
                    <div className="p-6">
                      <Elements stripe={stripePromise}>
                        <CheckoutForm
                          price={getFinalAmount()}
                          onCancel={() => setShowPayment(false)}
                          onSuccess={handlePaymentSuccess}
                        />
                      </Elements>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateMoney;
