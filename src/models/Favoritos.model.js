import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favoritoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }]
});

export default mongoose.model('Pedido', PedidoSchema);
