import React, { useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaSyringe } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import Container from "../Shared/Container";

const Featured = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");

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

  const compatibility = selectedBloodType
    ? compatibilityMap[selectedBloodType]
    : null;

  return (
    <section className="py-20 bg-linear-to-b from-red-50/50 to-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-4">
            <MdBloodtype className="text-red-500 text-xl" />
            <span className="text-red-600 font-semibold text-sm uppercase">
              Interactive Tool
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Who Can You <span className="text-red-600">Save?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Select your blood type and discover who you can help. Every donation
            counts!
          </p>
        </div>

        {/* Interactive Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto justify-center">
          {/* Left Side: Blood Type Selector */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col justify-center">
            <label className="block text-2xl font-bold text-gray-900 mb-4">
              I have blood type:
            </label>
            <div className="relative">
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="w-full px-6 py-4 pr-12 text-base font-semibold text-gray-500 bg-red-50/50 border border-red-200 rounded-xl focus:border-red-500 transition-all outline-none cursor-pointer appearance-none"
              >
                <option value="">Select</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <IoChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-xl pointer-events-none" />
            </div>

            {selectedBloodType && (
              <div className="mt-6 p-4 bg-linear-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
                <p className="text-sm text-gray-600 mb-2">Your Selection:</p>
                <div className="flex items-center gap-2">
                  <MdBloodtype className="text-3xl text-red-500" />
                  <span className="text-3xl font-extrabold text-[#1a498b]">
                    {selectedBloodType}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Compatibility Cards */}
          <div className="space-y-6 flex flex-col justify-center">
            {!selectedBloodType ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
                <MdBloodtype className="text-6xl text-red-500 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Select your blood type to see who you can help
                </p>
              </div>
            ) : (
              <>
                {/* Can Donate To */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in h-2/3 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-px">
                    <BiSolidDonateBlood className="text-red-600" size={24} />{" "}
                    You can Donate to:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {compatibility.canDonateTo.map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg font-bold shadow-md hover:scale-105 transition-transform"
                      >
                        <MdBloodtype className="text-xl" />
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in h-2/3 flex flex-col justify-center"
                  style={{ animationDelay: "0.1s" }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-1">
                    <FaSyringe className="text-blue-600" size={21} /> You can
                    Receive from:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {compatibility.canReceiveFrom.map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#1a498b] to-[#153d74] text-white rounded-lg font-bold shadow-md hover:scale-105 transition-transform"
                      >
                        <MdBloodtype className="text-xl" />
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Educational Note */}
        {selectedBloodType && (
          <div className="mt-12 max-w-4xl mx-auto bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <div className="text-center text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <HiOutlineLightBulb size={24} className="-mt-1 text-red-600" />
                <span className="font-bold text-red-600">
                  Did you know?
                </span>{" "}
                {selectedBloodType === "O-"
                  ? "You're a universal donor! Your blood can save anyone in an emergency."
                  : selectedBloodType === "AB+"
                  ? "You're a universal recipient! You can receive blood from any type."
                  : `As ${selectedBloodType}, you can help ${compatibility.canDonateTo.length} blood types.`}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Featured;
