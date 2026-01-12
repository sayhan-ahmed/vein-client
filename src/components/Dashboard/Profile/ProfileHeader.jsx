import {
  FaCamera,
  FaTint,
  FaUser,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { MdEdit, MdCancel, MdSave } from "react-icons/md";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ProfileHeader = ({
  userData,
  user,
  isEditing,
  handleEditToggle,
  isOwnProfile,
  handleImageChange,
  loading,
  uploading,
  imagePreview,
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/50 relative overflow-hidden group">
      {isOwnProfile && (
        <div className="absolute top-0 right-0 p-4 sm:p-6 z-20 flex gap-2">
          {isEditing && (
            <button
              type="submit"
              form="profile-update-form"
              disabled={loading || uploading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 bg-[#1D3557] text-white hover:bg-[#2a4d7d] hover:shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <MdSave size={16} /> Save
            </button>
          )}

          <button
            onClick={handleEditToggle}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 ${
              isEditing
                ? "bg-red-50 text-red-600 hover:bg-red-100 ring-1 ring-red-200"
                : "bg-[#1D3557] text-white hover:bg-[#2a4d7d] hover:shadow-blue-900/20"
            }`}
          >
            {isEditing ? (
              <>
                <MdCancel size={18} /> Cancel
              </>
            ) : (
              <>
                <MdEdit size={16} /> Edit Profile
              </>
            )}
          </button>
        </div>
      )}

      {/* Enhanced Cover Photo Area - Lottie Heartbeat Animation */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-gray-50 to-white overflow-hidden">
        {/* Blood Drop Pattern Background - Asymmetric Scatter */}
        <div className="absolute inset-0 opacity-6">
          {/* Left side - 3 drops */}
          <FaTint
            className="absolute"
            style={{
              top: "70%",
              left: "30%",
              fontSize: "2.5rem",
              color: "#ef4444",
              transform: "rotate(-18deg)",
            }}
          />
          <FaTint
            className="absolute"
            style={{
              top: "10%",
              left: "20%",
              fontSize: "3rem",
              color: "#dc2626",
              transform: "rotate(25deg)",
            }}
          />
          <FaTint
            className="absolute"
            style={{
              top: "15%",
              left: "1%",
              fontSize: "2rem",
              color: "#f87171",
              transform: "rotate(-15deg)",
            }}
          />

          {/* Right side - 4 drops */}
          <FaTint
            className="absolute"
            style={{
              top: "30%",
              right: "30%",
              fontSize: "3rem",
              color: "#fca5a5",
              transform: "rotate(-29deg)",
            }}
          />
          <FaTint
            className="absolute"
            style={{
              top: "70%",
              right: "20%",
              fontSize: "2rem",
              color: "#ef4444",
              transform: "rotate(29deg)",
            }}
          />
          <FaTint
            className="absolute"
            style={{
              top: "10%",
              right: "5%",
              fontSize: "5rem",
              color: "#dc2626",
              transform: "rotate(15deg)",
            }}
          />
          <FaTint
            className="absolute"
            style={{
              top: "82%",
              right: "0%",
              fontSize: "1.75rem",
              color: "#f87171",
              transform: "rotate(-30deg)",
            }}
          />
        </div>

        {/* Lottie Heartbeat Animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <DotLottieReact
            src="https://lottie.host/137fb528-dafe-4c6e-8841-bb0480bc3752/yIGulyJqXs.lottie"
            loop
            autoplay
            className="w-full h-full object-cover"
          />
        </div>

        {/* Pulsing Heart Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <FaHeart className="text-8xl text-red-500 animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 mt-12 md:mt-14 lg:mt-5">
        <div className="relative group/avatar">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-100 relative">
            <img
              src={
                imagePreview ||
                userData?.image ||
                user?.photoURL ||
                "https://freesvg.org/img/1389952697.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://freesvg.org/img/1389952697.png";
              }}
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  id="profile-image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-[2px] cursor-pointer"
                >
                  <FaCamera className="text-white text-3xl drop-shadow-md" />
                </label>
              </>
            )}
          </div>
          <div
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-green-500 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-white shadow-sm"
            title="Active"
          ></div>
        </div>

        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight mb-2">
            {userData?.name || user?.displayName}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
              <FaUser className="text-xs" /> {userData?.role?.toUpperCase()}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full">
              <FaTint className="text-xs" /> {userData?.bloodGroup || "N/A"}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              <FaMapMarkerAlt className="text-xs" />{" "}
              {userData?.upazila && userData?.district
                ? `${userData.upazila}, ${userData.district}`
                : userData?.district || userData?.upazila || "Location N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
