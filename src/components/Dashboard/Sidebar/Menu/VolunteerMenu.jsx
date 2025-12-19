import { FaInbox } from "react-icons/fa";
import MenuItem from "./MenuItem";

const VolunteerMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaInbox}
        label="All Requests"
        address="all-blood-donation-request"
      />
    </>
  );
};

export default VolunteerMenu;
