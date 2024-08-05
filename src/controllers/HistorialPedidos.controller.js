import Pedido from '../models/Pedido.model.js';
import HPedidos from '../models/HistorialPedidos.js'; // Asegúrate de que esto está importado correctamente

// Función para mover un pedido al historial
export const moverPedidoAlHistorial = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    const historialPedido = new HPedidos({
      informacion: {
        cliente: pedido.cliente,
        productos: pedido.productos,
        descuento: pedido.descuento,
        totalproductos: pedido.totalproductos,
        total: pedido.total,
        direccion: pedido.direccion,
        puntoDeRetiro: pedido.puntoDeRetiro,
        estado: pedido.estado,
        createdAt: pedido.createdAt,
        updatedAt: pedido.updatedAt
      }
    });

    await historialPedido.save();
    await Pedido.findByIdAndDelete(id);

    res.status(200).json({ message: 'Pedido movido al historial correctamente' });
  } catch (error) {
    console.error('Error moviendo el pedido al historial:', error);
    res.status(500).json({ message: 'Error moviendo el pedido al historial' });
  }
};

// Función para obtener todo el historial de pedidos
export const obtenerHistorialDePedidos = async (req, res) => {
  try {
    const historial = await HPedidos.find();

    if (!historial) {
      return res.status(404).json({ message: 'Historial de pedidos no encontrado' });
    }

    res.status(200).json(historial);
  } catch (error) {
    console.error('Error obteniendo el historial de pedidos:', error);
    res.status(500).json({ message: 'Error obteniendo el historial de pedidos' });
  }
};
