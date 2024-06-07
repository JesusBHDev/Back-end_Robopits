import express from 'express';
import { agregarProductoAlCarrito } from '../controllers/Carrito.controller.js';

const router = express.Router();

router.post('/carritoagregar', agregarProductoAlCarrito);

export default router;
