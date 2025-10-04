const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const items = body.items || [];
    // Build line items for stripe
    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name },
        unit_amount: i.price // price in cents
      },
      quantity: i.quantity
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: (process.env.SUCCESS_URL || 'https://example.com') + '/success.html',
      cancel_url: (process.env.CANCEL_URL || 'https://example.com') + '/cancel.html',
    });
    return { statusCode: 200, body: JSON.stringify({ sessionUrl: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};