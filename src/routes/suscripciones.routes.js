// src/routes/suscripciones.routes.js
import { Router } from "express";
import { guardarSuscripcion } from "../controllers/suscripcion.controller.js";

const router = Router();

// Definimos la ruta para guardar la suscripción
router.post('/suscripcion', guardarSuscripcion);

export default router;
