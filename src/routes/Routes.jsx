import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import DonationRequestDetails from "../pages/DonationRequestDetails/DonationRequestDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest";
import UpdateDonationRequest from "../pages/Dashboard/Donor/UpdateDonationRequest";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import DashboardHome from "../pages/Dashboard/Common/DashboardHome";
import MainLayout from "../layouts/MainLayout";
import MyDonationRequests from "../pages/Dashboard/Donor/MyDonationRequests";
import AdminAllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequests";
import AllDonationRequests from "../pages/AllDonationRequests/AllDonationRequests";
import SearchPage from "../pages/Search/SearchPage";
import DonateMoney from "../pages/DonateMoney/DonateMoney";
import AllFundings from "../pages/Dashboard/Admin/AllFundings";

// 1. GUARDS
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VolunteerRoute from "./VolunteerRoute";
import AdminVolunteerRoute from "./AdminVolunteerRoute";

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
      {
        path: "/funding",
        element: <DonateMoney />,
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
        path: "create-donation-request",
        element: <CreateDonationRequest />,
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
        path: "all-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminVolunteerRoute>
            <AdminAllDonationRequests />
          </AdminVolunteerRoute>
        ),
      },
      {
        path: "all-fundings",
        element: (
          <AdminVolunteerRoute>
            <AllFundings />
          </AdminVolunteerRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/:email",
        element: <Profile />,
      },
    ],
  },
]);
