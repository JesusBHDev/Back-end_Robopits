// src/models/Suscripcion.model.js
import mongoose from 'mongoose';

const SuscripcionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Aquí hacemos referencia al modelo "User"
    required: true
  },
  subscription: {
    endpoint: {
      type: String,
      required: true
    },
    keys: {
      p256dh: {
        type: String,
        required: true
      },
      auth: {
        type: String,
        required: true
      }
    }
  }
});

export default mongoose.model('Suscripcion', SuscripcionSchema);
