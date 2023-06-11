import React, { FC, FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';



const AddCardForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card) {
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log(result.paymentMethod);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Add Card
      </button>
    </form>
  );
};

export const AddCardPayment: FC = () => {

// load Stripe.js with your publishable key.
  console.log('logging the stripe api key')
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST)
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST!);

  return (
    <Elements stripe={stripePromise}>
      <AddCardForm />
    </Elements>
  );
};

export default AddCardPayment;
