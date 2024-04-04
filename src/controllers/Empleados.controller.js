import Empleado from "../models/Empleado.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { createAccessAdmin } from "../libs/jwt2.js";
import { ADMIN_SECRET } from "../config.js";

export const registro = async (req, res) => {
  const { Nombre, Email, Password } = req.body;

  try {

    const userFound = await Empleado.findOne({Email})
        if(userFound) return res.status(400).json(["el correo ya esta en uso"])

    const passwordHash = await bcrypt.hash(Password, 10);

    const newEmpleado = new Empleado({
      Nombre,
      Email,
      Password: passwordHash,
    });

    const empleadoSaved = await newEmpleado.save();
    const admin = await createAccessAdmin({ id: empleadoSaved._id });

    res.cookie('admin', admin);
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
  const {Email, Password} = req.body

  try {

      const userFound = await Empleado.findOne({Email})

      if (!userFound) return res.status(400).json({message: "Usuario no encontrado"})
      
      const isMatch = await bcrypt.compare(Password, userFound.Password);

      if (!isMatch) return res.status(400).json({message: "Contra incorrecta"})

      const admin = await createAccessAdmin({id: userFound._id});
      console.log(admin);

      res.cookie('admin', admin);

      res.json({
          id: userFound._id,
          Nombre: userFound.Nombre,
          Email: userFound.Email,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,

      })

  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

export const verifyTokenEmpleado = async (req, res) =>{
  const {admin} = req.cookies

  if(!admin) return res.status(401).json({message:"no autorizado"});

  jwt.verify(admin, ADMIN_SECRET, async (err, empleado) =>{
      if(err) return res.status(401).json({message:"no autorizado"});

      const userFound =  await Empleado.findById(empleado.id)
      if(!userFound) res.status(401).json({message:"no autorizado"})

      return res.json({
          id :userFound._id,
          Nombre: userFound.Nombre,
          Email: userFound.Email
      });

  })
}