import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definición del esquema para el carrito de compras
const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
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
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para calcular el precio total antes de guardar
CartSchema.pre('save', function(next) {
  this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Cart', CartSchema);

