// ================= [ ADMIN MENU ] ================= //
// > Sidebar navigation links for administrator roles.
import { FaUserCog, FaInbox, FaCoins } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="all-users" />
      <MenuItem
        icon={FaInbox}
        label="All Requests"
        address="all-blood-donation-request"
      />
      <MenuItem icon={FaCoins} label="All Funding" address="all-funding" />
    </>
  );
};

export default AdminMenu;
