import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import AddDonationRequestForm from "../../../components/Form/AddDonationRequestForm";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Shared/Loader";

const UpdateDonationRequest = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch Request Data
  const {
    data: requestData,
    isLoading: dataLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-requests/${id}`);
      return data;
    },
  });

  const onSubmit = async (data) => {
    const updateData = {
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
    };

    try {
      const response = await axiosSecure.patch(
        `/donation-requests/${id}`,
        updateData
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Request Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        navigate("/dashboard/my-donation-requests");
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "You did not make any changes to the request.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong!",
      });
    }
  };

  if (dataLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Update Donation Request
      </h2>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <AddDonationRequestForm
          onSubmit={onSubmit}
          user={user}
          loading={false}
          isBlocked={false}
          initialData={requestData}
        />
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
