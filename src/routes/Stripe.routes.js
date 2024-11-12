import { Router } from 'express';
import { createPaymentIntent } from '../controllers/Stripe.controller.js';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

router.get('/stripe-key', (req, res) => {
  res.json({ publishableKey: "pk_test_51QI5azD1XzE1fq2pk2QrNMWnltIDCCl8zswMuo5hFo6D0LRd6FnF26l1il0sH79G2bvIXrSpsnBgPrUvPtzSmluU00N8rpQQUq" });
});

router.post('/hoja-de-pago', createPaymentIntent);

export default router;