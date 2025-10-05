const paypal = require('@paypal/checkout-server-sdk');
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
function client() {
  return new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(clientId, clientSecret));
}
exports.handler = async function(event) {
  try {
    const body = JSON.parse(event.body || '{}');
    const items = body.items || [];
    const total = items.reduce((s,i)=>s + (i.price * i.quantity),0);
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: 'USD', value: (total/100).toFixed(2) } }],
      application_context: {
        return_url: (process.env.SUCCESS_URL || 'https://example.com') + '/success.html',
        cancel_url: (process.env.CANCEL_URL || 'https://example.com') + '/cancel.html'
      }
    });
    const response = await client().execute(request);
    const approve = response.result.links.find(l=>l.rel==='approve');
    return { statusCode: 200, body: JSON.stringify({ approvalUrl: approve.href }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};