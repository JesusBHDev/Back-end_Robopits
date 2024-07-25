import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Nombre: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Telefono: {
      type: String,
      default: '',  // Correcto, define un valor por defecto para el teléfono
    },
    Tipo: {
      type: String,
      default: 'Ninguno',  // Correcto, define un valor por defecto para el teléfono
    },
  },
  {
    timestamps: true,  // Esto creará automáticamente campos para 'createdAt' y 'updatedAt'
  }
);

export default mongoose.model("User", userSchema);