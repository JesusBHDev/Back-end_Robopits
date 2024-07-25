import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definición del esquema para el pedido
const PedidoSchema = new Schema({
  cliente: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    nombre: {
      type: String,
    }
  },
  productos: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    }
  ],
  descuento: {
    type: Number,
    default: 0
  },
  totalproductos: {
    type: Number
  },
  total: {
    type: Number,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  puntoDeRetiro: {
    enum: ['Pendiente','Parque Poblamiento', 'Centro de huejutla'],
    type: String,
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'En preparacion', 'Listo', 'Cancelado'],
    default: 'Pendiente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

// Middleware para calcular el total de productos y el precio total antes de guardar
PedidoSchema.pre('save', function(next) {
  this.total = this.productos.reduce((total, item) => total + item.price * item.quantity, 0) - this.descuento;
  this.totalproductos = this.productos.reduce((total, item) => total + item.quantity, 0);
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Pedido', PedidoSchema);
