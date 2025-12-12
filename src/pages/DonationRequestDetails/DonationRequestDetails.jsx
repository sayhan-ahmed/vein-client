import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import DonationModal from "../../components/Modal/DonationModal";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        // Based on the JSON content being served from /donors in other pages,
        // we fetch the specific request from the same resource collection.
        const res = await axiosSecure.get(`/donation-requests/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error("Failed to fetch request details", error);
        // Fallback or error state
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
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  if (!request) {
    return (
      <Container>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-700">
            Request not found
          </h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 pt-10 pb-20">
        {/* Left Side - Details */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-red-600 font-bold text-2xl border-4 border-red-100">
                {request.bloodGroup}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {request.recipientName}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-red-100 text-red-600">
                    Recipient
                  </span>
                  <span className="text-sm">
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white p-2 rounded-lg text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Hospital Details
                  </h4>
                  <p className="text-gray-600">{request.hospitalName}</p>
                  <p className="text-gray-500 text-sm">{request.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white p-2 rounded-lg text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Date & Time</h4>
                  <p className="text-gray-600">
                    {request.donationDate} at {request.donationTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-red-100">
              <h4 className="font-semibold text-gray-900 mb-2">
                Request Message
              </h4>
              <p className="text-gray-600 italic">"{request.requestMessage}"</p>
            </div>
          </div>
        </div>

        {/* Right Side - Action */}
        <div className="md:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Donate Blood
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Status</span>
                <span className="badge badge-warning">
                  {request.donationStatus}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Requester</span>
                <span className="font-medium text-gray-900">
                  {request.requesterName}
                </span>
              </div>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              label="Donate Now"
              customClasses="w-full bg-red-600 hover:bg-red-700 border-none rounded-xl h-12 text-white font-bold shadow-lg shadow-red-200"
            />

            <p className="text-xs text-center text-gray-400 mt-4">
              Your donation can save a life. Please verify your eligibility
              before proceeding.
            </p>
          </div>
        </div>

        <DonationModal
          closeModal={closeModal}
          isOpen={isOpen}
          donationRequest={request}
          userInfo={{}} // Pass authentic user info here if available from auth context
        />
      </div>
    </Container>
  );
};

export default DonationRequestDetails;
