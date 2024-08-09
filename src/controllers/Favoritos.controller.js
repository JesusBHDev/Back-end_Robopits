// controllers/favoritos.controller.js
const Favorito = require('../models/Favoritos.model.js');

// Agregar un producto a Favoritos
export const agregarAFavoritos = async (req, res) => {
  const { userId, productoId } = req.body;

  try {
    let favorito = await Favorito.findOne({ userId });

    if (!favorito) {
      favorito = new Favorito({ userId, productos: [productoId] });
    } else {
      if (!favorito.productos.includes(productoId)) {
        favorito.productos.push(productoId);
      }
    }

    await favorito.save();
    res.status(200).json({ message: 'Producto agregado a Favoritos', favorito });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a Favoritos', error });
  }
};

// Obtener los productos favoritos de un usuario
export const obtenerFavoritos = async (req, res) => {
  try {
    const favorito = await Favorito.findOne({ userId: req.params.userId }).populate('productos');
    res.status(200).json(favorito);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener Favoritos', error });
  }
};

// Eliminar un producto de Favoritos
export const eliminarDeFavoritos = async (req, res) => {
  const { userId, productoId } = req.body;

  try {
    const favorito = await Favorito.findOne({ userId });

    if (favorito) {
      favorito.productos = favorito.productos.filter(id => id.toString() !== productoId);
      await favorito.save();
      res.status(200).json({ message: 'Producto eliminado de Favoritos' });
    } else {
      res.status(404).json({ message: 'No se encontraron Favoritos para este usuario' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de Favoritos', error });
  }
};