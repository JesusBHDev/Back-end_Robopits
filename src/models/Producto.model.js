import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
    {
        IdProducto: {
            type: String,
            required: true,
            unique: true
        },
        Imagen: {
            type: String,
            required: true // Añadido required para asegurar que la imagen del producto sea obligatoria
        },
        NameProducto: {
            type: String,
            required: true // Añadido required para asegurar que el nombre del producto sea obligatorio
        },
        Precio: {
            type: Number,
            required: true, // Añadido required para asegurar que el precio del producto sea obligatorio
            min: 0 // Añadido min para asegurar que el precio no sea negativo
        },
        Categoria: {
            type: String,
            required: true // Añadido required para asegurar que la categoría del producto sea obligatoria
        },
        Existencias: {
            type: Number,
            required: true, // Añadido required para asegurar que las existencias del producto sean obligatorias
            min: 0 // Añadido min para asegurar que las existencias no sean negativas
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

export default mongoose.model("Producto", productoSchema);
