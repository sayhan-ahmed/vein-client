import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import AddDonationRequest from "../pages/Dashboard/Donor/AddDonationRequest";
import UpdateDonationRequest from "../pages/Dashboard/Donor/UpdateDonationRequest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import DashboardHome from "../pages/Dashboard/Common/DashboardHome";
import MainLayout from "../layouts/MainLayout";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import MyRecipientRequests from "../pages/Dashboard/Volunteer/MyDonationRequests";
import AllDonationRequests from "../pages/AllDonationRequests/AllDonationRequests";
import SearchPage from "../pages/Search/SearchPage";

// 1. GUARDS
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donation-requests",
        element: <AllDonationRequests />,
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "add-donation-request",
        element: <AddDonationRequest />,
      },
      {
        path: "update-donation-request/:id",
        element: <UpdateDonationRequest />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "my-recipient-requests",
        element: (
          <VolunteerRoute>
            <MyRecipientRequests />
          </VolunteerRoute>
        ),
      },
    ],
  },
]);
