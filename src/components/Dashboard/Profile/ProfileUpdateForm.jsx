import { FaUserEdit, FaEnvelope, FaTint, FaMapMarkerAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { MdSave } from "react-icons/md";

const ProfileUpdateForm = ({
  isEditing,
  loading,
  uploading,
  register,
  handleSubmit,
  onSubmit,
  errors,
  districts,
  upazilas,
  selectedDistrict,
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative h-fit">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaUserEdit className="text-red-500" /> Personal Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Full Name
          </label>
          <input
            type="text"
            disabled={!isEditing}
            {...register("name", { required: "Name is required" })}
            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 font-semibold focus:outline-none transition-all ${
              isEditing
                ? "focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-sm"
                : "opacity-70 cursor-not-allowed"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              disabled={true}
              {...register("email")}
              className="w-full px-4 py-3 pl-10 rounded-xl bg-gray-50/50 border border-gray-100 text-sm text-gray-500 font-medium cursor-not-allowed focus:outline-none"
            />
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Blood Group
          </label>
          <div className="relative">
            <select
              disabled={!isEditing}
              {...register("blood_group", {
                required: "Required",
              })}
              className={`w-full px-4 py-3 pl-10 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 font-semibold focus:outline-none appearance-none transition-all ${
                isEditing
                  ? "cursor-pointer focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-sm"
                  : "opacity-70 cursor-not-allowed"
              }`}
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            <FaTint
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-xs transition-colors ${
                isEditing ? "text-red-500" : "text-gray-300"
              }`}
            />
          </div>
        </div>

        {isEditing && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-dashed border-gray-300 text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              District
            </label>
            <div className="relative">
              <select
                disabled={!isEditing}
                {...register("district", { required: "Required" })}
                className={`w-full px-3 py-3 pl-8 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 font-semibold focus:outline-none appearance-none transition-all ${
                  isEditing
                    ? "cursor-pointer focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-sm"
                    : "opacity-70 cursor-not-allowed"
                }`}
              >
                <option value="">Select</option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {dist.name}
                  </option>
                ))}
              </select>
              <FaMapMarkerAlt
                className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs transition-colors ${
                  isEditing ? "text-blue-500" : "text-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Upazila
            </label>
            <div className="relative">
              <select
                disabled={!isEditing || !selectedDistrict}
                {...register("upazila", { required: "Required" })}
                className={`w-full px-3 py-3 pl-8 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700 font-semibold focus:outline-none appearance-none transition-all ${
                  isEditing
                    ? "cursor-pointer focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 shadow-sm"
                    : "opacity-70 cursor-not-allowed"
                }`}
              >
                <option value="">Select</option>
                {upazilas.map((up) => (
                  <option key={up.id} value={up.id}>
                    {up.name}
                  </option>
                ))}
              </select>
              <FaMapMarkerAlt
                className={`absolute left-3 top-1/2 -translate-y-1/2 text-xs transition-colors ${
                  isEditing ? "text-green-500" : "text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="pt-4 animate-fade-in-up">
            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full px-6 py-3.5 bg-[#1D3557] text-white rounded-xl font-bold text-sm tracking-wide shadow-xl shadow-blue-900/20 hover:bg-[#2a4d7d] hover:shadow-blue-900/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              {loading || uploading ? (
                <ImSpinner9 className="animate-spin text-lg" />
              ) : (
                <>
                  <MdSave className="text-xl" /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
