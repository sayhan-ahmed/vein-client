import React, { useState, useEffect } from "react";
import districtsData from "../../assets/data/districts.json";
import upazilasData from "../../assets/data/upazilas.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loader from "../../components/Shared/Loader";
import { LuUserSearch } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchPage = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  // Extract districts from JSON structure
  const districts = districtsData[2]?.data || [];

  // Filter upazilas based on selected district
  const availableUpazilas =
    upazilasData[2]?.data.filter((u) => {
      const district = districts.find((d) => d.name === selectedDistrict);
      return district && u.district_id === district.id;
    }) || [];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      // Fetch donors from backend
      const response = await axiosPublic.get("/donors");
      const allDonors = response.data;

      // Filter on client
      const results = allDonors.filter((donor) => {
        const matchBlood =
          !selectedBloodGroup || donor.bloodGroup === selectedBloodGroup;
        const matchDistrict =
          !selectedDistrict || donor.district === selectedDistrict;
        const matchUpazila =
          !selectedUpazila || donor.upazila === selectedUpazila;

        return matchBlood && matchDistrict && matchUpazila;
      });

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching donors:", error);
      // Fallback or empty logic
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 pt-12 pb-20">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Find Your <span className="text-red-600">Life Saver</span>
          </h1>
          <p className="text-lg text-[#1D3657] max-w-xl mx-auto font-medium">
            Search our verified database of blood donors. Every drop counts, and
            finding the right donor has never been easier.
          </p>
        </div>

        {/* Search Bar - Floating Card */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 -mt-4 mb-16 max-w-5xl mx-auto border border-gray-100 relative z-10">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
          >
            {/* Blood Group */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                Blood Group
              </label>
              <select
                className="select select-bordered w-full bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
              >
                <option value="">Any Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Group */}
            <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* District */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                  District
                </label>
                <select
                  className="select select-bordered w-full bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedUpazila("");
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 px-1">
                  Upazila
                </label>
                <select
                  className="select select-bordered w-full bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  disabled={!selectedDistrict}
                >
                  <option value="">Any Upazila</option>
                  {availableUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <label className="hidden md:block text-xs font-bold text-transparent mb-1">
                Action
              </label>
              <button
                type="submit"
                className="btn bg-red-600 hover:bg-red-700 text-white w-full border-none rounded-xl h-11 shadow-md shadow-red-200"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Find Donors"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          ) : (
            hasSearched && (
              <div className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    Search Results
                    <span className="badge badge-lg bg-red-100 text-red-600 border-none font-bold">
                      {searchResults.length}
                    </span>
                  </h2>
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200  ">
                      <LuUserSearch size={36} className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No donors found
                    </h3>
                    <p className="text-gray-500">
                      We couldn't find any donors matching your criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedBloodGroup("");
                        setSelectedDistrict("");
                        setSelectedUpazila("");
                        setSearchResults([]);
                        setHasSearched(false);
                      }}
                      className="btn btn-link text-red-600 no-underline hover:text-red-700 mt-2"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Donor List */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                              Donor
                            </th>
                            <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                              Blood Group
                            </th>
                            <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                              Location
                            </th>
                            <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                              Contact
                            </th>
                            <th className="py-5 px-6 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {searchResults.map((donor) => (
                            <tr
                              key={donor._id || donor.id}
                              className="group hover:bg-red-50/30 transition-colors duration-300"
                            >
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-100 group-hover:shadow-md transition-all">
                                    <img
                                      src={donor.image}
                                      alt={donor.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-slate-800 text-base group-hover:text-red-700 transition-colors">
                                      {donor.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 capitalize">
                                      {donor.role}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`inline-flex items-center justify-center px-4 py-1 rounded-4xl text-xs font-black shadow-sm ${
                                    donor.bloodGroup.includes("+")
                                      ? "bg-red-100 text-red-600 border border-red-200"
                                      : "bg-indigo-100 text-indigo-600 border border-indigo-200"
                                  }`}
                                >
                                  {donor.bloodGroup}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-slate-700">
                                    {donor.district}
                                  </span>
                                  <span className="text-xs text-slate-400 font-medium">
                                    {donor.upazila}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className="text-sm font-medium text-slate-500 py-1">
                                  {donor.email}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg shadow-slate-900/10 hover:bg-red-600 hover:shadow-red-600/20 active:scale-95 transition-all duration-300">
                                  View Profile
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {/* Initial State Placeholder */}
          {!hasSearched && (
            <div className="text-center py-10 opacity-60">
              <p className="text-gray-400">
                Select your criteria above to find blood donors in your area.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
