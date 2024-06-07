import { Router } from 'express';
import { agregarProductoAlCarrito, obtenerCarrito } from '../controllers/Carrito.controller.js';

const router = Router();

// Ruta para agregar producto al carrito
router.post('/carritoagregar', agregarProductoAlCarrito);

// Ruta para obtener el carrito del usuario
router.get('/carrito/:userId', obtenerCarrito);

export default router;
