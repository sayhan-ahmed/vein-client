// ================= [ HOME DONATION REQUESTS ] ================= //
// > Live feed of urgent blood needs for the landing page.
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaArrowRight,
  FaHospital,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { TbUrgent } from "react-icons/tb";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../Shared/Container";
import Loader from "../Shared/Loader";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Fetching all requests to modify on client as "pending" limit 6 for Home
        // Ideally backend should support pagination/filtering
        const res = await axiosPublic.get("/donation-requests");
        const pendingRequests = res.data
          .filter((req) => req.donationStatus === "pending")
          .sort((a, b) => {
            // Sort by createdAt in descending order (latest first)
            const dateA = new Date(a.createdAt || a.date || 0);
            const dateB = new Date(b.createdAt || b.date || 0);
            return dateB - dateA;
          })
          .slice(0, 6);
        setRequests(pendingRequests);
      } catch (error) {
        console.error("Failed to fetch donation requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] py-24">
        <Loader />
      </div>
    );
  }

  // Removed early return to always show component

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[100px]" />
      </div>

      <Container>
        <div className="relative z-10 mb-16 text-center max-w-2xl mx-auto">
          <span className="inline-flex justify-center items-center py-1 px-3 rounded-full bg-red-100 text-red-600 text-sm font-bold uppercase tracking-wider mb-4 border border-red-200">
            <TbUrgent size={20} className="mb-1 mr-1" /> Urgent Needs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            Critical <span className="text-red-600">Donation</span> Requests
          </h2>
          <p className="text-slate-500 text-lg">
            These warriors need your help immediately. Your donation can save a
            life today.
          </p>
        </div>

        {requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {requests.map((req) => (
              <div
                key={req._id}
                className="group relative bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden"
              >
                {/* Card Gradient Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-100 rounded-3xl transition-colors pointer-events-none" />

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-500">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-1">
                        {req.recipientName}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        {req.recipientDistrict}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <FaHospital />
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-snug line-clamp-1">
                      {req.hospitalName}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <FaClock />
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-snug">
                      {req.donationDate} • {req.donationTime}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-400">
                      <FaMapMarkerAlt />
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-snug line-clamp-1">
                      {req.fullAddress}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/donation-requests/${req._id}`}
                  className="inline-flex items-center justify-between w-full px-5 py-3 bg-slate-50 hover:bg-[#1D3657] text-slate-700 hover:text-white rounded-xl font-bold transition-all duration-300 group/btn"
                >
                  <span>View Details</span>
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-slate-100 relative z-10 max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-4xl">
              <MdBloodtype />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              All Clear!
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              There are currently no urgent pending requests. The community is
              safe and healthy thanks to donors like you!
            </p>
          </div>
        )}

        <div className="mt-16 text-center relative z-10">
          <Link
            to="/donation-requests"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1D3657] text-white rounded-full font-bold hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-600/30 transform hover:-translate-y-1"
          >
            View All Pending Requests
            <FaArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default DonationRequests;
