import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";

export default function AllDonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosPublic.get("/donation-requests");
        // Filter for pending status
        const pendingRequests = res.data.filter(
          (req) => req.donationStatus === "pending"
        );
        setRequests(pendingRequests);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Donation Requests
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Urgent blood donation requests. Be a hero today.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No pending requests
            </h3>
            <p className="text-gray-500">
              Currently there are no pending blood donation requests.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <div
                key={request._id || request.id}
                className="bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {request.recipientName}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-red-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.004.003.001a.75.75 0 01-.01-.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {request.recipientUpazila}, {request.recipientDistrict}
                      </p>
                    </div>
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 font-bold shadow-sm">
                      {request.bloodGroup}
                    </span>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="text-sm text-gray-600 flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Date:</span>
                      <span>{request.donationDate}</span>
                    </div>
                    <div className="text-sm text-gray-600 flex justify-between border-b border-gray-100 pb-2">
                      <span className="font-medium">Time:</span>
                      <span>{request.donationTime}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4">
                  <Link
                    to={`/donation-requests/${request._id || request.id}`}
                    className="w-full btn btn-error text-white rounded-xl hover:bg-red-700 border-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
