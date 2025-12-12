import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import DonationModal from "../../components/Modal/DonationModal";
import Loader from "../../components/Shared/Loader";
import {
  FaHospital,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaQuoteLeft,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const res = await axiosSecure.get(`/donation-requests/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error("Failed to fetch request details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequestDetails();
  }, [id, axiosSecure]);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!request) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-9xl mb-4">🔍</div>
          <h2 className="text-3xl font-black text-slate-800">
            Request Not Found
          </h2>
          <p className="text-slate-500 mt-2">
            The donation request you serve looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header / Title Section */}
          <div className="flex justify-between items-center">
            <div className="mb-10 text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
                {request.donationStatus === "pending"
                  ? "Confidently Pending"
                  : request.donationStatus}
              </span>
              <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                Help{" "}
                <span className="text-red-600">{request.recipientName}</span>{" "}
                recover
              </h1>
              <p className="text-slate-500 text-lg font-medium">
                A request for{" "}
                <span className="font-bold text-red-600">
                  {request.bloodGroup}
                </span>{" "}
                blood at {request.hospitalName}
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#1D3657] text-white cursor-pointer px-6 py-2 rounded-full hover:bg-red-600 hover:-translate-x-2 transition-all duration-300 flex items-center gap-2 mb-7"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column: Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Primary Details Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 border border-slate-100 p-8 lg:p-10 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-px mb-6">
                    <MdBloodtype className="text-red-500 text-3xl" />
                    Transfusion Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Blood Group
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-red-500/30">
                          {request.bloodGroup}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg">
                            Urgent
                          </p>
                          <p className="text-xs text-slate-500 font-medium">
                            {request.bloodType}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Hospital
                      </label>
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                          <FaHospital size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">
                            {request.hospitalName}
                          </p>
                          <p className="text-sm text-slate-500 mt-1 font-medium">
                            {request.fullAddress}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Location
                      </label>
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                          <FaMapMarkerAlt size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {request.recipientUpazila}
                          </p>
                          <p className="text-sm text-slate-500 font-medium">
                            {request.recipientDistrict}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Timing
                      </label>
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 shrink-0">
                          <FaCalendarAlt size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {request.donationDate}
                          </p>
                          <p className="text-sm text-slate-500 font-medium">
                            {request.donationTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 border border-slate-100 p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FaQuoteLeft className="text-slate-300" />
                  Request Message
                </h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-slate-600 leading-relaxed font-medium italic">
                    "{request.requestMessage}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-8">
              {/* Requester Profile */}
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 border border-slate-100 p-8 sticky top-32">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                  Requester Details
                </h4>

                <div className="flex items-center gap-4 mb-8">
                  {request.requesterImage ? (
                    <img
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
                      src={request.requesterImage}
                      alt="Requester"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-[#1D3657]">
                      <FaUser size={32} className="text-[#1D3657]" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-[#1D3657]">
                      {request.requesterName}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {request.requesterRole}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="p-2 bg-white rounded-full shadow-sm text-slate-500">
                      <FaEnvelope />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-400 uppercase">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {request.requesterEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => setIsOpen(true)} label="Donate" />

                <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed px-4">
                  By clicking, you verified your eligibility to donate blood on
                  the specified date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <DonationModal
        closeModal={closeModal}
        isOpen={isOpen}
        donationRequest={request}
        userInfo={{}}
      />
    </div>
  );
};

export default DonationRequestDetails;
