import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { user_id } = req.query; // ✅ FIXED

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Access",
            },
            unit_amount: 500, // $5
          },
          quantity: 1,
        },
      ],
      success_url: `https://yourdomain.com/success?user_id=${user_id}`,
      cancel_url: `https://yourdomain.com/cancel`,
      metadata: {
        user_id: user_id,
      },
    });

    // ✅ THIS WAS MISSING
    res.status(200).json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
