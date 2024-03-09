import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    IdProducto: {
      type: String,
    },
    Imagen: {
      type: String,
    },
    CodigoBarras: {
      type: Number,
    },
    NombreProducto: {
      type: String,
    },
    PrecioMenudeo: {
      type: Number,
      validate: {
        validator: function (value) {
          // Verifica si el valor es un número y tiene hasta 2 decimales
          return /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
        },
        message: "PrecioMenudeo debe ser un número con hasta 2 decimales.",
      },
    },
    PrecioMayoreo: {
      type: Number,
      validate: {
        validator: function (value) {
          // Verifica si el valor es un número y tiene hasta 2 decimales
          return /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
        },
        message: "PrecioMenudeo debe ser un número con hasta 2 decimales.",
      },
    },
    CantidadMayoreo: {
      type: Number,
    },
    Existencias: {
      type: Number,
    },
    DescripcionProducto: {
      type: String,
    },
    Categoria: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
