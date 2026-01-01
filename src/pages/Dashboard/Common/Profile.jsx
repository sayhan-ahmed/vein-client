import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { imageUpload } from "../../../utils/imageUpload";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Modular Components
import ProfileHeader from "../../../components/Dashboard/Profile/ProfileHeader";
import StatsRow from "../../../components/Dashboard/Profile/StatsRow";
import ActivityChart from "../../../components/Dashboard/Profile/ActivityChart";
import RecentActivity from "../../../components/Dashboard/Profile/RecentActivity";
import ImpactInsights from "../../../components/Dashboard/Profile/ImpactInsights";
import ProfileUpdateForm from "../../../components/Dashboard/Profile/ProfileUpdateForm";
import ProfileSkeleton from "../../../components/Dashboard/Profile/ProfileSkeleton";

// Data
import districtsJson from "../../../assets/data/districts.json";
import upazilasJson from "../../../assets/data/upazilas.json";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Determine which user's profile to view
  const targetEmail = email || user?.email;
  const isOwnProfile = !email || email === user?.email;

  // Location Data States
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch district to filter upazilas
  const selectedDistrict = watch("district");

  // Fetch User Data
  const {
    data: userData,
    refetch,
    isLoading: isDataLoading,
  } = useQuery({
    queryKey: ["userProfile", targetEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${targetEmail}`);
      return res.data;
    },
    enabled: !!targetEmail,
  });

  // Fetch All Donation Requests for Stats
  const { data: allRequests = [], isLoading: isStatsLoading } = useQuery({
    queryKey: ["all-donation-requests-for-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Calculate Real Stats
  const myDonations = allRequests.filter(
    (req) => req.donorEmail === targetEmail && req.donationStatus === "done"
  );

  const myRequests = allRequests.filter(
    (req) => req.requesterEmail === targetEmail
  );

  const totalDonations = myDonations.length;
  const totalRequests = myRequests.length;
  const impactScore = totalDonations * 15 + totalRequests * 5;

  // Process Data for Graph
  const processActivityData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      last6Months.push({
        name: months[d.getMonth()],
        fullDate: d,
        donations: 0,
        requests: 0,
      });
    }

    myDonations.forEach((donation) => {
      const date = new Date(
        donation.donationDate + " " + donation.donationTime
      );
      const finalDate = isNaN(date.getTime())
        ? new Date(donation.donationDate)
        : date;
      if (!isNaN(finalDate.getTime())) {
        const monthName = months[finalDate.getMonth()];
        const match = last6Months.find((m) => m.name === monthName);
        if (match) match.donations += 1;
      }
    });

    myRequests.forEach((req) => {
      const date = new Date(req.donationDate + " " + req.donationTime);
      const finalDate = isNaN(date.getTime())
        ? new Date(req.donationDate)
        : date;
      if (!isNaN(finalDate.getTime())) {
        const monthName = months[finalDate.getMonth()];
        const match = last6Months.find((m) => m.name === monthName);
        if (match) match.requests += 1;
      }
    });

    return last6Months;
  };

  const activityData = processActivityData();

  // Helpers
  const getDistrictIdByName = (name) => {
    const dist = districts.find((d) => d.name === name);
    return dist ? dist.id : "";
  };

  const getUpazilaIdByName = (name) => {
    const flatUpazilas = upazilasJson[2]?.data || [];
    const up = flatUpazilas.find((u) => u.name === name);
    return up ? up.id : "";
  };

  // Initialize Data when loaded
  useEffect(() => {
    if (userData && !isEditing) {
      reset({
        name: userData.name,
        email: userData.email,
        blood_group: userData.bloodGroup,
        district: getDistrictIdByName(userData.district),
        upazila: getUpazilaIdByName(userData.upazila),
        image: null,
      });
    }
  }, [userData, reset, districts, isEditing]);

  // Load Districts
  useEffect(() => {
    if (districtsJson[2] && districtsJson[2].data) {
      setDistricts(
        districtsJson[2].data.sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  }, []);

  // Filter Upazilas
  useEffect(() => {
    if (selectedDistrict && upazilasJson[2] && upazilasJson[2].data) {
      const filtered = upazilasJson[2].data.filter(
        (up) => up.district_id === selectedDistrict
      );
      setUpazilas(filtered.sort((a, b) => a.name.localeCompare(b.name)));
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = userData.image;
      if (data.image && data.image.length > 0) {
        setUploading(true);
        try {
          imageUrl = await imageUpload(data.image[0]);
        } catch (err) {
          toast.error("Image upload failed");
          setLoading(false);
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      const districtName = districts.find((d) => d.id === data.district)?.name;
      const upazilaName = upazilas.find((u) => u.id === data.upazila)?.name;

      const updatedInfo = {
        name: data.name,
        image: imageUrl,
        bloodGroup: data.blood_group,
        district: districtName,
        upazila: upazilaName,
      };

      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedInfo);
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        await updateUserProfile(data.name, imageUrl);
        refetch();
        setIsEditing(false);
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully.",
          icon: "success",
          iconColor: "#10B981",
          position: "center",
          confirmButtonText: "Great!",
          confirmButtonColor: "#1D3658",
          customClass: {
            popup: "rounded-3xl shadow-2xl",
            title: "text-2xl font-bold text-gray-900",
            htmlContainer: "text-gray-600",
            confirmButton:
              "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
          },
        });
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      reset({
        name: userData.name,
        email: userData.email,
        blood_group: userData.bloodGroup,
        district: getDistrictIdByName(userData.district),
        upazila: getUpazilaIdByName(userData.upazila),
        image: null,
      });
    }
    setIsEditing(!isEditing);
  };

  if (isDataLoading || isStatsLoading) return <ProfileSkeleton />;

  return (
    <div className="font-sans text-gray-900 w-full p-2 sm:p-4 pb-20">
      <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8">
        <ProfileHeader
          userData={userData}
          user={user}
          isEditing={isEditing}
          handleEditToggle={handleEditToggle}
          isOwnProfile={isOwnProfile}
          handleImageChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              setValue("image", [file]);
              setImagePreview(URL.createObjectURL(file));
              toast.success("Image uploaded! Click Save to apply.");
            }
          }}
          loading={loading}
          uploading={uploading}
          imagePreview={imagePreview}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Right Column  */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <ProfileUpdateForm
              isEditing={isEditing}
              loading={loading}
              uploading={uploading}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              districts={districts}
              upazilas={upazilas}
              selectedDistrict={selectedDistrict}
            />
            {/* Impact Insights */}
            <ImpactInsights myDonations={myDonations} />
          </div>

          {/* Left Column */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-6 md:space-y-8">
            <StatsRow
              totalDonations={totalDonations}
              totalRequests={totalRequests}
              impactScore={impactScore}
            />

            <ActivityChart activityData={activityData} />

            <RecentActivity myDonations={myDonations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
