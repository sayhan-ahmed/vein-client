// Standardized SweetAlert2 configurations for consistent toast styling

export const swalConfig = {
  // Base configuration for all toasts
  base: {
    position: "center",
    backdrop: true,
    allowOutsideClick: true,
    customClass: {
      popup: "rounded-3xl shadow-2xl",
      title: "text-2xl font-bold text-gray-900",
      htmlContainer: "text-gray-600",
      confirmButton:
        "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
      cancelButton:
        "px-6 py-3 rounded-xl font-bold shadow-lg transition-all hover:scale-105",
    },
  },

  // Success toast
  success: (title, text) => ({
    title,
    text,
    icon: "success",
    iconColor: "#10B981",
    confirmButtonText: "Great!",
    confirmButtonColor: "#1D3658",
    ...swalConfig.base,
  }),

  // Error toast
  error: (title, text) => ({
    title,
    text,
    icon: "error",
    iconColor: "#DC2626",
    confirmButtonText: "Okay",
    confirmButtonColor: "#1D3658",
    ...swalConfig.base,
  }),

  // Warning toast
  warning: (title, text) => ({
    title,
    text,
    icon: "warning",
    iconColor: "#F59E0B",
    confirmButtonText: "Understood",
    confirmButtonColor: "#1D3658",
    ...swalConfig.base,
  }),

  // Confirmation dialog
  confirm: (title, text) => ({
    title,
    text,
    icon: "warning",
    iconColor: "#F59E0B",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#1D3658",
    cancelButtonColor: "#DC2626",
    ...swalConfig.base,
  }),

  // Delete confirmation
  deleteConfirm: (
    title = "Are you sure?",
    text = "This action cannot be undone."
  ) => ({
    title,
    text,
    icon: "warning",
    iconColor: "#DC2626",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#DC2626",
    cancelButtonColor: "#1D3658",
    ...swalConfig.base,
  }),
};

// React Hot Toast configuration
export const toastConfig = {
  // Default options for all toasts
  default: {
    duration: 4000,
    position: "top-center",
    style: {
      background: "#fff",
      color: "#1F2937",
      padding: "16px 24px",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
    },
  },

  // Success toast
  success: {
    duration: 4000,
    position: "top-center",
    style: {
      background: "#fff",
      color: "#1F2937",
      padding: "16px 24px",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 10px 40px -10px rgba(16, 185, 129, 0.3)",
      border: "2px solid #10B981",
    },
    iconTheme: {
      primary: "#10B981", // green-500
      secondary: "#fff",
    },
  },

  // Error toast
  error: {
    duration: 5000,
    position: "top-center",
    style: {
      background: "#fff",
      color: "#1F2937",
      padding: "16px 24px",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 10px 40px -10px rgba(220, 38, 38, 0.3)",
      border: "2px solid #DC2626",
    },
    iconTheme: {
      primary: "#DC2626", // red-600
      secondary: "#fff",
    },
  },
};
