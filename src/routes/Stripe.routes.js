import { Router } from 'express';
import { createPaymentIntent } from '../controllers/Stripe.controller.js';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

router.get('/stripe-key', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.post('/hoja-de-pago', createPaymentIntent);

export default router;
