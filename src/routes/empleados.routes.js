import { Router } from "express";
import { registro, inicio, verifyTokenEmpleado } from "../controllers/Empleados.controller.js";
import { authRequire } from "../middlewares/validateToken.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router();

router.post("/registro", validateSchema(registerSchema), registro);
router.post("/inicio", validateSchema(loginSchema), inicio);
router.get("/verificar", verifyTokenEmpleado);

export default router