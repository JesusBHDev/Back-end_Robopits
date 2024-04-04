import jwt from 'jsonwebtoken';
import { ADMIN_SECRET } from "../config.js";

export function createAccessAdmin(payload){
   return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            ADMIN_SECRET,
        {
            expiresIn: "1d",
        },
        (err, admin) => {
            if (err) reject(err)
            resolve(admin)
        }
        );
    })
}
