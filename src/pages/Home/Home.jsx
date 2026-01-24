// ================= [ HOME PAGE ] ================= //
// > Main landing experience with featured sections.
import Banner from "../../components/Home/Banner";
import Contact from "../../components/Home/Contact";
import DonationRequests from "../../components/Home/DonationRequests";
import CompatibilityMatrix from "../../components/Home/CompatibilityMatrix";
import WhyDonate from "../../components/Home/WhyDonate";
import PulseOfLife from "../../components/Home/PulseOfLife";
import MedicalAlliance from "../../components/Home/MedicalAlliance";

const Home = () => {
  return (
    <div>
      <Banner />
      <PulseOfLife />
      <MedicalAlliance />
      <CompatibilityMatrix />
      <WhyDonate />
      <DonationRequests />
      <Contact />
      {/* More components */}
    </div>
  );
};

export default Home;
