import { Link, useNavigate } from "react-router";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-5xl w-full text-center">
        {/* Lottie Animation */}
        <div className="w-full mx-auto">
          <DotLottieReact
            src="https://lottie.host/6f9479b9-f060-4b2f-a8fe-4685efd27c07/cuItw3GcY1.lottie"
            loop
            autoplay
          />
        </div>

        {/* Content */}
        <div className="-mt-5 sm:-mt-12 md:-mt-18 lg:-mt-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D3658] mb-4 ">
            Page <span className="text-red-600">Not Found</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 mb-10 max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#1D3658] text-[#1D3658] rounded-xl font-semibold hover:border-red-600 hover:shadow-lg transition-all"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 border-2 border-red-600 text-white rounded-xl font-semibold hover:bg-red-700 hover:border-red-700 shadow-lg hover:shadow-xl transition-all"
          >
            <FaHome />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
