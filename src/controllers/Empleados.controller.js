import Empleado from "../models/Empleado.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { createAccessToken } from '../libs/jwt.js';
import { TOKEN_SECRET } from "../config.js";

export const registro = async (req, res) => {
  const { Nombre, Email, Password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(Password, 10);

    const newEmpleado = new Empleado({
      Nombre,
      Email,
      Password: passwordHash,
    });

    const empleadoSaved = await newEmpleado.save();
    const token = await createAccessToken({ id: empleadoSaved._id });

    res.cookie('token', token);
    res.json({
      message: 'Empleado registrado correctamente.',
      id: empleadoSaved._id,
      Nombre: empleadoSaved.Nombre,
      Email: empleadoSaved.Email,
      createdAt: empleadoSaved.createdAt,
      updatedAt: empleadoSaved.updatedAt,
    });

  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.Email) {
      // Código 11000 indica una violación de unicidad (correo electrónico duplicado)
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    console.error('Error en la solicitud de registro:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
};

export const inicio = async (req, res) => {
    const { Email, Password } = req.body

    try {
        const empleadoFound = await Empleado.findOne({ Email });

        if (!empleadoFound) {
            return res.status(400).json({ message: "Empleado no encontrado" });
        }

        const isMatch = await bcrypt.compare(Password, empleadoFound.Password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccessToken({ id: empleadoFound._id });

        // Imprimir el token en la consola del servidor
        console.log('Token generado:', token);

        res.cookie('token', token);
        res.json({
            message: 'Bienvenido a nuestra página web',
            id: empleadoFound._id,
            Nombre: empleadoFound.Nombre,
            Email: empleadoFound.Email,
            createdAt: empleadoFound.createdAt,
            updatedAt: empleadoFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
