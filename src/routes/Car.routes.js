import { Router } from 'express';
import {
  agregarProductoAlCarrito,
  obtenerCarrito,
  decrementarCantidadProducto,
  eliminarProductoDelCarrito,
  incrementarCantidadProducto
} from '../controllers/Carrito.controller.js';

const router = Router();

// Ruta para agregar producto al carrito
router.post('/carritoagregar', agregarProductoAlCarrito);

// Ruta para obtener el carrito del usuario
router.get('/carrito/:userId', obtenerCarrito);

router.post('/carrito/decrement', decrementarCantidadProducto);
router.post('/carrito/remove', eliminarProductoDelCarrito);
router.post('/carrito/increment', incrementarCantidadProducto);

export default router;