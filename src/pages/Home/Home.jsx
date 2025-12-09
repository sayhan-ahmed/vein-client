import Banner from "../../components/Home/Banner";
import DonationRequests from "../../components/Home/DonationRequests";
import Featured from "../../components/Home/Featured";
import WhyDonate from "../../components/Home/WhyDonate";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <WhyDonate />
      <DonationRequests />
      {/* More components */}
    </div>
  );
};

export default Home;
