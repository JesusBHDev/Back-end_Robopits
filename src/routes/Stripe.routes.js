// En tu archivo de rutas (e.g., stripe.routes.js)
import {Router} from 'express';
import { hojaDePago } from '../controllers/Stripe.controller.js';
const router = Router();

router.get('/stripe-key', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

router.post('/hoja-de-pago', hojaDePago);

export default router;