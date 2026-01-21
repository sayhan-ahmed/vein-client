// ================= [ MAIN ENTRY ] ================= //
// > Application root rendering with providers and router.
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/Shared/Loader.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen bg-white">
              <Loader />
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#1F2937",
            padding: "16px 24px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
            style: {
              border: "2px solid #10B981",
              boxShadow: "0 10px 40px -10px rgba(16, 185, 129, 0.3)",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#DC2626",
              secondary: "#fff",
            },
            style: {
              border: "2px solid #DC2626",
              boxShadow: "0 10px 40px -10px rgba(220, 38, 38, 0.3)",
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
);
