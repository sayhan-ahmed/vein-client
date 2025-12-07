import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Donation Request"
        address="add-donation-request"
      />
      <MenuItem
        icon={MdHomeWork}
        label="My Donation Requests"
        address="my-donation-requests"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Requests"
        address="manage-requests"
      />
    </>
  );
};

export default DonorMenu;
