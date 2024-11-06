import Favoritos from '../models/Favoritos.model.js';
import Producto from '../models/Producto.model.js';


// Agregar un producto a Favoritos con información completa
export const agregarAFavoritos = async (req, res) => {
    const { userId, productoId } = req.body;

    try {
        // Verifica si el producto existe en la colección de productos
        const producto = await Producto.findById(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        let favorito = await Favoritos.findOne({ userId });

        if (!favorito) {
            // Crea un nuevo documento de favoritos si no existe para este usuario
            favorito = new Favoritos({ userId, productos: [productoId] });
        } else {
            // Agrega el producto solo si no está ya en favoritos
            if (!favorito.productos.includes(productoId)) {
                favorito.productos.push(productoId);
            }
        }

        await favorito.save();

        // Devuelve el producto completo en la respuesta
        const favoritoConDetalle = await Favoritos.findById(favorito._id).populate('productos');
        res.status(200).json({ message: 'Producto agregado a Favoritos', favorito: favoritoConDetalle });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar a Favoritos', error });
    }
};

// Obtener los productos favoritos de un usuario
export const obtenerFavoritos = async (req, res) => {
    try {
        const favorito = await Favoritos.findOne({ userId: req.params.userId }).populate('productos');
        if (!favorito) {
            return res.status(404).json({ message: 'No se encontraron favoritos para este usuario' });
        }
        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Favoritos', error });
    }
};

// Eliminar un producto de Favoritos
export const eliminarDeFavoritos = async (req, res) => {
  const { userId, productoId } = req.body;

  try {
    const favorito = await Favoritos.findOne({ userId });

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
