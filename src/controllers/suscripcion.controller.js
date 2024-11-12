// src/controllers/suscripcion.controller.js
import mongoose from 'mongoose';  // Asegúrate de importar mongoose
import Suscripcion from '../models/Suscripcion.model.js'; // Importa el modelo de suscripciones

export const guardarSuscripcion = async (req, res) => {
  const { subscription, userId } = req.body;

  // Asegúrate de que userId sea una cadena de 24 caracteres o un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "ID de usuario no válido" });
  }

  try {
    const suscripcionExistente = await Suscripcion.findOne({
      userId,
      'subscription.endpoint': subscription.endpoint,
    });

    if (!suscripcionExistente) {
      const nuevaSuscripcion = new Suscripcion({ userId, subscription });
      await nuevaSuscripcion.save();
      return res.status(201).json({ message: 'Suscripción guardada correctamente' });
    }

    return res.status(200).json({ message: 'La suscripción ya existe' });
  } catch (error) {
    console.error('Error al guardar la suscripción:', error);
    return res.status(500).json({ error: 'Error al guardar la suscripción' });
  }
};
