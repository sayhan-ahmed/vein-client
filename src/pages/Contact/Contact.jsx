import Container from "../../components/Shared/Container";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We'll get back to you soon.",
      icon: "success",
      iconColor: "#10B981",
      confirmButtonColor: "#1D3658",
      customClass: {
        popup: "rounded-3xl shadow-2xl",
        title: "text-2xl font-bold",
        confirmButton: "px-6 py-3 rounded-xl font-bold",
      },
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50/30 py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-[#1D3658] mb-6">
            Get in <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {[
              {
                icon: FaPhone,
                title: "Phone",
                content: "+880 123 456789",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: FaEnvelope,
                title: "Email",
                content: "vein@support.com",
                color: "bg-red-100 text-red-600",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Address",
                content: "456 Anywhere St, Dhaka, Bangladesh",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: FaClock,
                title: "Working Hours",
                content: "24/7 Support Available",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <item.icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-[#1D3658] mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.content}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-[#1D3658] mb-6">
                Send us a Message
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
