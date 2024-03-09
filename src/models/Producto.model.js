import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
    {
        IdProducto:{
            type: String 
        },
        Imagen:{
            type: String 
        },
        NameProducto:{
            type: String,
        },
        Precio:{
            type: Number,
        },
        Categoria:{
            type: String,
        },
        Existencias:{
            type: Number,
        },
        Descripcion:{
            type: String,
        },
        Caracteristicas:{
            type: String,
        },
        Incluye:{
            type: String,
        }

    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Producto", productoSchema);