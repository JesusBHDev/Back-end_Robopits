import mongoose from "mongoose";

const ventasSchema = new mongoose.Schema({
  Cliente: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Productos: {
    type: String,
  },
  CantidadPro: {
    type: String,
  },
  Subtotal: {
    type: Number,
  },
  Total: {
    type: Number,
  },
  IVA: { type: Number },

  Descuento: {
    type: Number,
  },
  Estado: {
    type: String,
  },
});

export default mongoose.model("Ventas", ventasSchema);
