import { FaFingerprint, FaUserEdit } from "react-icons/fa";
import MenuItem from "./MenuItem";

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaFingerprint}
        label="Add Donation Request"
        address="add-donation-request"
      />
      <MenuItem
        icon={FaUserEdit}
        label="My Donation Requests"
        address="my-donation-requests"
      />
    </>
  );
};

export default DonorMenu;
