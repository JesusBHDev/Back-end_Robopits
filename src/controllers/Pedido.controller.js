//CONTROLADOR
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
      puntoDeRetiro: "Pendiente", // Se actualizará más tarde por el administrador
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
    console.log(error)
  }
};

export const obtenerPedidosCliente = async (req, res) => {
  const { userId } = req.params;

  try {
    const pedidos = await Pedido.find({ 'cliente.id': userId });
    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: "No se encontraron pedidos para este cliente" });
    }
    res.status(200).json({ pedidos });
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

export const obtenerPedidosPendientes = async (req, res) => {
  try {
    // Solo se recuperan los pedidos donde el estado es 'Pendiente'
    const pedidos = await Pedido.find({ estado: 'Pendiente' });
    res.status(200).json({ pedidos });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos pendientes", error });
  }
};

export const obtenerPedidosListos = async (req, res) => {
  try {
    // Solo se recuperan los pedidos donde el estado es 'Listo'
    const pedidos = await Pedido.find({ estado: 'Listo' });
    res.status(200).json({ pedidos });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos listos", error });
  }
};

export const actualizarPedido = async (req, res) => {
  const { id } = req.params;
  const { descuento, puntoDeRetiro, estado } = req.body;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    pedido.descuento = descuento !== undefined ? descuento : pedido.descuento;
    pedido.puntoDeRetiro = puntoDeRetiro || pedido.puntoDeRetiro;
    pedido.estado = estado || pedido.estado;

    await pedido.save();
    res.status(200).json({ message: "Pedido actualizado correctamente", pedido });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

export const eliminarPedido = async (req, res) => {
  
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) return res.status(404).json({ message: "pedido no eliminada" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
};

export const estadoPedidos = async (req, res) => {
  const { estado } = req.params; // Obtenemos el estado desde los parámetros de la ruta

  // Verificamos si el estado proporcionado es válido
  const estadosValidos = ['Pendiente', 'En preparacion', 'Listo', 'Cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  try {
    // Buscamos los pedidos que coinciden con el estado proporcionado
    const pedidos = await Pedido.find({ estado });
    
    // Respondemos con los pedidos encontrados
    res.status(200).json(pedidos);
  } catch (error) {
    // Manejamos cualquier error que ocurra durante la búsqueda
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};