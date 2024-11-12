// src/config/notificaciones.js
import webPush from "web-push";
import Suscripcion from '../models/Suscripcion.model.js';
// Configura las claves VAPID
webPush.setVapidDetails(
  'mailto:jesus.bh.dev@gmail.com', // Cambia esto por tu correo electrónico
  'BJCNOQ2hE5mas0I1fxLOW22VOJOdfnwPjMzcVzDHRXKVe-rX6Jl9WXh-8aauQsqdv5GMBDHfyrIlYP47rObb-Ro',  // clave pública (tu clave generada)
  'JDTOjPk164EiVK7X4n1PmsyDqRor_-amlWxASuM9w74'  // clave privada (tu clave generada)
);

// Función para enviar una notificación
export const enviarNotificacion = async (subscription, payload) => {
    try {
      await webPush.sendNotification(subscription, payload);
      console.log('Notificación enviada exitosamente');
    } catch (error) {
      if (error.statusCode === 410) {
        console.warn('La suscripción ha expirado o se ha dado de baja. Eliminando de la base de datos...');
        
        // Eliminar la suscripción caducada de la base de datos
        await Suscripcion.findOneAndDelete({ "subscription.endpoint": subscription.endpoint });
      } else {
        console.error('Error al enviar notificación:', error);
      }
    }
  };