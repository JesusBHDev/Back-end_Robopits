export const hojaDePago = async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const amount = req.body.amount;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2024-10-28.acacia'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'mxn',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51QI5azD1XzE1fq2pk2QrNMWnltIDCCl8zswMuo5hFo6D0LRd6FnF26l1il0sH79G2bvIXrSpsnBgPrUvPtzSmluU00N8rpQQUq'
  });
};