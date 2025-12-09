import Banner from "../../components/Home/Banner";
import DonationRequests from "../../components/Home/DonationRequests";
import Featured from "../../components/Home/Featured";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <DonationRequests />
      {/* More components */}
    </div>
  );
};

export default Home;
