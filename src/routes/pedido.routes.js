import { Router } from 'express';
import { 
  crearPedido, 
  obtenerPedidosCliente,
  obtenerTodosLosPedidos,
  obtenerPedidosPendientes,
  obtenerPedidosListos,
  actualizarPedido,
  eliminarPedido,
  estadoPedidos 
} from '../controllers/Pedido.controller.js';

const router = Router();

router.post('/crearpedido', crearPedido);
router.get('/pedidosCliente/:userId', obtenerPedidosCliente);
router.get('/todosLosPedidos', obtenerTodosLosPedidos);
router.get('/pedidos-pendientes', obtenerPedidosPendientes);
router.get('/pedidos-listos', obtenerPedidosListos);
router.put('/actualizarPedido/:id', actualizarPedido); 
router.delete('/eliminarPedido/:id', eliminarPedido);

// Ruta para obtener pedidos por estado
router.get('/pedidos/estado/:estado', estadoPedidos);

export default router;
