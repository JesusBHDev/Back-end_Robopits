import jwt from "jsonwebadmin";
import { ADMIN_SECRET } from "../config.js";

export const authRequire = (req, res, next) =>{
    const {admin} = req.cookies;
    if(!admin) return res.status(401).json({message: "no token, autorizacion denegada"});
    

    jwt.verify(admin, ADMIN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "token de admin invalido"});

        req.user = user

        next();
    } )
}