import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema(
  {
    Nombre: {
      type: String, 
      require: true,
    },
    Email: {
      type: String,
      require: true,
      // trim: true, //funciona para quitar los espacios en balnco y deja solo el texto de enmedio
      unique: true,
    },
    Password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Empleado", empleadoSchema);