import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { createAccessToken } from '../libs/jwt.js'
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const {Nombre, Email, Password} = req.body

    try {
        const passwordHash = await bcrypt.hash(Password, 10);

        const newUser = new User({
            Nombre,
            Email,
            Password : passwordHash,
        });
    
        const userSaved = await newUser.save();
        const token = await createAccessToken({id: userSaved._id});

        res.cookie('token', token);
        res.json({
            message: 'Usuario registrado correctamente.',
            id: userSaved._id,
            Nombre: userSaved.Nombre,
            Email: userSaved.Email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })

    }catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.Email) {
            // Código 11000 indica una violación de unicidad (correo electrónico duplicado)
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        console.error('Error en la solicitud de registro:', error);
        res.status(500).json({ message: 'Error interno en el servidor' });
    }
};

export const login = async (req, res) => {
    const {Email, Password} = req.body

    try {

        const userFound = await User.findOne({Email})

        if (!userFound) return res.status(400).json({message: "Usuario no encontrado"})
        
        const isMatch = await bcrypt.compare(Password, userFound.Password);

        if (!isMatch) return res.status(400).json({message: "Contra incorrecta"})

        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token);
        res.json({
            message: 'Bienvenido a la nuestra pagina web',
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

export const logout = (req, res) =>{
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id)
   
    if(!userFound) return res.status(400).json({message: "usuario no encontrado"});

    return res.json({
        id:userFound._id,
        username: userFound.Nombre,
        email: userFound.Email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

    res.send("holi profile")
}

export const forgotPassword = async (req, res, next) =>{
    const { Email } = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Crear un token único con una expiración de 2 minutos
        const token = jwt.sign({ userId: user._id }, TOKEN_SECRET, { expiresIn: '2m' });

        // Configurar nodemailer para enviar el correo electrónico
        const transporter = nodemailer.createTransport({
            // Configura tu proveedor de correo electrónico aquí
            service: 'gmail',
            auth: {
                user: 'monitorenergysmart@gmail.com',
                pass: 'wytlimdspzeqtaev',
            },
        });

        // Configurar el enlace de restablecimiento de contraseña
        const resetLink = `http://localhost:3000/PasswordReset?token=${token}`;

        // Configurar el correo electrónico
        const mailOptions = {
            from: 'monitorenergysmart@gmail.com',
            to: user.Email,
            subject: 'Restablecimiento de Contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo electrónico de restablecimiento de contraseña enviado.' });

    } catch (error) {
        console.error('Error en forgotPassword:', error);
        res.status(500).json({ message: 'Error interno en el servidor.' });
    }

};

export const PasswordReset = async (req, res, next) =>{
    const { token, Password } = req.body;

    try {
        // Verificar el token
        const decoded = jwt.verify(token, TOKEN_SECRET);

        // Verificar si el token ha expirado
        if (Date.now() > decoded.exp * 1000) {
            return res.status(401).json({ message: 'El token ha expirado.' });
        }

        // Actualizar la contraseña en la base de datos
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Actualizar la contraseña con la nueva contraseña hasheada
        const PasswordHash = await bcrypt.hash(Password, 10);
        user.Password = PasswordHash;
        await user.save();

        res.status(200).json({ message: 'Contraseña restablecida exitosamente.' });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado.' });
        }

        console.error('Error en PasswordReset:', error);
        res.status(500).json({ message: 'Error interno en el servidor.' });
    }
};