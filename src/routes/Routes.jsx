// ================= [ ROUTING SYSTEM ] ================= //
// > Centralized application routes and route guards.
import { createBrowserRouter } from "react-router";
import { lazy } from "react";

// Lazy load all page components
const Home = lazy(() => import("../pages/Home/Home"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Login = lazy(() => import("../pages/Login/Login"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const DonationRequestDetails = lazy(
  () => import("../pages/DonationRequestDetails/DonationRequestDetails"),
);
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const CreateDonationRequest = lazy(
  () => import("../pages/Dashboard/Donor/CreateDonationRequest"),
);
const UpdateDonationRequest = lazy(
  () => import("../pages/Dashboard/Donor/UpdateDonationRequest"),
);
const ManageUsers = lazy(() => import("../pages/Dashboard/Admin/ManageUsers"));
const Profile = lazy(() => import("../pages/Dashboard/Common/Profile"));
const DashboardHome = lazy(
  () => import("../pages/Dashboard/Common/DashboardHome"),
);
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const MyDonationRequests = lazy(
  () => import("../pages/Dashboard/Donor/MyDonationRequests"),
);
const AdminAllDonationRequests = lazy(
  () => import("../pages/Dashboard/Admin/AllDonationRequests"),
);
const AllDonationRequests = lazy(
  () => import("../pages/AllDonationRequests/AllDonationRequests"),
);
const SearchPage = lazy(() => import("../pages/Search/SearchPage"));
const DonateMoney = lazy(() => import("../pages/DonateMoney/DonateMoney"));
const AllFundings = lazy(() => import("../pages/Dashboard/Admin/AllFundings"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Terms = lazy(() => import("../pages/Terms/Terms"));
const Privacy = lazy(() => import("../pages/Privacy/Privacy"));

// 1. GUARDS
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
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
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
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
        path: "all-funding",
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
