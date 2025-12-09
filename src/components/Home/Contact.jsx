import React, { useState } from "react";
import Container from "../Shared/Container";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMail, IoTimeOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success alert
    Swal.fire({
      title: "Message Sent Successfully!",
      html: `<p style="color: #666;">Thank you <strong>${formData.name}</strong> for reaching out. We'll get back to you soon at <strong>${formData.email}</strong></p>`,
      icon: "success",
      iconColor: "#E53935",
      confirmButtonText: "Great!",
      confirmButtonColor: "#E53935",
      background: "#fff",
      customClass: {
        popup: "rounded-2xl",
        title: "text-2xl font-bold",
        confirmButton: "px-6 py-3 rounded-lg font-semibold",
      },
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const locations = [
    {
      city: "Dhaka",
      area: "Mirpur",
      address: "Road 10, Mirpur, Dhaka, Bangladesh - 1216",
      phone: "(+880) 1234 567 890",
      email: "dhaka@vein.com",
    },
    {
      city: "Dhaka",
      area: "Uttara",
      address: "Sector 7, Uttara, Dhaka, Bangladesh - 1230",
      phone: "(+880) 1234 567 891",
      email: "uttara@vein.com",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#16273E] mb-4 uppercase">Leave us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />

              {/* Subject */}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                required
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all hover:-translate-y-1 duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 my-4">
                Get in Touch With <span className="text-red-600">Our Team</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Have questions or need assistance? We're here to help. Reach out
                to us and our dedicated team will respond to your inquiry as
                soon as possible.
              </p>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Opening Hours
              </h3>
              <div className="flex items-center justify-between text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Sunday - Saturday</span>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <IoTimeOutline className="text-xl" />
                  <span className="font-semibold">08:00 AM - 15:00 PM</span>
                </div>
              </div>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {location.area}, {location.city}
                  </h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <FaLocationDot className="text-red-600 mt-1 shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-red-600 shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <IoMail className="text-red-600 text-lg shrink-0" />
                      <span>{location.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
