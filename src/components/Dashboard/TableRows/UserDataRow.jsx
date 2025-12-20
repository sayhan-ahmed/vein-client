import { Link } from "react-router";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import {
  FaEllipsisV,
  FaUserEdit,
  FaUserSlash,
  FaUserCheck,
  FaUserShield,
  FaUserGraduate,
  FaEye,
} from "react-icons/fa";

const UserDataRow = ({ user, handleUpdate }) => {
  const { _id, image, name, email, role, status, createdAt } = user;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return (
          <span className="bg-red-50 text-red-600 border border-red-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Admin
          </span>
        );
      case "volunteer":
        return (
          <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Volunteer
          </span>
        );
      default:
        return (
          <span className="bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Donor
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 w-fit mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">
          Active
        </span>
      </div>
    ) : (
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 w-fit mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
        <span className="text-[10px] font-black text-red-700 uppercase tracking-widest">
          Blocked
        </span>
      </div>
    );
  };

  return (
    <>
      {/* Desktop View */}
      <tr className="hidden md:table-row hover:bg-slate-50/50 transition-colors duration-200">
        <td className="px-8 py-5">
          <div className="flex items-center gap-4 group/item">
            <Link
              to={`/dashboard/profile/${email}`}
              className="relative shrink-0 block"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-sm group-hover/item:shadow-md transition-all duration-300 bg-slate-100 flex items-center justify-center relative">
                <img
                  src={image || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  <FaEye className="text-white text-xs" />
                </div>
              </div>
              {status === "active" && (
                <div
                  className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"
                  title="Active User"
                ></div>
              )}
            </Link>
            <div className="flex flex-col min-w-0">
              <Link
                to={`/dashboard/profile/${email}`}
                className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1 hover:text-red-600 group-hover/item:text-red-600 transition-colors block"
              >
                {name}
              </Link>
              <span className="text-xs font-bold text-slate-400 lowercase">
                {email}
              </span>
            </div>
          </div>
        </td>

        <td className="px-3 sm:px-6 py-5 text-center">{getRoleBadge(role)}</td>

        <td className="px-3 sm:px-6 py-5 text-center">
          {getStatusBadge(status)}
        </td>

        <td className="px-3 sm:px-6 py-5 text-center">
          <span className="text-xs font-black text-slate-700 tracking-tight">
            {formatDate(createdAt)}
          </span>
        </td>

        <td className="px-8 py-5 text-right">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 hover:shadow-sm transition-all active:scale-90">
              <FaEllipsisV size={14} />
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 mt-2 w-52 origin-top-right divide-y divide-slate-50 rounded-2xl bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden">
                <div className="px-1.5 py-1.5">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleUpdate(
                            _id,
                            {
                              status:
                                status === "active" ? "blocked" : "active",
                            },
                            status === "active" ? "blocked" : "active"
                          )
                        }
                        className={`${
                          active
                            ? "bg-slate-50 text-slate-900"
                            : "text-slate-600"
                        } group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors`}
                      >
                        {status === "active" ? (
                          <>
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500">
                              <FaUserSlash size={12} />
                            </div>
                            Block User
                          </>
                        ) : (
                          <>
                            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-green-50 text-green-500">
                              <FaUserCheck size={12} />
                            </div>
                            Unblock User
                          </>
                        )}
                      </button>
                    )}
                  </MenuItem>
                </div>

                <div className="px-1.5 py-1.5">
                  <MenuItem disabled={role === "volunteer"}>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleUpdate(_id, { role: "volunteer" }, "role")
                        }
                        disabled={role === "volunteer"}
                        className={`${
                          active
                            ? "bg-slate-50 text-slate-900"
                            : "text-slate-600"
                        } ${
                          role === "volunteer"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        } group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors`}
                      >
                        <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                          <FaUserGraduate size={12} />
                        </div>
                        Make Volunteer
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem disabled={role === "admin"}>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          handleUpdate(_id, { role: "admin" }, "role")
                        }
                        disabled={role === "admin"}
                        className={`${
                          active
                            ? "bg-slate-50 text-slate-900"
                            : "text-slate-600"
                        } ${
                          role === "admin"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        } group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors`}
                      >
                        <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-600">
                          <FaUserShield size={12} />
                        </div>
                        Make Admin
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </td>
      </tr>

      {/* Mobile View: Premium Card */}
      <tr className="md:hidden">
        <td colSpan="5" className="px-4 py-4">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between group/card">
              <div className="flex items-center gap-4">
                <Link
                  to={`/dashboard/profile/${email}`}
                  className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-slate-50 shadow-sm block shrink-0 relative"
                >
                  <img
                    src={image || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <FaEye className="text-white text-lg" />
                  </div>
                </Link>
                <div className="min-w-0">
                  <Link to={`/dashboard/profile/${email}`}>
                    <h4 className="font-black text-slate-800 truncate leading-tight tracking-tight hover:text-red-600 group-hover/card:text-red-600 transition-colors">
                      {name}
                    </h4>
                  </Link>
                  <p className="text-[11px] text-slate-400 font-bold lowercase truncate">
                    {email}
                  </p>
                </div>
              </div>
              <div className="text-right">{getRoleBadge(role)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-black mb-1">
                  Status
                </p>
                <div className="flex justify-start transform -translate-x-3 scale-90 origin-left">
                  {getStatusBadge(status)}
                </div>
              </div>
              <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-black mb-1">
                  Joined
                </p>
                <p className="font-black text-slate-700 text-xs">
                  {formatDate(createdAt)}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() =>
                  handleUpdate(
                    _id,
                    { status: status === "active" ? "blocked" : "active" },
                    status === "active" ? "blocked" : "active"
                  )
                }
                className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-tight sm:tracking-widest shadow-sm active:scale-95 transition-all ${
                  status === "active"
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-green-50 text-green-700 border border-green-100"
                }`}
              >
                {status === "active" ? "Block" : "Unblock"}
              </button>

              <div className="relative group">
                <Menu as="div" className="relative">
                  <MenuButton className="w-12 h-11 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100 transition-all active:scale-95 shadow-sm">
                    <FaEllipsisV size={14} />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 bottom-full mb-2 w-52 origin-bottom-right divide-y divide-slate-50 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden">
                      <div className="px-1.5 py-1.5">
                        <MenuItem disabled={role === "volunteer"}>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                handleUpdate(_id, { role: "volunteer" }, "role")
                              }
                              disabled={role === "volunteer"}
                              className={`${
                                active ? "bg-slate-50" : ""
                              } group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-black text-slate-600`}
                            >
                              Make Volunteer
                            </button>
                          )}
                        </MenuItem>
                        <MenuItem disabled={role === "admin"}>
                          {({ active }) => (
                            <button
                              onClick={() =>
                                handleUpdate(_id, { role: "admin" }, "role")
                              }
                              disabled={role === "admin"}
                              className={`${
                                active ? "bg-slate-50" : ""
                              } group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-black text-slate-600`}
                            >
                              Make Admin
                            </button>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserDataRow;
