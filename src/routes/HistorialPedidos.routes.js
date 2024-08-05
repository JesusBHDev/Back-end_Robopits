import { Router } from 'express';

import { moverPedidoAlHistorial, obtenerHistorialDePedidos } from '../controllers/HistorialPedidos.controller.js';

const router = Router();
router.put('/mover-pedido/:id', moverPedidoAlHistorial);
router.get('/historial-pedidos', obtenerHistorialDePedidos);

export default router;