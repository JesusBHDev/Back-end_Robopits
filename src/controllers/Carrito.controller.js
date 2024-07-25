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
      carrito.items[itemIndex].image = producto.Imagen; // Actualizar la imagen por si ha cambiado
      carrito.items[itemIndex].name = producto.NameProducto; // Actualizar el nombre por si ha cambiado
    } else {
      // Si el producto no está en el carrito, agregarlo
      carrito.items.push({
        productId: productId,
        name: producto.NameProducto, // Agregar el nombre del producto
        quantity: quantity,
        price: producto.Precio,
        image: producto.Imagen // Agregar la imagen del producto
      });
    }
    // Actualizar las existencias del producto
    producto.Existencias -= quantity;
    await producto.save();
    await carrito.save();
    console.log(carrito)

    res.status(200).json({ message: "Producto agregado al carrito exitosamente", carrito });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el producto al carrito", error });
  }
};

// Asegúrate de que siempre se devuelva un array para carrito.items en el backend.
export const obtenerCarrito = async (req, res) => {
    const { userId } = req.params;
    console.log('ID del usuario:', userId);

    try {
        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const carrito = await Carro.findOne({ userId: userId }).populate('items.productId');
        if (!carrito) {
            return res.status(200).json({ carrito: { items: [] } });
        }

        res.status(200).json({ carrito });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ message: "Error al obtener el carrito", error });
    }
};

export const decrementarCantidadProducto = async (req, res) => {
  const { userId, productId } = req.body;
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
    let carrito = await Carro.findOne({ userId: userId });

    if (!carrito) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const itemIndex = carrito.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // Decrementar cantidad del producto en el carrito
      if (carrito.items[itemIndex].quantity > 1) {
        carrito.items[itemIndex].quantity -= 1;
        carrito.totalPrice -= producto.Precio;
      } else {
        // Si la cantidad es 1, eliminar el producto del carrito
        carrito.items.splice(itemIndex, 1);
        carrito.totalPrice -= producto.Precio;
      }
      producto.Existencias += 1; // Actualizar existencias del producto
      await producto.save();
      await carrito.save();
      return res.status(200).json({ message: "Producto decrementado del carrito exitosamente", carrito });
    } else {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al decrementar la cantidad del producto", error });
  }
};

export const incrementarCantidadProducto = async (req, res) => {
  const { userId, productId } = req.body;
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
    let carrito = await Carro.findOne({ userId: userId });

    if (!carrito) {
      carrito = new Carro({
        userId: userId,
        items: [],
        totalPrice: 0,
      });
    }

    const itemIndex = carrito.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // Incrementar cantidad del producto en el carrito
      carrito.items[itemIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      carrito.items.push({
        productId: productId,
        name: producto.NameProducto,
        quantity: 1,
        price: producto.Precio,
        image: producto.Imagen
      });
    }

    carrito.totalPrice += producto.Precio;
    producto.Existencias -= 1; // Actualizar existencias del producto
    await producto.save();
    await carrito.save();

    res.status(200).json({ message: "Producto incrementado en el carrito exitosamente", carrito });
  } catch (error) {
    res.status(500).json({ message: "Error al incrementar la cantidad del producto", error });
  }
};

export const eliminarProductoDelCarrito = async (req, res) => {
  const { userId, productId } = req.body;
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
    let carrito = await Carro.findOne({ userId: userId });

    if (!carrito) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const itemIndex = carrito.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // Eliminar producto del carrito
      carrito.totalPrice -= carrito.items[itemIndex].quantity * producto.Precio;
      producto.Existencias += carrito.items[itemIndex].quantity; // Actualizar existencias del producto
      carrito.items.splice(itemIndex, 1);
      await producto.save();
      await carrito.save();
      return res.status(200).json({ message: "Producto eliminado del carrito exitosamente", carrito });
    } else {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto del carrito", error });
  }
};
