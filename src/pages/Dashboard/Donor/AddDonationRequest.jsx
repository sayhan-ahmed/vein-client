import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import AddDonationRequestForm from "../../../components/Form/AddDonationRequestForm";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Shared/Loader";

const AddDonationRequest = () => {
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

  const isBlocked = dbUser?.status === "blocked";
  const loading = authLoading || userLoading;

  const onSubmit = async (data) => {
    if (isBlocked) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are blocked and cannot create donation requests.",
      });
      return;
    }

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
          position: "top-end",
          icon: "success",
          title: "Request Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create Donation Request
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <AddDonationRequestForm
          onSubmit={onSubmit}
          user={user}
          loading={loading}
          isBlocked={isBlocked}
        />
      </div>
    </div>
  );
};

export default AddDonationRequest;
