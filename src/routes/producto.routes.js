import { Router } from "express";
import { obtenerProductos,
         crearProducto,
         obtenerProducto,
         eliminarProducto,
         actualizarProducto
 } from "../controllers/Productos.controller.js";
 import { upload } from "../config/multer.js";

const router = Router();

router.get('/Productos', obtenerProductos);
router.post('/Productos', upload.fields([{name: 'Imagen', maxCount: 1}]), crearProducto);
router.get('/Producto/:id', obtenerProducto);
router.delete('/Producto/:id', eliminarProducto);
router.put('/Producto/:id',upload.fields([{name: 'Imagen', maxCount: 1}]), actualizarProducto);

export default router;