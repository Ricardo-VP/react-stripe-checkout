import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://maxellbajio.com/1135-large_default/mechanical-gaming-keyboard.jpg"
        alt="Mechanical keyboard"
        className="img-fluid"
      />
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success">Buy</button>
    </form>
  );
};

function App() {
  console.log(import.meta.env.VITE_STRIPE_KEY);
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
