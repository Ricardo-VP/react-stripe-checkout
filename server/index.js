const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();

const app = express();

const stripe = new Stripe(process.env.STRIPE_KEY_PRIVATE);

app.use(express.json());
app.use(cors());

app.post("/api/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Mechanical Keyboard",
      payment_method: id,
      confirm: true,
    });

    res.send("Successful payment");
  } catch (error) {
    res.send({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port 3001");
});
