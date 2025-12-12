import React, { useState, useEffect } from "react";
import districtsData from "../../assets/data/districts.json";
import upazilasData from "../../assets/data/upazilas.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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
          {hasSearched && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  Search Results
                  <span className="badge badge-lg bg-red-100 text-red-600 border-none font-bold">
                    {searchResults.length}
                  </span>
                </h2>

                {/* Optional sorting or view toggle could go here */}
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                  <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-red-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((donor) => (
                    <div
                      key={donor._id || donor.id}
                      className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 transition-all duration-300"
                    >
                      {/* Card Header with Blood Group Badge */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-gray-50 group-hover:ring-red-50 transition-all">
                            <img
                              src={donor.image}
                              alt={donor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                            <div
                              className={`badge badge-lg font-bold border-none text-white ${
                                donor.bloodGroup.includes("+")
                                  ? "bg-red-500"
                                  : "bg-rose-500"
                              }`}
                            >
                              {donor.bloodGroup}
                            </div>
                          </div>
                        </div>

                        <button className="btn btn-circle btn-sm btn-ghost hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                          {donor.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 mr-1 text-gray-400"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.004.003.001a.75.75 0 01-.01-.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {donor.upazila}, {donor.district}
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {donor.email}
                        </p>
                      </div>

                      {/* Card Actions */}
                      <button className="btn btn-outline btn-error w-full rounded-xl hover:shadow-lg transition-all group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600">
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
