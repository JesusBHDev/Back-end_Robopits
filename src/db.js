import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        mongoose.connect('mongodb+srv://20210648:uKCc4JJ0kvsy8n0F@cluster0.qrpmvnj.mongodb.net/?retryWrites=true&w=majority');
        console.log('===> La conexion se realizo correctamente');
    } catch (error) {
        console.log(error);
    }
}