import Carro from '../models/Carro.model.js';
import User from '../models/user.model.js';
import Producto from '../models/Producto.model.js';

export const agregarProductoAlCarrito = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  console.log('ID del usuario:', userId);
  console.log('ID del producto:', productId);

  try {
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const producto = await Producto.findById(productId);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    if (producto.Existencias < quantity) {
      return res.status(400).json({ message: "No hay suficientes existencias del producto" });
    }
    let carrito = await Carro.findOne({ userId: userId });

    if (!carrito) {
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
    // Actualizar las existencias del producto
    producto.Existencias -= quantity;
    await producto.save();
    await carrito.save();

    res.status(200).json({ message: "Producto agregado al carrito exitosamente", carrito });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el producto al carrito", error });
  }
};


export const obtenerCarrito = async (req, res) => {
  const { userId } = req.params;
  console.log('ID del usuario:', userId);

  try {
    // Verificar si el usuario existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtener el carrito del usuario
    const carrito = await Carro.findOne({ userId: userId }).populate('items.productId');
    if (!carrito) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.status(200).json({ carrito });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};