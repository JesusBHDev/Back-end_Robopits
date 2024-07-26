import { Router } from 'express';
import {
  agregarProductoAlCarrito,
  obtenerCarrito,
  decrementarCantidadProducto,
  eliminarProductoDelCarrito,
  incrementarCantidadProducto,
  recomendaciones
} from '../controllers/Carrito.controller.js';

const router = Router();

router.post('/carritoagregar', agregarProductoAlCarrito);
router.get('/carrito/:userId', obtenerCarrito);
router.post('/carrito/decrement', decrementarCantidadProducto);
router.post('/carrito/remove', eliminarProductoDelCarrito);
router.post('/carrito/increment', incrementarCantidadProducto);
router.get('/recomendaciones', recomendaciones);

export default router;