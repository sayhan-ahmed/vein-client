import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { BiDonateHeart } from "react-icons/bi";
import { LiaDonateSolid } from "react-icons/lia";
import { FiLogIn, FiHome } from "react-icons/fi";
import { CiWarning } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <section>
        <h2 className="flex justify-center bg-[#1D3557] text-xs md:text-sm text-white py-2">
          You don't need to be a doctor to save a life!
        </h2>
      </section>
      <div className="sticky top-0 z-50 transition-all bg-white backdrop-blur-md shadow-xl py-2">
        <Container>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            {/* Logo - Always on Left */}
            <Link to="/" className="flex items-center">
              <h1 className="text-5xl font-extrabold cursor-pointer text-red-600 -mt-2.5 py-2">
                <span className="text-[#1D3557] text-3xl">Vein</span>.
              </h1>
            </Link>

            {/* Right Side Container (Desktop Links + Actions + User Menu) */}
            <div className="flex items-center ml-auto gap-3 md:gap-4 lg:gap-6">
              {/* Desktop Links */}
              <div className="hidden md:flex flex-row gap-2 lg:gap-4 font-medium items-center text-sm lg:text-base text-gray-600">
                {/* Home */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-red-50/80 text-red-500 font-bold"
                        : "hover:bg-red-50 hover:text-red-500"
                    }`
                  }
                >
                  <FiHome className="text-base lg:text-lg" />
                  <span>Home</span>
                </NavLink>

                {/* Donation Requests */}
                <NavLink
                  to="/donation-requests"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-red-50/80 text-red-500 font-bold"
                        : "hover:bg-red-50 hover:text-red-500"
                    }`
                  }
                >
                  <BiDonateHeart className="text-base lg:text-lg" />
                  <span>Donation Requests</span>
                </NavLink>

                {/* Funding (Logged In) */}
                {user && (
                  <NavLink
                    to="/funding"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-red-50/80 text-red-500 font-bold"
                          : "hover:bg-red-50 hover:text-red-500"
                      }`
                    }
                  >
                    <LiaDonateSolid className="text-base lg:text-lg" />
                    <span>Funding</span>
                  </NavLink>
                )}

                {/* Emergency (Logged In) - Red Button */}
                {user && (
                  <Link
                    to="/search"
                    className="flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm font-semibold"
                  >
                    <CiWarning className="text-lg" />
                    <span>Emergency</span>
                  </Link>
                )}

                {/* Bell Icon */}
                <div className="flex items-center text-xl text-gray-600">
                  {user && (
                    <FaRegBell className="cursor-pointer hover:text-red-700 hover:scale-110 transition" />
                  )}
                </div>

                {/* Login (Logged Out) */}
                {!user && !loading && (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition shadow-sm font-semibold"
                  >
                    <FiLogIn className="text-lg" />
                    <span>Login</span>
                  </Link>
                )}
              </div>

              {/* User Menu / Dropdown Toggle */}
              <div className="relative" ref={dropdownRef}>
                {/* Loading */}
                {loading && (
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse border border-gray-300"></div>
                )}
                {/* User Avatar */}
                {user && !loading && (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer transition hover:scale-105 duration-200"
                  >
                    <img
                      className="w-12 h-12 rounded-full ring-2 ring-red-200 hover:ring-red-300 p-0.5 object-cover transition"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="40"
                      width="40"
                    />
                  </div>
                )}

                {/* Mobile Menu Icon - Only show when NOT logged in */}
                {!user && !loading && (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden cursor-pointer p-2"
                  >
                    <AiOutlineMenu className="text-2xl" />
                  </div>
                )}

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute rounded-xl shadow-xl w-[300px] bg-white backdrop-blur-xl overflow-hidden right-0 top-14 text-sm text-gray-700 z-50 border border-gray-100/50">
                    {/* Dropdown Header */}
                    {user && (
                      <div className="p-4 border-b border-gray-200/50 bg-gray-50/30">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {user.displayName}
                        </h3>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    )}

                    <div className="flex flex-col cursor-pointer py-2">
                      {/* Mobile Only Links */}
                      <div className="md:hidden">
                        <Link
                          to="/"
                          className="px-4 py-3 text-[#333333] hover:bg-gray-50/50 transition flex items-center gap-3"
                          onClick={() => setIsOpen(false)}
                        >
                          <FiHome className="text-lg" /> Home
                        </Link>
                        <Link
                          to="/donation-requests"
                          className="px-4 py-3 hover:bg-gray-50/50 transition flex items-center gap-3"
                          onClick={() => setIsOpen(false)}
                        >
                          <BiDonateHeart className="text-lg" /> Donation
                          Requests
                        </Link>
                        {!user && (
                          <Link
                            to="/login"
                            className="px-4 py-3 hover:bg-gray-50/50 transition flex items-center gap-3 text-red-600 font-semibold"
                            onClick={() => setIsOpen(false)}
                          >
                            <FiLogIn className="text-lg" /> Login
                          </Link>
                        )}
                      </div>

                      {/* Authenticated User Options */}
                      {user && (
                        <>
                          <Link
                            to="/dashboard"
                            className="px-4 py-3 hover:bg-indigo-50/50 hover:text-red-600 transition font-medium flex items-center gap-3"
                            onClick={() => setIsOpen(false)}
                          >
                            <RxDashboard className="text-lg" />
                            Dashboard
                          </Link>
                          <div
                            onClick={() => {
                              logOut();
                              setIsOpen(false);
                            }}
                            className="px-4 py-3 hover:bg-indigo-50/50 hover:text-red-500 transition font-medium cursor-pointer flex items-center gap-3"
                          >
                            <LuLogOut className="text-lg" />
                            Sign out
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
