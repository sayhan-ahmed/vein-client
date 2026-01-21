import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaUserEdit,
  FaMapMarkerAlt,
  FaBuilding,
  FaTint,
  FaNotesMedical,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import districtsData from "../../assets/data/districts.json";
import upazilasData from "../../assets/data/upazilas.json";

// ================= [ DONATION REQUEST FORM ] ================= //
const AddDonationRequestForm = ({
  onSubmit,
  user,
  loading,
  isBlocked,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    // Load Districts
    if (districtsData && districtsData[2] && districtsData[2].data) {
      setDistricts(districtsData[2].data);
    }
  }, []);

  // Pre-select district for edit mode
  useEffect(() => {
    if (initialData?.recipientDistrict && districts.length > 0) {
      const dist = districts.find(
        (d) => d.name === initialData.recipientDistrict,
      );
      if (dist) setSelectedDistrict(dist.id);
    }
  }, [initialData, districts]);

  // > [ Sync ]: Filters Upazilas based on selected District.
  useEffect(() => {
    if (selectedDistrict) {
      const allUpazilas = upazilasData[2]?.data || [];
      const filteredUpazilas = allUpazilas.filter(
        (upazila) => upazila.district_id === selectedDistrict,
      );
      setUpazilas(filteredUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setValue(
      "recipientDistrict",
      e.target.options[e.target.selectedIndex].text,
    );
    setValue("recipientUpazila", "");
  };

  if (isBlocked) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg text-center">
        <h3 className="text-xl font-bold text-red-600 mb-2">
          Access Restricted
        </h3>
        <p className="text-gray-700">
          Your account has been blocked. You cannot create new donation
          requests.
        </p>
        <p className="text-gray-500 text-xs mt-5">
          Please contact the{" "}
          <a
            href="mailto:admin@vein.com"
            className="font-semibold hover:text-red-600 hover:underline transition-colors"
          >
            admin
          </a>{" "}
          for more information.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Section 1: Requester Info */}
      <div
        className="group animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold ring-2 ring-blue-50/50">
            1
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Requester Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Name
            </label>
            <div className="relative group/input">
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-500 font-medium shadow-sm cursor-not-allowed"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                <FaUser />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <div className="relative group/input">
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-500 font-medium shadow-sm cursor-not-allowed"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                <FaUserEdit />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Recipient Details */}
      <div
        className="group animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-sm font-bold ring-2 ring-rose-50/50">
            2
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Recipient Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Recipient Name
            </label>
            <div className="relative group/input transition-all duration-300 focus-within:scale-[1.01]">
              <input
                type="text"
                placeholder="Patient's Full Name"
                {...register("recipientName", {
                  required: "Recipient Name is required",
                })}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300 outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-rose-500 transition-colors">
                <FaUser />
              </div>
            </div>
            {errors.recipientName && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.recipientName.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Blood Group
              </label>
              <div className="relative group/input">
                <select
                  {...register("bloodGroup", { required: "Required" })}
                  className="w-full pl-9 pr-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-bold text-slate-800 outline-none appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500">
                  <FaTint />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">
                  ▼
                </div>
              </div>
              {errors.bloodGroup && (
                <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                  {errors.bloodGroup.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Blood Type
              </label>
              <div className="relative group/input">
                <select
                  {...register("bloodType", { required: "Required" })}
                  className="w-full pl-9 pr-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-bold text-slate-800 outline-none appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">Select</option>
                  {[
                    "Whole Blood",
                    "Platelets",
                    "Plasma",
                    "Red Blood Cells",
                  ].map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-500">
                  <FaNotesMedical />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">
                  ▼
                </div>
              </div>
              {errors.bloodType && (
                <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                  {errors.bloodType.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              District
            </label>
            <div className="relative group/input">
              <select
                onChange={handleDistrictChange}
                value={selectedDistrict}
                required
                className="w-full pl-9 pr-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-semibold text-slate-800 outline-none appearance-none cursor-pointer shadow-sm"
              >
                <option value="">Select Local District</option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </select>
              <input
                type="hidden"
                {...register("recipientDistrict", {
                  required: "District is required",
                })}
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-rose-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">
                ▼
              </div>
            </div>
            {errors.recipientDistrict && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.recipientDistrict.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Upazila
            </label>
            <div className="relative group/input">
              <select
                {...register("recipientUpazila", {
                  required: "Upazila is required",
                })}
                className="w-full pl-9 pr-8 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-semibold text-slate-800 outline-none appearance-none cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
                disabled={!selectedDistrict}
              >
                <option value="">Select Area</option>
                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.name}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-rose-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">
                ▼
              </div>
            </div>
            {errors.recipientUpazila && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.recipientUpazila.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5 col-span-1 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Hospital
            </label>
            <div className="relative group/input">
              <input
                type="text"
                placeholder="e.g., Dhaka Medical College"
                {...register("hospitalName", {
                  required: "Hospital Name is required",
                })}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300 outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-rose-500 transition-colors">
                <FaBuilding />
              </div>
            </div>
            {errors.hospitalName && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.hospitalName.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5 col-span-1 md:col-span-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Full Address
            </label>
            <div className="relative group/input">
              <input
                type="text"
                placeholder="Detailed address (Road, House, Floor etc.)"
                {...register("fullAddress", {
                  required: "Address is required",
                })}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all font-semibold text-slate-800 placeholder:text-slate-300 outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-rose-500 transition-colors">
                <FaMapMarkerAlt />
              </div>
            </div>
            {errors.fullAddress && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.fullAddress.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: Donation Logistics */}
      <div
        className="group animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold ring-2 ring-emerald-50/50">
            3
          </div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            Donation Logistics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl border border-emerald-100/50 bg-emerald-50/30">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Date
            </label>
            <div className="relative group/input">
              <input
                type="date"
                {...register("donationDate", { required: "Date is required" })}
                min={new Date().toISOString().split("T")[0]}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-800 outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                <FaCalendarAlt />
              </div>
            </div>
            {errors.donationDate && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.donationDate.message}
              </span>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Time
            </label>
            <div className="relative group/input">
              <input
                type="time"
                {...register("donationTime", { required: "Time is required" })}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-800 outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                <FaClock />
              </div>
            </div>
            {errors.donationTime && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.donationTime.message}
              </span>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 space-y-1.5 pt-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Why is this request urgent?
            </label>
            <textarea
              placeholder="Tell us the story. Detailed requests get donors 2x faster."
              rows="4"
              {...register("requestMessage", {
                required: "Message is required",
              })}
              className="w-full px-6 py-4 rounded-xl bg-white border border-white shadow-sm hover:border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none outline-none"
            ></textarea>
            {errors.requestMessage && (
              <span className="text-rose-500 text-[10px] font-bold ml-1 uppercase tracking-wide">
                {errors.requestMessage.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className="pt-6 animate-fade-in-up"
        style={{ animationDelay: "400ms" }}
      >
        <button
          type="submit"
          disabled={loading}
          className="relative w-full py-6 overflow-hidden group rounded-xl shadow-lg shadow-red-600/20 transition-all hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-red-600 group-hover:bg-red-700 transition-colors duration-300">
            {loading ? (
              <span className="flex items-center gap-2">
                <ImSpinner9 className="animate-spin text-xl" />
                <span>{initialData ? "Updating..." : "Processing..."}</span>
              </span>
            ) : (
              <>
                <span>{initialData ? "Update Request" : "Submit Request"}</span>
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

export default AddDonationRequestForm;
