import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { imageUpload } from "../../utils/imageUpload";
import { TbDropletFilled } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";
import {
  FaXTwitter,
  FaFacebookF,
  FaHandHoldingHeart,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";

// Import Local JSON Data
import districtsJson from "../../assets/data/districts.json";
import upazilasJson from "../../assets/data/upazilas.json";

const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Blood Groups
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Load Districts on Mount
  useEffect(() => {
    if (districtsJson[2] && districtsJson[2].data) {
      setDistricts(
        districtsJson[2].data.sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  }, []);

  // Filter Upazilas when District Changes
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

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  // Form Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;
    const bloodGroup = form.blood_group.value;
    const districtId = form.district.value;
    const upazilaId = form.upazila.value;
    const imageFile = form.image.files[0];

    const districtObj = districts.find((d) => d.id === districtId);
    const upazilaObj = upazilas.find((u) => u.id === upazilaId);

    // Validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload a profile image.");
      return;
    }

    try {
      setLoading(true);

      // 1. Upload Image
      const imageUrl = await imageUpload(imageFile);

      // 2. Create Firebase User
      const result = await createUser(email, password);

      // 3. Update Firebase Profile
      await updateUserProfile(name, imageUrl);

      // 4. Save User to Database
      const userInfo = {
        name,
        email,
        image: imageUrl,
        bloodGroup,
        district: districtObj?.name,
        upazila: upazilaObj?.name,
        role: "donor",
        status: "active",
      };

      await axiosPublic.post("/users", userInfo);

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 font-sans overflow-y-auto relative">
      {/* Two-Tone Background */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="w-full h-[30%] bg-[#1D3658]"></div>
        <div className="w-full h-[70%] bg-rose-50"></div>
      </div>

      {/* Presentation Canvas */}
      <div className="w-full max-w-[1400px] bg-white rounded-[40px] md:rounded-[60px] shadow-2xl overflow-hidden min-h-[600px] h-auto md:min-h-[85vh] py-8 md:py-0 flex flex-col xl:flex-row relative">
        {/* Top Left Bubbles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Big Bubble with Content */}
          <div className="absolute -top-[100px] -left-[60px] w-[420px] h-[420px] rounded-full bg-white shadow-[5px_15px_15px_rgba(200,50,60,0.20)] border border-white/50 justify-center items-start pl-20 pt-20 overflow-hidden flex flex-col">
            <div className="relative z-10 scale-90 origin-top-left inset-0">
              <div className="relative pt-8 ml-4 hidden xl:flex flex-col">
                <h2 className="text-7xl font-semibold text-[#1D3658] mb-1">
                  Vein<span className="text-red-500 text-xl">■</span>
                </h2>
                <h3 className="text-3xl font-light text-slate-500 tracking-wide mb-4">
                  Give Blood.
                  <span className="font-bold text-red-500">
                    {" "}
                    Give strength.
                  </span>
                </h3>
                <div className="w-18 h-1.5 bg-linear-to-r from-red-500 to-orange-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Small Bubble */}
          <div className="absolute -top-[100px] left-[180px] w-[220px] h-[220px] rounded-full bg-white shadow-[1px_15px_15px_rgba(200,50,50,0.15)] border border-white/60"></div>
        </div>
        {/* Left Side - Presentation Typography */}
        <div className="hidden xl:flex xl:w-[35%] p-12 flex-col justify-center relative z-0 overflow-hidden">
          <div className="relative z-10 mt-[350px]">
            <p className="text-slate-500 leading-relaxed max-w-sm pl-4 border-l-4 border-red-100 italic">
              "A premium blood donation platform connecting donors with those in
              need. Join our community and become a hero today."
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full xl:w-[65%] relative flex items-center justify-center p-6 md:p-12 bg-slate-50/50 xl:bg-transparent">
          {/* The Main Split Card */}
          <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-2xl flex flex-col md:flex-row overflow-visible relative z-10 transition-transform duration-500 h-auto md:min-h-[600px]">
            {/* Floating Middle Card */}
            <div className="hidden lg:block absolute -left-16 lg:-left-10 xl:-left-24 top-[50%] -translate-y-1/2 z-30 w-[280px] h-[460px] bg-linear-to-b from-red-700 via-rose-700 to-[#021837] rounded-3xl shadow-[0_20px_60px_-10px_rgba(220,38,38,0.6)] flex-col justify-center items-center overflow-hidden transform hover:-translate-y-[calc(50%+10px)] transition-transform duration-500">
              {/* Background Ambient Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.2),transparent)] opacity-40 pointer-events-none"></div>

              {/* Central Visual Cluster */}
              <div className="relative z-10 flex flex-col items-center justify-center mt-8">
                {/* Main Icon Holder with Radiating Ripples */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-10">
                  {/* Radiating Ripples */}
                  <span className="absolute inset-0 z-0 flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                    <span className="absolute inline-flex h-[140%] w-[140%] rounded-full bg-rose-400 opacity-10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_400ms]"></span>
                    <span className="absolute inline-flex h-[180%] w-[180%] rounded-full bg-rose-400 opacity-5 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_800ms]"></span>
                  </span>

                  {/* The Glass Icon Container */}
                  <div className="relative z-10 w-full h-full rounded-full bg-linear-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 shadow-[0_15px_35px_rgba(0,0,0,0.2)] flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <MdBloodtype className="text-6xl text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]" />
                  </div>
                </div>

                {/* Text Overlay */}
                <div className="text-center px-6 relative z-10">
                  <h4 className="text-3xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
                    Every Drop
                    <br />
                    Counts
                  </h4>
                  <div className="w-12 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent mx-auto mb-4 rounded-full"></div>
                  <p className="text-rose-100/90 text-sm font-medium leading-relaxed">
                    "Your donation is the
                    <br />
                    gift of life."
                  </p>

                  <div className="mt-8 relative group">
                    {/* Drop Composition */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-40 h-32 pointer-events-none flex items-center justify-center">
                      {/* Center Drop */}
                      <TbDropletFilled className="text-9xl text-rose-500/10 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)] absolute transition-transform duration-700 group-hover:scale-110" />

                      {/* Left Drop (Angled) */}
                      <TbDropletFilled className="text-5xl text-white/5 absolute -left-4 -top-2 -rotate-15 blur-[0.5px] transition-all duration-500 group-hover:-translate-x-4 group-hover:-rotate-25 opacity-60" />

                      {/* Right Drop (Angled) */}
                      <TbDropletFilled className="text-5xl text-white/5 absolute -right-4 -top-2 rotate-15 blur-[0.5px] transition-all duration-500 group-hover:translate-x-4 group-hover:rotate-25 opacity-60" />
                    </div>

                    <button className="relative z-10 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase text-white transition-all shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95">
                      Be A Hero
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Decor */}
              <div className="absolute bottom-0 w-full h-40 bg-linear-to-t from-black/40 via-black/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Main Card Left Image */}
            <div className="md:w-2/6 relative bg-slate-900 group overflow-hidden rounded-t-[30px] md:rounded-l-[30px] md:rounded-tr-none h-[280px] md:h-auto md:min-h-full flex flex-col justify-between p-8 md:p-12">
              {/* Background Layers */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[8s] group-hover:scale-105 opacity-60"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop')",
                  }}
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-900/80 to-rose-950/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-linear-to-tr from-slate-900/50 to-transparent"></div>
              </div>

              {/* Top: Branding & Tag */}
              <div className="relative z-20 flex flex-col justify-between items-start space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white">
                    <MdBloodtype className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold leading-none tracking-wide text-sm">
                      Vein.
                    </h3>
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wider uppercase mt-1">
                      The Flow of Life
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                    Live System
                  </span>
                </div>
              </div>
              {/* Right Squares */}
              <div className="flex md:flex-col justify-center items-center gap-2">
                {/* Square 1: Give Blood */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 w-28 h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 text-center transform hover:scale-105 transition-all duration-300 group lg:hidden">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 mb-2 group-hover:scale-110 transition-transform">
                    <FaHandHoldingHeart className="text-emerald-400 text-sm" />
                  </div>
                  <p className="text-white text-[10px] font-bold leading-tight">
                    Be Generous
                  </p>
                  <p className="text-emerald-400/80 text-[9px] font-semibold mt-0.5">
                    Donate Blood
                  </p>
                </div>
                {/* Square 2: Donors */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 w-28 h-28 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 text-center transform hover:scale-105 transition-all duration-300 delay-75">
                  <div className="flex -space-x-1.5 mb-2">
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      className="w-7 h-7 rounded-full border border-slate-900"
                      alt=""
                    />
                    <img
                      src="https://i.pravatar.cc/100?img=33"
                      className="w-7 h-7 rounded-full border border-slate-900"
                      alt=""
                    />
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-900 flex items-center justify-center text-[8px] text-white font-bold">
                      +5
                    </div>
                  </div>
                  <p className="text-white text-[10px] font-bold leading-tight">
                    New Donors
                  </p>
                  <p className="text-slate-400 text-[9px] font-medium mt-0.5">
                    Joined Today
                  </p>
                </div>
              </div>
            </div>

            {/* Main Card Right - Form */}
            <div className="md:w-4/6 p-8 md:p-12 lg:p-16 bg-white rounded-b-[30px] md:rounded-r-[30px] md:rounded-bl-none flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-800">
                  Join <span className="text-red-600">Vein.</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  Create your account and start saving lives.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* Row 2: Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        required
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-slate-300 placeholder:font-normal pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 3: Blood Group */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Blood Group
                  </label>
                  <select
                    name="blood_group"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all cursor-pointer"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 4: District & Upazila */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      District
                    </label>
                    <select
                      name="district"
                      required
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all cursor-pointer"
                    >
                      <option value="">Select District</option>
                      {districts.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {dist.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Upazila
                    </label>
                    <select
                      name="upazila"
                      required
                      disabled={!selectedDistrict}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Upazila</option>
                      {upazilas.map((up) => (
                        <option key={up.id} value={up.id}>
                          {up.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5: Profile Image */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-600 hover:file:bg-rose-100 transition-all cursor-pointer focus:outline-none focus:border-rose-500"
                  />
                  <p className="mt-1.5 text-[10px] text-slate-400 font-medium">
                    PNG, JPG or JPEG (max 2MB)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-rose-600 text-white py-3.5 rounded-lg font-bold text-sm tracking-wide shadow-lg shadow-rose-500/20 hover:bg-rose-700 hover:shadow-rose-600/30 hover:scale-105 duration-500 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <ImSpinner9 className="animate-spin text-lg" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-4">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-100"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                    <span className="bg-white px-3">Or continue with</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors group">
                    <FcGoogle className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="flex-1 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors group">
                    <FaXTwitter className="text-[#1a1e21] group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="flex-1 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors group">
                    <FaFacebookF className="text-[#0B66FF] group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              <p className="text-center mt-8 text-xs font-medium text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-rose-600 font-bold hover:underline decoration-2 underline-offset-4"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
