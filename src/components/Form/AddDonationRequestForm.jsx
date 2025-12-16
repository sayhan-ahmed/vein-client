import { useForm } from "react-hook-form";

const AddDonationRequestForm = ({ onSubmit, user, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Requester Name (Read Only) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Requester Name</label>
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Requester Email (Read Only) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Requester Email</label>
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Recipient Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            placeholder="Who needs blood?"
            {...register("recipientName", {
              required: "Recipient Name is required",
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.recipientName && (
            <span className="text-red-500 text-sm">
              {errors.recipientName.message}
            </span>
          )}
        </div>

        {/* Blood Group */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Blood Group</label>
          <select
            {...register("bloodGroup", { required: "Blood Group is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && (
            <span className="text-red-500 text-sm">
              {errors.bloodGroup.message}
            </span>
          )}
        </div>

        {/* 🆕 Blood Type (Dropdown) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Blood Type</label>
          <select
            {...register("bloodType", { required: "Blood Type is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          >
            <option value="">Select Blood Type</option>
            <option value="Whole Blood">Whole Blood</option>
            <option value="Platelets">Platelets</option>
            <option value="Plasma">Plasma</option>
            <option value="Red Blood Cells">Red Blood Cells</option>
          </select>
          {errors.bloodType && (
            <span className="text-red-500 text-sm">
              {errors.bloodType.message}
            </span>
          )}
        </div>

        {/* District */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Recipient District
          </label>
          <input
            type="text"
            placeholder="e.g., Dhaka"
            {...register("recipientDistrict", {
              required: "District is required",
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.recipientDistrict && (
            <span className="text-red-500 text-sm">
              {errors.recipientDistrict.message}
            </span>
          )}
        </div>

        {/* Upazila */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Recipient Upazila</label>
          <input
            type="text"
            placeholder="e.g., Mirpur"
            {...register("recipientUpazila", {
              required: "Upazila is required",
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.recipientUpazila && (
            <span className="text-red-500 text-sm">
              {errors.recipientUpazila.message}
            </span>
          )}
        </div>

        {/* Hospital Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Hospital Name</label>
          <input
            type="text"
            placeholder="e.g., Dhaka Medical College"
            {...register("hospitalName", {
              required: "Hospital Name is required",
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.hospitalName && (
            <span className="text-red-500 text-sm">
              {errors.hospitalName.message}
            </span>
          )}
        </div>

        {/* Full Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Full Address Line</label>
          <input
            type="text"
            placeholder="e.g., Ward 4, Bed 12"
            {...register("fullAddress", { required: "Address is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.fullAddress && (
            <span className="text-red-500 text-sm">
              {errors.fullAddress.message}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: "Date is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.donationDate && (
            <span className="text-red-500 text-sm">
              {errors.donationDate.message}
            </span>
          )}
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: "Time is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          />
          {errors.donationTime && (
            <span className="text-red-500 text-sm">
              {errors.donationTime.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="block text-sm font-medium">Request Message</label>
          <textarea
            placeholder="Any specific details? (e.g., Urgent, patient condition)"
            rows="3"
            {...register("requestMessage", { required: "Message is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-red-500 bg-white"
          ></textarea>
          {errors.requestMessage && (
            <span className="text-red-500 text-sm">
              {errors.requestMessage.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 text-center font-medium text-white transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
      >
        {loading ? "Creating Request..." : "Request Donation"}
      </button>
    </form>
  );
};

export default AddDonationRequestForm;
