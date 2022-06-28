import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  console.log(import.meta.env.VITE_STRIPE_KEY);
  return <h1>Hello World</h1>;
}

export default App;
