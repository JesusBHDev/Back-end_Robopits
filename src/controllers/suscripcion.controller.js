// src/controllers/suscripcion.controller.js
import Suscripcion from '../models/Suscripcion.model.js';

export const guardarSuscripcion = async (req, res) => {
  const { subscription, userId } = req.body;  // Espera recibir `subscription` y `userId` en el cuerpo de la solicitud

  console.log('User ID recibido:', userId); // Esto debería mostrar el userId en el servidor
  console.log('Suscripción recibida:', subscription);
  
  try {
    // Revisa si ya existe una suscripción para este usuario
    const suscripcionExistente = await Suscripcion.findOne({ userId });
    if (suscripcionExistente) {
      // Actualiza la suscripción si ya existe
      suscripcionExistente.subscription = subscription;
      await suscripcionExistente.save();
      return res.status(200).json({ message: 'Suscripción actualizada correctamente' });
    }

    // Si no existe, crea una nueva suscripción
    const nuevaSuscripcion = new Suscripcion({
      userId,
      subscription
    });
    await nuevaSuscripcion.save();
    res.status(201).json({ message: 'Suscripción guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar suscripción:', error);
    res.status(500).json({ error: 'Error al guardar la suscripción' });
  }
};
