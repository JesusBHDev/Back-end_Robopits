import { Router } from 'express';
import { crearPedido, 
        obtenerPedidosCliente,
        obtenerTodosLosPedidos } from '../controllers/Pedido.controller.js';

const router = Router();
router.post('/crearpedido', crearPedido);
router.get('/pedidosCliente/:userId', obtenerPedidosCliente);
router.get('/todosLosPedidos', obtenerTodosLosPedidos);


export default router;