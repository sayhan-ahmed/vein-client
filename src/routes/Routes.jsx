import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddDonationRequest from "../pages/Dashboard/Donor/AddDonationRequest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import ManageRequests from "../pages/Dashboard/Donor/ManageRequests";
import MyRecipientRequests from "../pages/Dashboard/Recipient/MyDonationRequests";
import { createBrowserRouter } from "react-router";
import AllDonationRequests from "../pages/AllDonationRequests/AllDonationRequests";

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
        path: "/donation-request/:id",
        element: <DonationRequestDetails />,
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
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-donation-request",
        element: (
          <PrivateRoute>
            <AddDonationRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            <MyDonationRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-recipient-requests",
        element: (
          <PrivateRoute>
            <MyRecipientRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: <ManageRequests />,
      },
    ],
  },
]);
