import { FaInbox, FaCoins } from "react-icons/fa";
import MenuItem from "./MenuItem";

const VolunteerMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaInbox}
        label="All Requests"
        address="all-blood-donation-request"
      />
      <MenuItem icon={FaCoins} label="All Funding" address="all-funding" />
    </>
  );
};

export default VolunteerMenu;
