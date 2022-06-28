import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000,
          }
        );

        console.log(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://maxellbajio.com/1135-large_default/mechanical-gaming-keyboard.jpg"
        alt="Mechanical keyboard"
        className="img-fluid"
      />
      <h3 className="text-center my-2">Price: $100</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button disabled={!stripe || loading} className="btn btn-success">
        {loading ? (
          <div className="spinner-borde text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="form-group">
              <CheckoutForm className="form-control" />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
