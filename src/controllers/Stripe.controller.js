import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe("sk_test_51QI5azD1XzE1fq2pMob2jZq5MlsV3YD8aGftTam1qArdtVtdWN5XZYXl0DTA7womb8zNLXFdQFf0kfrRPdKME0k600Q6sdSaiy");

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-10-28.acacia' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ message: 'Hubo un error al procesar el pago', error: error.message });
  }
};