import Carro from '../models/Carro.model.js';
import User from '../models/user.model.js';
import Producto from '../models/Producto.model.js';

// Función para agregar un producto al carrito
export const agregarProductoAlCarrito = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log('ID del usuario:', userId); // Log para verificar el ID del usuario
  console.log('ID del producto:', productId); // Log para verificar el ID del producto

  try {
    // Verificar si el usuario existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el producto existe
    const producto = await Producto.findById(productId);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Verificar si el carrito del usuario ya existe
    let carrito = await Carro.findOne({ userId: userId });
    
    if (!carrito) {
      // Crear un nuevo carrito si no existe
      carrito = new Carro({
        userId: userId,
        items: [],
        totalPrice: 0,
      });
    }

    // Verificar si el producto ya está en el carrito
    const itemIndex = carrito.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      carrito.items[itemIndex].quantity += quantity;
      carrito.items[itemIndex].price = producto.Precio; // Actualizar el precio por si ha cambiado
    } else {
      // Si el producto no está en el carrito, agregarlo
      carrito.items.push({
        productId: productId,
        quantity: quantity,
        price: producto.Precio,
      });
    }

    // Guardar el carrito actualizado
    await carrito.save();

    res.status(200).json({ message: "Producto agregado al carrito exitosamente", carrito });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el producto al carrito", error });
  }
};
