import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { user_id } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_xxx",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://google.com",
    cancel_url: "https://google.com",

    metadata: {
      user_id: user_id,
    },
  });

  res.status(200).json({ url: session.url });
}
