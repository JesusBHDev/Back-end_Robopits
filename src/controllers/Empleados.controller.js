import Empleado from "../models/Empleado.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createAccessAdmin } from "../libs/jwt2.js";
import { ADMIN_SECRET } from "../config.js";

export const registro = async (req, res) => {
  const { Nombre, Email, Password } = req.body;
  try {
    const userFound = await Empleado.findOne({ Email });
    if (userFound) return res.status(400).json(["el correo ya esta en uso"]);
    const passwordHash = await bcrypt.hash(Password, 10);
    const newEmpleado = new Empleado({ Nombre, Email, Password: passwordHash });
    const empleadoSaved = await newEmpleado.save();
    const admin = await createAccessAdmin({ id: empleadoSaved._id });
    res.cookie("admin", admin);
    res.json({
      message: "Empleado registrado correctamente.",
      id: empleadoSaved._id,
      Nombre: empleadoSaved.Nombre,
      Email: empleadoSaved.Email,
      createdAt: empleadoSaved.createdAt,
      updatedAt: empleadoSaved.updatedAt,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.Email) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado." });
    }
    console.error("Error en la solicitud de registro:", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const inicio = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const userFound = await Empleado.findOne({ Email });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(Password, userFound.Password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Contraseña incorrecta" });
    }

    const admin = await createAccessAdmin({ id: userFound._id });
    console.log(admin);

    res.status(200).json({
      id: userFound._id,
      Nombre: userFound.Nombre,
      Email: userFound.Email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      message: "Inicio de sesión admin exitoso",
      admin: admin
    });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export const verifyTokenEmpleado = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "No hay token" });

  const adminToken = authHeader.split(' ')[1];
  if (!adminToken) return res.status(401).json({ message: "No hay token" });

  jwt.verify(adminToken, ADMIN_SECRET, async (err, empleado) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    try {
      const userFound = await Empleado.findById(empleado.id);
      if (!userFound) return res.status(401).json({ message: "No autorizado" });

      return res.json({
        id: userFound._id,
        Nombre: userFound.Nombre,
        Email: userFound.Email,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error del servidor" });
    }
  });
};

// New function to retrieve all employees
export const getAllEmployees = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
};

// New function to delete an employee by ID
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmpleado = await Empleado.findByIdAndDelete(id);
    if (!deletedEmpleado) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.status(200).json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).json({ message: 'Error interno en el servidor' });
  }
};

export const updateEmpleado = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Email, Password } = req.body;

  try {
    const empleado = await Empleado.findById(id);
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    empleado.Nombre = Nombre || empleado.Nombre;
    empleado.Email = Email || empleado.Email;
    if (Password) {
      empleado.Password = await bcrypt.hash(Password, 10);
    }

    const updatedEmpleado = await empleado.save();
    res.json({
      message: "Empleado actualizado correctamente",
      empleado: updatedEmpleado,
    });
  } catch (error) {
    console.error("Error actualizando empleado:", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};