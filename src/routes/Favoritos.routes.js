// routes/favoritos.routes.js
import { Router } from 'express';

import { agregarAFavoritos, obtenerFavoritos, eliminarDeFavoritos } from '../controllers/Favoritos.controller.js';

const router = Router();

// Ruta para agregar un producto a Favoritos
router.post('/favoritos/agregar', agregarAFavoritos);

// Ruta para obtener los productos favoritos de un usuario
router.get('/favoritos/:userId', obtenerFavoritos);

// Ruta para eliminar un producto de Favoritos
router.post('/favoritos/eliminar', eliminarDeFavoritos);

export default router;
