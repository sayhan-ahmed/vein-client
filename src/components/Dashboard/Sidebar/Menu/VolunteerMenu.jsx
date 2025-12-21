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
      <MenuItem icon={FaCoins} label="All Fundings" address="all-fundings" />
    </>
  );
};

export default VolunteerMenu;
