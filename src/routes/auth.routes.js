import { Router } from "express";
import { register, login, logout, profile,
     verifyToken ,forgotPassword, PasswordReset, loginwearos} from "../controllers/auth.controller.js";
import { authRequire } from "../middlewares/validateToken.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/loginwearos", loginwearos);
router.post("/logout", logout);
router.get("/profile", authRequire, profile);

router.get("/verify", verifyToken);

router.post("/forgotPassword", forgotPassword);
router.post("/passwordReset", PasswordReset);

export default router
