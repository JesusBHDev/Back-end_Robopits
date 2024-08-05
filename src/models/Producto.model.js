import mongoose from "mongoose";
import autoIncrementFactory from 'mongoose-sequence';

const productoSchema = new mongoose.Schema(
    {
        IdProducto: {
            type: Number, // Cambiado de String a Number para usar el autoincremento
            unique: true
        },
        Imagen: {
            type: String,
            required: true
        },
        NameProducto: {
            type: String,
            required: true
        },
        Precio: {
            type: Number,
            required: true,
            min: 0
        },
        Categoria: {
            type: String,
            required: true
        },
        Existencias: {
            type: Number,
            required: true,
            min: 0
        },
        Descripcion: {
            type: String,
            required: true 
        },
        Caracteristicas: {
            type: String,
            required: true 
        },
        Incluye: {
            type: String,
            required: true 
        }
    },
    {
        timestamps: true,
    }
);

// Inicializa autoIncrement
const autoIncrement = autoIncrementFactory(mongoose);
productoSchema.plugin(autoIncrement, { inc_field: 'IdProducto', start_seq: 36 });

export default mongoose.model("Producto", productoSchema);
