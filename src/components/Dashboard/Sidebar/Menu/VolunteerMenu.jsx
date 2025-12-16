import { FaUserEdit } from "react-icons/fa";
import MenuItem from "./MenuItem";

const VolunteerMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUserEdit}
        label="My Recipient Requests"
        address="my-recipient-requests"
      />
    </>
  );
};

export default VolunteerMenu;
