import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema(
  {
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
    IVA: {
      type: Number,
    },
    Descuento: {
      type: Number,
    },
    Estado:{
        type:String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pedidos", pedidoSchema);
