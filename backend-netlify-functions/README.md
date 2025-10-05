Devils Don't Fly — Full static frontend + Netlify Functions backend
=================================================

This package contains:
- frontend/  (static site: upload to GitHub Pages or Netlify)
- backend-netlify-functions/ (serverless functions to handle Stripe & PayPal checkout)

IMPORTANT: You MUST set your secret keys as environment variables when deploying the backend.
Do NOT commit your secret keys into the repo.

Netlify Deployment (recommended)
--------------------------------
1. Create a Netlify account and link this repository.
2. Put frontend files at the repo root or configure a site to serve the `frontend/` folder.
3. In Netlify settings, add Environment Variables:
   - STRIPE_SECRET_KEY = sk_live_...
   - PAYPAL_CLIENT_ID = your_paypal_client_id
   - PAYPAL_CLIENT_SECRET = your_paypal_client_secret
   - SUCCESS_URL = https://your-site-url (no trailing slash)
   - CANCEL_URL = https://your-site-url (no trailing slash)
4. Deploy. Netlify will serve serverless functions from /.netlify/functions/*
   - Stripe endpoint: /.netlify/functions/create-stripe-session
   - PayPal endpoint: /.netlify/functions/create-paypal-order

Vercel Deployment
-----------------
You can adapt the functions to Vercel `api/` routes. The logic will be similar — keep the same environment variables.

Stripe notes
------------
- Stripe expects amounts in cents (USD) in our example. We send price in cents from the frontend in the items array.
- For Apple Pay to appear, you must use Stripe Checkout (we redirect to session.url). Apple Pay availability is automatic for supported devices.

PayPal notes
------------
- We use PayPal Orders API to create an order and redirect the user to the approval URL returned by PayPal.
- This template uses the PayPal SDK and Sandbox environment — set your live credentials for production.

How frontend calls the backend
-----------------------------
- Frontend sends POST requests with JSON body: { items: [{id,name,price,quantity}, ...] }
- Backend creates checkout session / order and returns sessionUrl or approvalUrl to redirect to.

Security
--------
- Keep secret keys only in environment variables.
- Verify webhooks (not included) to confirm payments server-side for production orders.

If you want, I can also adapt the backend to Vercel or provide GitHub Actions to auto-deploy. Good to go?