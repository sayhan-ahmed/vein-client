import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import AddDonationRequestForm from "../../../components/Form/AddDonationRequestForm";


const AddDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateRequest = async (data) => {
    setLoading(true);

    // Merge Form Data with User Data & Status
    const requestData = {
      ...data, // includes recipient info, bloodGroup, AND the new bloodType
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      requesterImage: user?.photoURL,
      donationStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const { data: responseData } = await axiosSecure.post(
        "/donation-request",
        requestData
      );

      if (responseData.insertedId) {
        toast.success("Donation request added successfully!");
        navigate("/dashboard/my-donation-requests");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-12">
      <div className="flex flex-col max-w-4xl p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 shadow-xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Create Donation Request</h1>
          <p className="text-sm text-gray-600 mt-2">
            Fill out the details below to request blood for a patient.
          </p>
        </div>

        <AddDonationRequestForm
          onSubmit={handleCreateRequest}
          user={user}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddDonationRequest;
