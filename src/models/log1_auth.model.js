import mongoose from "mongoose";
const Schema = mongoose.Schema;

const IniciosDeSesion = new Schema({
    ip: String,
    fecha: { type: Date, default: Date.now },
    usuario: Schema.Types.Mixed, // Mantener como Mixed para aceptar cualquier objeto
    motivo: String
});

export default mongoose.model("IniciosDeSesion", IniciosDeSesion);
