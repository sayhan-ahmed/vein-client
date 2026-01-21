// ================= [ HOME WHY DONATE ] ================= //
// > Educational and motivational section on donation benefits.
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdBloodtype } from "react-icons/md";
import { FaHeart, FaUserCheck } from "react-icons/fa";
import Container from "../Shared/Container";
import why_donate from "../../assets/images/why-donate.jpg";

const WhyDonate = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stats = {} } = useQuery({
    queryKey: ["public-life-stats"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/public-stats");
      return data;
    },
  });

  const benefits = [
    {
      icon: MdBloodtype,
      title: "Your Blood, Their Second Chance",
      description:
        "Every donation can save up to three lives in critical situations.",
      color: "red",
    },
    {
      icon: FaHeart,
      title: "Urgent Need, Every Day",
      description:
        "Someone needs blood every 2 seconds. Your donation makes a difference.",
      color: "pink",
    },
    {
      icon: FaUserCheck,
      title: "Save Lives in Minutes",
      description:
        "A simple 10-minute donation can give someone years of life.",
      color: "blue",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Image with Overlay Card */}
          <div className="relative h-full">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={why_donate}
                alt="Blood Donation"
                className="w-full h-[500px] lg:h-[700px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Overlay Card */}
            <div className="absolute bottom-2 sm:bottom-6 right-2 sm:right-6 left-2 sm:left-auto bg-white/80 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                {/* Avatar Group */}
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-white">
                    <img
                      src="https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg"
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white">
                    <img
                      src="https://images.pexels.com/photos/5917854/pexels-photo-5917854.jpeg"
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white">
                    <img
                      src="https://images.pexels.com/photos/3793234/pexels-photo-3793234.jpeg"
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white">
                    <img
                      src="https://images.pexels.com/photos/5071528/pexels-photo-5071528.jpeg"
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p className="text-base text-gray-600">Join</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stats.totalDonors
                      ? `${stats.totalDonors.toLocaleString()}+`
                      : "..."}{" "}
                    <span className="text-red-600">heroes</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    and be lifesavers for others
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8">
            {/* Label */}
            <div className="inline-block">
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Why Donate?
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              The Life You Save Could Be Someone{" "}
              <span className="text-red-600">You Love</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Blood donation is a simple act that creates extraordinary impact.
              Every donation helps patients fighting cancer, undergoing surgery,
              or recovering from accidents. Your contribution ensures that
              life-saving blood is available when seconds count.
            </p>

            {/* Benefit Cards */}
            <div className="space-y-4 pt-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const iconColors = {
                  red: "bg-red-50 text-red-600",
                  pink: "bg-pink-50 text-pink-600",
                  blue: "bg-blue-50 text-blue-600",
                };

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    <div
                      className={`p-3 rounded-lg ${iconColors[benefit.color]}`}
                    >
                      <Icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyDonate;
