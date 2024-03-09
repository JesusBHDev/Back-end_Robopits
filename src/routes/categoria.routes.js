import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import { obtenerCategorias,
         crearCategoria,
         obtenerCategoria,
         eliminarCategoria,
         actualizarCategoria
} from "../controllers/Categorias.controller.js";

const router = Router();

router.get('/Categorias', obtenerCategorias);
router.post('/Categorias', crearCategoria);
router.get('/Categoria/:id', obtenerCategoria);
router.delete('/Categoria/:id', eliminarCategoria);
router.put('/Categoria/:id', actualizarCategoria);

export default router;