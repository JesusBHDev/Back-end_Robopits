import mongoose from "mongoose";
import autoIncrementFactory from 'mongoose-sequence';

const ofertaSchema = new mongoose.Schema(
    {
        IdOferta: {
            type: Number,
            unique: true
        },
        Imagen: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        PrecioOriginal: {
            type: Number,
            required: true,
            min: 0
        },
        PrecioOferta: {
            type: Number,
            required: true,
            min: 0
        },
        FechaInicio: {
            type: Date,
            required: true
        },
        FechaFin: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true, 
    }
);


const autoIncrement = autoIncrementFactory(mongoose);
ofertaSchema.plugin(autoIncrement, { inc_field: 'IdOferta', start_seq: 1 });

export default mongoose.model("Oferta", ofertaSchema);
