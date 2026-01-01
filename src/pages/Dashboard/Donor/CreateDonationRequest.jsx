import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import AddDonationRequestForm from "../../../components/Form/AddDonationRequestForm";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import DonationRequestSkeleton from "./components/DonationRequestSkeleton";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const CreateDonationRequest = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch User Status from DB
  const { data: dbUser, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data;
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const isBlocked = dbUser?.status === "blocked";
  const isLoading = authLoading || userLoading || submitting;

  const onSubmit = async (data) => {
    if (isBlocked) {
      Swal.fire({
        title: "Access Denied",
        text: "You are blocked and cannot create donation requests.",
        icon: "error",
        iconColor: "#DC2626",
        position: "center",
        confirmButtonText: "Okay",
        confirmButtonColor: "#1D3658",
        customClass: {
          popup: "rounded-3xl shadow-2xl",
          title: "text-2xl font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton:
            "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
        },
      });
      return;
    }

    setSubmitting(true);
    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      requesterImage: user?.photoURL,
      requesterRole: dbUser?.role,
      recipientName: data.recipientName,
      recipientDistrict: data.recipientDistrict,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      bloodType: data.bloodType,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      donationStatus: "pending",
    };

    try {
      const response = await axiosSecure.post(
        "/donation-requests",
        requestData
      );
      if (response.data.insertedId) {
        Swal.fire({
          title: "Request Created Successfully!",
          text: "Your donation request has been submitted.",
          icon: "success",
          iconColor: "#10B981",
          position: "center",
          confirmButtonText: "Great!",
          confirmButtonColor: "#1D3658",
          timer: 2000,
          customClass: {
            popup: "rounded-3xl shadow-2xl",
            title: "text-2xl font-bold text-gray-900",
            htmlContainer: "text-gray-600",
            confirmButton:
              "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
          },
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong!",
        icon: "error",
        iconColor: "#DC2626",
        position: "center",
        confirmButtonText: "Okay",
        confirmButtonColor: "#1D3658",
        customClass: {
          popup: "rounded-3xl shadow-2xl",
          title: "text-2xl font-bold text-gray-900",
          htmlContainer: "text-gray-600",
          confirmButton:
            "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || userLoading) return <DonationRequestSkeleton />; // Use original loading check for skeleton

  return (
    <div className="min-h-screen bg-[#F8F9FD] relative py-12 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden selection:bg-red-500/30">
      <div className="max-w-5xl mx-auto relative z-10 animate-fade-in-up">
        <div className="text-center mb-12 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50/50 backdrop-blur-md border border-red-100/50 shadow-sm mb-6 ring-1 ring-red-50/50">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] font-bold tracking-wider text-red-600 uppercase">
              Vein – the flow of life
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            New <span className="text-red-600">Blood Donation</span> Request
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed font-medium">
            Precision matters. Complete the form below to activate our donor
            network instantly.
          </p>
        </div>
        {/* Card */}
        <div className="bg-white/60 backdrop-blur-2xl backdrop-saturate-150 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-white/60 relative overflow-hidden ring-1 ring-black/5">
          {/* Decorative Top Highlight */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-red-600 opacity-80"></div>

          <div className="p-8 sm:p-12 relative">
            <AddDonationRequestForm
              onSubmit={onSubmit}
              user={user}
              loading={isLoading}
              isBlocked={isBlocked}
            />
          </div>
        </div>

        {/* Footer Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <VscWorkspaceTrusted className="text-green-600" />
          <p className="text-xs font-medium text-slate-400">
            Secure & Verified Request System
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
