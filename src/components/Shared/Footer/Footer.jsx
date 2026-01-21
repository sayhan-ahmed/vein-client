import React, { useState } from "react";
import Container from "../Container";
import { Link } from "react-router";
import Swal from "sweetalert2";

// ================= [ FOOTER ICONS ] ================= //
import { IoMail, IoWaterOutline } from "react-icons/io5";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Show success alert with SweetAlert2
    Swal.fire({
      title: "Successfully Subscribed!",
      html: `<p style="color: #666;">Thank you for subscribing to our newsletter with <strong>${email}</strong></p>`,
      icon: "success",
      iconColor: "#10B981",
      position: "center",
      confirmButtonText: "Great!",
      confirmButtonColor: "#1D3658",
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        title: "text-2xl font-bold text-gray-900",
        htmlContainer: "text-gray-600",
        confirmButton:
          "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
      },
    });

    setEmail("");
  };

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-[#16273e] text-white pt-16 pb-6 font-sans">
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <img
                src="https://i.postimg.cc/yxz0WknP/pngtree-hand-holding-red-blood-drop-clipart-png-image-13364982.png"
                alt="website logo"
                className="w-12 h-12"
              />
              <h1 className="text-4xl font-bold">Vein.</h1>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting donors with those in need. Vein is a secure platform
              dedicated to making blood donation efficient, transparent, and
              accessible for everyone.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="pl-0 lg:pl-10">
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="hover:text-red-500 transition-all hover:scale-105 duration-300 flex items-center gap-2"
                  >
                    <span className="text-red-500">›</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <FaPhone className="mt-0.5" />
                <span>+880 123 456789</span>
              </li>
              <li className="flex items-start gap-2">
                <IoMail size={18} className="mt-px" />
                <span>vein@support.com</span>
              </li>
              <li className="flex items-start gap-2">
                <FaLocationDot size={18} />
                <span>456 Anywhere St, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to Our Newsletter to receive the newest updates and
              info.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#2a2a2a] text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-md transition-all hover:-translate-y-1 duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { Icon: FaInstagram, href: "#" },
              { Icon: FaFacebookF, href: "#" },
              { Icon: FaXTwitter, href: "#" },
              { Icon: FaYoutube, href: "#" },
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="bg-red-600 hover:bg-red-700 w-9 h-9 flex items-center justify-center rounded transition-all hover:-translate-y-1 duration-300"
              >
                <Icon className="text-white text-base" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            Copyright © 2025 Vein, All rights reserved. Present by{" "}
            <Link to="https://sayhan-portfolio.vercel.app/" target="_blank">
              <span className="font-bold text-white hover:text-red-500 transition-colors duration-300">
                Sayhan Ahmed
              </span>
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
