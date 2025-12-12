import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";
import Loader from "../../components/Shared/Loader";
import districtsData from "../../assets/data/districts.json";
import upazilasData from "../../assets/data/upazilas.json";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { TbAlertCircle } from "react-icons/tb";
import { FaLongArrowAltRight } from "react-icons/fa";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AllDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterUpazila, setFilterUpazila] = useState("");

  const axiosPublic = useAxiosPublic();

  // Extract districts
  const districts = districtsData[2]?.data || [];

  // Filter upazilas based on selected district
  const availableUpazilas =
    upazilasData[2]?.data.filter((u) => {
      const district = districts.find((d) => d.name === filterDistrict);
      return district && u.district_id === district.id;
    }) || [];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosPublic.get("/donation-requests");
        const pendingRequests = res.data.filter(
          (req) => req.donationStatus === "pending"
        );
        setRequests(pendingRequests);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosPublic]);

  const filteredRequests = requests.filter((request) => {
    const matchesBlood = filterBloodGroup
      ? request.bloodGroup === filterBloodGroup
      : true;
    const matchesDistrict = filterDistrict
      ? request.recipientDistrict === filterDistrict
      : true;
    const matchesUpazila = filterUpazila
      ? request.recipientUpazila === filterUpazila
      : true;
    return matchesBlood && matchesDistrict && matchesUpazila;
  });

  const handleFilterChange = (setter, value) => {
    setFilterLoading(true);
    setter(value);

    // Simulate network delay for effect
    setTimeout(() => {
      setFilterLoading(false);
    }, 1000);
  };

  const handleDistrictChange = (e) => {
    setFilterLoading(true);
    setFilterDistrict(e.target.value);
    setFilterUpazila("");
    setTimeout(() => setFilterLoading(false), 1000);
  };

  const resetFilters = () => {
    setFilterLoading(true);
    setFilterBloodGroup("");
    setFilterDistrict("");
    setFilterUpazila("");
    setTimeout(() => setFilterLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-100 selection:text-red-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30 transition-all duration-300">
        <div className="container mx-auto px-6 py-6 lg:py-8">
          <h1 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">
            Donation{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-rose-500">
              Requests
            </span>
          </h1>
          <p className="mt-2 text-slate-500 font-medium text-lg max-w-2xl">
            Connect with lives in need. Your contribution can start a new
            chapter.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-4xl shadow-xl shadow-slate-200 p-8 sticky top-32 border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-slate-800 text-xl tracking-tight">
                  Filters
                </h3>
                {(filterBloodGroup || filterDistrict || filterUpazila) && (
                  <button
                    onClick={resetFilters}
                    className="text-sm font-semibold text-rose-500 hover:text-rose-700 transition-colors uppercase tracking-wide text-[0.7rem]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {/* Blood Group Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">
                    Blood Group
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {bloodGroups.map((bg) => (
                      <button
                        key={bg}
                        onClick={() =>
                          handleFilterChange(
                            setFilterBloodGroup,
                            filterBloodGroup === bg ? "" : bg
                          )
                        }
                        className={`w-10 h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                          filterBloodGroup === bg
                            ? "bg-linear-to-tr from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-500 ring-offset-2"
                            : "bg-slate-50 text-slate-600 hover:bg-white hover:shadow-md border border-slate-100"
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>

                {/* Refined Select Inputs */}
                <div className="space-y-5">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      District
                    </label>
                    <div className="relative">
                      <select
                        value={filterDistrict}
                        onChange={handleDistrictChange}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 pr-10 appearance-none transition-all hover:bg-white hover:shadow-sm cursor-pointer font-medium"
                      >
                        <option value="">All Districts</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <IoMdArrowDropdown />
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                      Upazila
                    </label>
                    <div className="relative">
                      <select
                        value={filterUpazila}
                        onChange={(e) =>
                          handleFilterChange(setFilterUpazila, e.target.value)
                        }
                        disabled={!filterDistrict}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-3 pr-10 appearance-none transition-all hover:bg-white hover:shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        <option value="">All Upazilas</option>
                        {availableUpazilas.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                        <IoMdArrowDropdown />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="lg:w-3/4">
            <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-500 font-medium pl-2">
                Found{" "}
                <span className="text-slate-900 font-extrabold text-lg mx-1">
                  {filteredRequests.length}
                </span>{" "}
                pending requests
              </p>
              <div className="hidden sm:flex space-x-2">
                {/* Decorative dots to balance the UI */}
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-rose-300"></div>
                <div className="w-2 h-2 rounded-full bg-rose-200"></div>
              </div>
            </div>

            {loading || filterLoading ? (
              <div className="flex justify-center items-center py-20 min-h-[400px]">
                <Loader />
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-center">
                <div className="bg-linear-to-br from-red-50 to-white w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-md shadow-red-100 border border-red-100">
                  <TbAlertCircle size={60} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">
                  No Requests Found
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Try adjusting your filters to see more results. Every search
                  counts.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-8 px-6 py-2.5 rounded-full bg-[#1D3658] text-white text-sm font-bold hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg shadow-slate-900/20"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredRequests.map((request) => (
                  <div
                    key={request._id || request.id}
                    className="group bg-white rounded-4xl p-6 hover:-translate-y-1 transition-all duration-300 border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-red-100 relative overflow-hidden flex flex-col"
                  >
                    {/* Soft Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-red-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Header */}
                    <div className="relative flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[0.65rem] font-bold uppercase tracking-wider group-hover:bg-red-50 transition-colors">
                          Recipient
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-red-600 transition-colors line-clamp-1">
                          {request.recipientName}
                        </h3>
                      </div>

                      {/* Blood Group Drop */}
                      <div className="relative group/drop">
                        <div className="absolute inset-0 bg-red-200 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div
                          className={`w-12 h-12 rounded-2xl rotate-45 flex items-center justify-center shadow-inner relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                            request.bloodGroup.includes("+")
                              ? "bg-linear-to-br from-red-500 to-rose-600"
                              : "bg-linear-to-br from-rose-500 to-pink-600"
                          }`}
                        >
                          <span className="-rotate-45 text-white font-black text-sm">
                            {request.bloodGroup}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Info Block */}
                    <div className="relative space-y-4 mb-8 flex-1">
                      <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <div className="p-2 rounded-full bg-white shadow-sm shrink-0 text-red-500">
                          <FaLocationDot />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            Location
                          </p>
                          <p className="text-sm font-semibold text-slate-700 line-clamp-1">
                            {request.recipientUpazila},{" "}
                            {request.recipientDistrict}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/50 group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                        <div className="p-2 rounded-full bg-white shadow-sm shrink-0 text-red-500">
                          <FaClock />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            Time & Date
                          </p>
                          <p className="text-sm font-semibold text-slate-700">
                            {request.donationDate} • {request.donationTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="relative mt-auto">
                      <Link
                        to={`/donation-requests/${request._id || request.id}`}
                        className="w-full relative overflow-hidden group/btn flex items-center justify-center py-4 rounded-xl bg-[#1D3657] text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-red-500/20 hover:scale-[1.02]"
                      >
                        <div className="absolute inset-0 w-full h-full bg-linear-to-r from-red-600 to-rose-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2">
                          View Full Details
                          <FaLongArrowAltRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
