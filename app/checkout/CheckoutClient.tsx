"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";
import MpesaPaymentForm from "./MpesaPaymentForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mpesa'>('card');

  const router = useRouter();

  console.log("paymentIntent", paymentIntent);
  console.log("clientSecret", clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  const handlePaymentMethodChange = (method: 'card' | 'mpesa') => {
    setPaymentMethod(method);
  };

  return (
    <div className="w-full">
      <div className="flex space-x-4 mb-4">
        <label 
          className={`flex items-center cursor-pointer border border-transparent ${paymentMethod === 'card' ? 'border-blue-500' : 'border-gray-300'} p-2 rounded-md`}
          onClick={() => handlePaymentMethodChange('card')}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            className="hidden"
          />
          <FontAwesomeIcon icon={faCreditCard} className="text-lg mr-1" />
          <span className="text-lg font-semibold">Pay with Card</span>
        </label>
        <label 
          className={`flex items-center cursor-pointer border border-transparent ${paymentMethod === 'mpesa' ? 'border-blue-500' : 'border-gray-300'} p-2 rounded-md`}
          onClick={() => handlePaymentMethodChange('mpesa')}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="mpesa"
            checked={paymentMethod === 'mpesa'}
            className="hidden"
          />
          <FontAwesomeIcon icon={faMobileAlt} className="text-lg mr-1" />
          <span className="text-lg font-semibold">Pay with M-Pesa</span>
        </label>
      </div>
      {paymentMethod === 'card' && clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {paymentMethod === 'mpesa' && clientSecret && cartProducts && (
        <MpesaPaymentForm />
      )}
      {loading && <div className="text-center">Loading Checkout...</div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Successful</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;

