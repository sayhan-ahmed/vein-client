import React from "react";
import Container from "../Container";
import {
  MdOutlineWaterDrop,
  MdPhone,
  MdEmail,
  MdLocationOn,
} from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#192f4b] text-white pt-20 pb-10 font-sans">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <MdOutlineWaterDrop className="text-5xl text-red-500" />
              <h1 className="text-4xl font-bold">Vein.</h1>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting donors with those in need. Vein is a secure platform
              dedicated to making blood donation efficient, transparent, and
              accessible for everyone.
            </p>
            <div className="flex gap-3 pt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-[#faeeee] hover:bg-orange-700 w-10 h-10 flex items-center justify-center rounded-md transition-colors duration-300 text-white"
                  >
                    <Icon className="text-lg text-red-600" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              Contact Info
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MdEmail className="text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">
                    Email:
                  </h4>
                  <p className="text-white text-sm font-medium">
                    support@vein.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdPhone className="text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">
                    Hotline:
                  </h4>
                  <p className="text-white text-sm font-medium">
                    000 - 123 - 456789
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdLocationOn className="text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">
                    Address:
                  </h4>
                  <p className="text-white text-sm font-medium leading-snug">
                    No: 58 A, East Madison Street, Baltimore, MD, USA 4508
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              Services
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {[
                "Donation Requests",
                "Become a Volunteer",
                "Host a Blood Drive",
                "Regional Centers",
                "Volunteer Program",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {[
                "Home",
                "Blog",
                "About Us",
                "Testimonials",
                "Donation Requests",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: More Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase">
              More Links
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {[
                "FAQs",
                "Donate Now",
                "Upcoming Events",
                "Donation Eligibility",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">
            All Right Reserved © 2025 Vein Foundation
          </p>
          <div className="flex items-center gap-1">
            <Link to="/" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span>–</span>
            <Link to="/" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
