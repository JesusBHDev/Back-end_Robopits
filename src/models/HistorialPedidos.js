import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definición del esquema para el historial de pedidos
const HistorialPedidosSchema = new Schema({
  informacion: {
    type: new Schema({
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
    }),
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  totalPedidos: {
    type: Number,
    default: 0
  },
  totalProductos: {
    type: Number,
    default: 0
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

// Middleware para actualizar los campos `count`, `totalPedidos` y `totalProductos`
HistorialPedidosSchema.pre('save', function(next) {
  this.count = 1; // Cada documento es un pedido, por lo que count siempre es 1
  this.totalPedidos = this.informacion.total;
  this.totalProductos = this.informacion.totalproductos;
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('HPedidos', HistorialPedidosSchema);
