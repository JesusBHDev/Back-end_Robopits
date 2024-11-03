import { Router } from "express";
import { crearOferta, eliminarOferta, obtenerOfertas, obtenerOferta } from "../controllers/Ofertas.controller.js";
import { upload } from "../config/multer.js";

const router = Router();

router.get("/ofertas", obtenerOfertas);
router.get("/oferta/:id", obtenerOferta);
router.post("/ofertas", upload.fields([{ name: 'Imagen', maxCount: 1 }]), crearOferta);
router.delete("/oferta/:id", eliminarOferta);

export default router;
