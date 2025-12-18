import { FaCamera, FaTint, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit, MdCancel } from "react-icons/md";

const ProfileHeader = ({
  userData,
  user,
  isEditing,
  handleEditToggle,
  isOwnProfile,
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/50 relative overflow-hidden group">
      {isOwnProfile && (
        <div className="absolute top-0 right-0 p-6 z-20">
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

      <div className="absolute top-0 left-0 w-full h-32 bg-[#1D3557]/20 flex items-center justify-center"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 mt-4">
        <div className="relative group/avatar">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-100 relative">
            <img
              src={userData?.image || user?.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-[2px] cursor-pointer">
                <FaCamera className="text-white text-3xl drop-shadow-md" />
              </div>
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
              <FaMapMarkerAlt className="text-xs" /> {userData?.upazila},{" "}
              {userData?.district}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
