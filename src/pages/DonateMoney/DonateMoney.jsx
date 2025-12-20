import { useState } from "react";
import {
  FaHandHoldingHeart,
  FaCheckCircle,
  FaHeart,
  FaShieldAlt,
  FaUsers,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import donate1 from "../../assets/images/donate1.jpeg";
import donate2 from "../../assets/images/donate2.jpg";
import donate3 from "../../assets/images/donate3.jpg";

const DonateMoney = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);

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

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      Swal.fire({
        title: "Thank You!",
        html: `<p style="color: #666;">Your generous ${
          isMonthly ? "monthly " : ""
        }donation of <strong>$${amount}</strong> will help save lives. Thank you for your support!</p>`,
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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Simple, Clean Hero Banner */}
      <div className="relative bg-[#1D3658] text-white py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-block px-4 py-2 bg-red-600 rounded-full mb-6">
                  <span className="text-sm font-bold uppercase tracking-wide">
                    Support Our Cause
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                  Every Contribution Saves Lives
                </h1>

                <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                  Your donation helps us connect blood donors with those in
                  urgent need.
                </p>

                <a
                  href="#donation-form"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <FaHeart />
                  <span>DONATE NOW</span>
                </a>
              </div>

              {/* Right: Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 h-64 rounded-2xl overflow-hidden">
                  <img
                    src={donate1}
                    alt="Donation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src={donate2}
                    alt="Support"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-2xl overflow-hidden">
                  <img
                    src={donate3}
                    alt="Impact"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Form - 2 columns */}
            <div className="lg:col-span-2" id="donation-form">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200">
                {/* Form Header */}
                <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-red-600 rounded-xl">
                      <BiDonateHeart className="text-2xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                        Choose Your Contribution
                      </h2>
                      <p className="text-slate-600 text-sm mt-1">
                        Select an amount or enter your own
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleDonate} className="p-6 md:p-8">
                  {/* Frequency Toggle */}
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-slate-100 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => setIsMonthly(false)}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                          !isMonthly
                            ? "bg-white text-slate-900 shadow-md"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMonthly(true)}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${
                          isMonthly
                            ? "bg-white text-slate-900 shadow-md"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Monthly
                        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          2x Impact
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Amount Cards */}
                  <div className="mb-8">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {predefinedAmounts.map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => handleAmountSelect(item.value)}
                          className={`relative p-5 rounded-2xl border-2 transition-all ${
                            selectedAmount === item.value
                              ? "border-red-600 bg-red-50 shadow-lg scale-105"
                              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                          }`}
                        >
                          {selectedAmount === item.value && (
                            <div className="absolute top-2 right-2">
                              <FaCheckCircle className="text-red-600 text-lg" />
                            </div>
                          )}
                          <div
                            className={`text-3xl font-black mb-2 ${
                              selectedAmount === item.value
                                ? "text-red-600"
                                : "text-slate-900"
                            }`}
                          >
                            ${item.value}
                          </div>
                          <div
                            className={`text-xs font-bold uppercase mb-1 ${
                              selectedAmount === item.value
                                ? "text-red-700"
                                : "text-slate-600"
                            }`}
                          >
                            {item.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.impact}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-xs font-bold text-slate-500 uppercase">
                        Or Enter Custom
                      </span>
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <MdAttachMoney className="text-3xl text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter amount"
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={
                      isProcessing || (!selectedAmount && !customAmount)
                    }
                    className="w-full py-5 bg-red-600 text-white font-black text-lg rounded-2xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:hover:bg-red-600"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <FaHandHoldingHeart />
                        {isMonthly ? "Start Monthly " : "Donate "}$
                        {getFinalAmount() || "0"}
                      </span>
                    )}
                  </button>

                  {/* Trust Indicators */}
                  <div className="mt-6 flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <FaShieldAlt className="text-green-600" />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <FaStar className="text-yellow-500" />
                      <span className="font-semibold">Tax Deductible</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Impact Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <HiSparkles className="text-2xl text-yellow-500" />
                  <h3 className="text-xl font-black text-slate-900">
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
                      <div key={index} className="flex items-start gap-3">
                        <div className="shrink-0 p-2 bg-green-50 rounded-lg">
                          <Icon className="text-green-600 text-lg" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm mb-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center mb-4">
                  <FaHeart className="text-2xl" />
                </div>
                <h4 className="text-lg font-black mb-2">100% Transparent</h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Every dollar directly supports our mission. Full
                  accountability guaranteed.
                </p>
                <div className="flex items-center gap-2 pt-3 border-t border-slate-700">
                  <FaShieldAlt className="text-green-400 text-lg" />
                  <span className="text-sm font-bold text-slate-300">
                    Verified & Trusted Platform
                  </span>
                </div>
              </div>

              {/* Recognition */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <FaStar className="text-xl text-amber-600" />
                  <h4 className="text-sm font-black text-amber-900">
                    Donor Recognition
                  </h4>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Major donors receive exclusive updates and recognition in our
                  annual impact report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateMoney;
