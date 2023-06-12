import React, { FC, FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const AddCardForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  // Set up state for the form input
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const cardHolderName = name;
    const cardHolderAddress = address;

    if (cardElement) {
      const result = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardHolderName,
          address: {
            line1: cardHolderAddress,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log(result.paymentMethod);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-6 py-4">
      <label className="font-medium text-gray-700 my-1">Name on Card</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md border-gray-300 pl-2 py-2 mb-4 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left w-64"
        placeholder="Name on Card"
      />

      <label className="font-medium text-gray-700 my-1">Billing Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border rounded-md border-gray-300 pl-2 py-2 mb-6 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left w-64"
        placeholder="Address"
      />

      <label className="font-medium text-gray-700 my-1">Zipcode</label>
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        className="border rounded-md border-gray-300 pl-2 py-2 mb-6 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left w-64"
        placeholder="Zipcode"
      />

      <div className="mb-6 border rounded px-4 py-2">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
      >
        Add Card
      </button>
    </form>
  );
};

export const AddCardPayment: FC = () => {
  console.log("logging the stripe api key");
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST);
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST!
  );

  return (
    <Elements stripe={stripePromise}>
      <AddCardForm />
    </Elements>
  );
};

export default AddCardPayment;
