import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  FaShieldAlt,
  FaRegCalendarAlt,
  FaLock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaChevronLeft,
} from "react-icons/fa";

const CheckoutForm = ({ price, onCancel, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#0f172a",
        fontWeight: "500",
        letterSpacing: "0.025em",
        fontFamily: "Inter, system-ui, sans-serif",
        "::placeholder": {
          color: "#94a3b8",
        },
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
  };

  useEffect(() => {
    if (!elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (cardNumber) {
      cardNumber.on("focus", () => setFocusedField("cardNumber"));
      cardNumber.on("blur", () => setFocusedField(null));
    }
    if (cardExpiry) {
      cardExpiry.on("focus", () => setFocusedField("cardExpiry"));
      cardExpiry.on("blur", () => setFocusedField(null));
    }
    if (cardCvc) {
      cardCvc.on("focus", () => setFocusedField("cardCvc"));
      cardCvc.on("blur", () => setFocusedField(null));
    }

    return () => {
      if (cardNumber) {
        cardNumber.off("focus");
        cardNumber.off("blur");
      }
      if (cardExpiry) {
        cardExpiry.off("focus");
        cardExpiry.off("blur");
      }
      if (cardCvc) {
        cardCvc.off("focus");
        cardCvc.off("blur");
      }
    };
  }, [elements]);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Backend Error creating Payment Intent:", err);
          setError("Backend communication failed. Check console.");
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) return;

    setProcessing(true);

    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
          address: {
            postal_code: zipCode,
          },
        },
      });

    if (paymentError) {
      setError(paymentError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      if (confirmError.code === "resource_missing") {
        setError("Stripe Mismatch: Sync your environment keys.");
      } else {
        setError(confirmError.message);
      }
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        const payment = {
          email: user?.email,
          name: user?.displayName,
          image: user?.photoURL,
          amount: parseFloat(price),
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "completed",
        };

        const res = await axiosSecure.post("/funding", payment);
        if (res.data?.insertedId) {
          onSuccess(paymentIntent.id);
        }
      }
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Transaction Summary Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Transaction Summary
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              Platform Support
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Total Due
            </p>
            <p className="text-2xl font-black text-red-600">${price}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Secure Payment Details
            </h4>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200/50" />
              <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200/50" />
              <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200/50" />
            </div>
          </div>

          {/* Combined Card Info Section */}
          <div className="space-y-4">
            {/* Card Number */}
            <div className="relative group">
              <div
                className={`absolute inset-y-0 left-4 flex items-center transition-colors pointer-events-none ${
                  focusedField === "cardNumber"
                    ? "text-emerald-700"
                    : "text-slate-400"
                }`}
              >
                <FaCreditCard className="text-sm" />
              </div>
              <div className="bg-white border-2 border-slate-100 rounded-xl p-4 pl-12 shadow-sm focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/5 transition-all">
                <CardNumberElement options={elementOptions} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry */}
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-4 flex items-center transition-colors pointer-events-none ${
                    focusedField === "cardExpiry"
                      ? "text-indigo-600"
                      : "text-slate-400"
                  }`}
                >
                  <FaRegCalendarAlt className="text-sm" />
                </div>
                <div className="bg-white border-2 border-slate-100 rounded-xl p-4 pl-12 shadow-sm focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/5 transition-all">
                  <CardExpiryElement options={elementOptions} />
                </div>
              </div>

              {/* CVC */}
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-4 flex items-center transition-colors pointer-events-none ${
                    focusedField === "cardCvc"
                      ? "text-red-600"
                      : "text-slate-400"
                  }`}
                >
                  <FaLock className="text-sm" />
                </div>
                <div className="bg-white border-2 border-slate-100 rounded-xl p-4 pl-12 shadow-sm focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/5 transition-all">
                  <CardCvcElement options={elementOptions} />
                </div>
              </div>
            </div>

            {/* ZIP Code */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#326cbe] transition-colors pointer-events-none">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <input
                type="text"
                placeholder="ZIP Code / Postal"
                className="w-full bg-white border-2 border-slate-100 rounded-xl p-4 pl-12 shadow-sm focus:border-[#326cbe] focus:ring-4 focus:ring-[#326cbe]/5 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            <p className="text-red-700 text-xs font-bold leading-tight">
              {error}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="group flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all text-[11px] uppercase tracking-widest active:scale-95 shadow-sm"
          >
            <FaChevronLeft className="text-[10px] group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className="flex-2 relative group overflow-hidden py-4 bg-slate-900 text-white font-bold rounded-2xl disabled:opacity-50 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider">
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Pay ${price}
                </>
              )}
            </span>
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between px-2 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 text-emerald-600">
          <FaShieldAlt className="text-xs" />
          <span className="text-[9px] font-black uppercase tracking-widest">
            Level 1 PCI Compliant
          </span>
        </div>
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          Secured by Stripe
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
