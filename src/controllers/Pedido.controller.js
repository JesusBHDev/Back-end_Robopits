import Pedido from '../models/Pedido.model.js'; // Asegúrate de que la ruta sea correcta
import Carro from '../models/Carro.model.js';
import User from '../models/user.model.js';

// Función para crear un nuevo pedido
export const crearPedido = async (req, res) => {
  const { userId, direccion, descuento } = req.body;

  try {
    const usuario = await User.findById(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const carrito = await Carro.findOne({ userId: userId }).populate('items.productId');
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío o no existe" });
    }

    const productos = carrito.items.map(item => ({
      productId: item.productId._id,
      name: item.name, // Asegúrate de que el nombre del producto esté siendo asignado
      quantity: item.quantity,
      price: item.price,
      image: item.image
    }));
    console.log(productos)
    const total = carrito.totalPrice - (descuento || 0);

    const nuevoPedido = new Pedido({
      cliente: {
        id: usuario._id,
        nombre: usuario.Nombre
      },
      productos: productos,
      descuento: descuento || 0,
      total: total,
      direccion: direccion,
      puntoDeRetiro: "", // Se actualizará más tarde por el administrador
      estado: "Pendiente"
    });

    await nuevoPedido.save();

    // Opcional: Vaciar el carrito después de crear el pedido
    carrito.items = [];
    carrito.totalPrice = 0;
    await carrito.save();

    res.status(201).json({ message: "Pedido creado exitosamente", pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error });
  }
};

export const obtenerPedidosCliente = async (req, res) => {
  const { userId } = req.params;

  try {
    const pedidos = await Pedido.find({ 'cliente.id': userId });
    if (!pedidos) {
      return res.status(404).json({ message: "No se encontraron pedidos para este cliente" });
    }
    res.status(200).json([pedidos]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};

export const obtenerTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json({ pedidos });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};
