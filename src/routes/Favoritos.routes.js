// routes/favoritos.routes.js
import { Router } from 'express';
const router = express.Router();
const { agregarAFavoritos, obtenerFavoritos, eliminarDeFavoritos } = require('../controllers/Favoritos.controller.js');

// Ruta para agregar un producto a Favoritos
router.post('/favoritos/agregar', agregarAFavoritos);

// Ruta para obtener los productos favoritos de un usuario
router.get('/favoritos/:userId', obtenerFavoritos);

// Ruta para eliminar un producto de Favoritos
router.post('/favoritos/eliminar', eliminarDeFavoritos);

module.exports = router;
