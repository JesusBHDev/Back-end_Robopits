import { Router } from "express";
import { obtenerProductos,
         crearProducto,
         obtenerProducto,
         eliminarProducto,
         actualizarProducto
 } from "../controllers/Productos.controller.js";

const router = Router();

router.get('/Productos', obtenerProductos);
router.post('/Productos', crearProducto);
router.get('/Producto/:id', obtenerProducto);
router.delete('/Producto/:id', eliminarProducto);
router.put('/Producto/:id', actualizarProducto);

export default router;