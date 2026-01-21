// ================= [ DONATION MODAL ] ================= //
// > Final confirmation interface for blood donation.
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const DonationModal = ({
  closeModal,
  isOpen,
  donationRequest,
  userInfo,
  handleDonate,
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm transition-opacity">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-2xl rounded-3xl border border-white/20"
          >
            <DialogTitle
              as="h3"
              className="text-2xl font-black text-center text-slate-900 mb-2"
            >
              Confirm Donation
            </DialogTitle>
            <p className="text-center text-slate-500 mb-8 font-medium">
              Please review your details before confirming.
            </p>

            <form className="space-y-5">
              {/* Read Only Fields */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={userInfo?.displayName || userInfo?.name || ""}
                  readOnly
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-0 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                  Donor Email
                </label>
                <input
                  type="text"
                  value={userInfo?.email || ""}
                  readOnly
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl px-4 py-3 focus:outline-none focus:ring-0 cursor-not-allowed"
                />
              </div>

              {/* Request Context Summary */}
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-center justify-between mt-4">
                <div>
                  <p className="text-xs text-red-500 font-bold uppercase mb-1">
                    Donating To
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {donationRequest?.recipientName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-red-500 font-bold uppercase mb-1">
                    Blood Group
                  </p>
                  <div className="badge bg-red-500 text-white font-bold border-none">
                    {donationRequest?.bloodGroup}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 hover:shadow-red-500/40 transition-all transform active:scale-95"
                  onClick={handleDonate}
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DonationModal;
