// ================= [ DONOR MENU ] ================= //
// > Sidebar navigation links for donor accounts.
import { FaUserEdit } from "react-icons/fa";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import MenuItem from "./MenuItem";

const DonorMenu = () => {
  return (
    <>
      <MenuItem
        icon={VscGitPullRequestNewChanges}
        label="Create Request"
        address="create-donation-request"
      />
      <MenuItem
        icon={FaUserEdit}
        label="My Requests"
        address="my-donation-requests"
      />
    </>
  );
};

export default DonorMenu;
