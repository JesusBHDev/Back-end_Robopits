import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ResetPass = new Schema({
    ip: String,
    fecha: { type: Date, default: Date.now },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    motivo: String

});

export default mongoose.model("ResetPass", ResetPass);

