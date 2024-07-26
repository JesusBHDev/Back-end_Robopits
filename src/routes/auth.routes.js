import { Router } from "express";
import { register,
          login, 
          logout,
          verifyToken,
          forgorPassword, 
          PasswordReset,
          obtenerPerfil,
          actualizarPerfil} from "../controllers/auth.controller.js";
import { authRequire } from "../middlewares/validateToken.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.post("/forgotPassword", forgorPassword);
router.post("/passwordReset", PasswordReset);
router.get("/perfil/:userId", obtenerPerfil);
router.put("/perfil/:userId", actualizarPerfil);
export default router
