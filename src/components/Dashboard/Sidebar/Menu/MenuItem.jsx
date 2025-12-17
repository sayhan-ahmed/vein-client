import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-3 mx-3 my-1 rounded-xl transition-all duration-300 group ${
          isActive
            ? "bg-red-600 text-white shadow-lg shadow-red-600/20 font-bold"
            : "text-gray-400 hover:text-white hover:bg-white/5 font-medium"
        }`
      }
    >
      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110`} />
      <span className="mx-4 text-sm tracking-wide">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
