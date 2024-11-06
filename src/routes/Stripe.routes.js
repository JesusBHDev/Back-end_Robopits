// En tu archivo de rutas (e.g., stripe.routes.js)
import express from 'express';
const router = express.Router();

router.get('/stripe-key', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

export default router;