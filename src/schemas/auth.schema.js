import { z } from "zod";

export const registerSchema = z.object({
    Nombre: z.string({
        required_error: "Nombre es requerido",
    }),
    Email: z.string({
        required_error: "el correro es requerido",
    }).email({
        message:"correo invalido xd",
    }),
    Password: z.string({
        required_error: "la contraseña es requerida",
    }).min(8,{
        message:"la contraseña min de 8",
    })
});

export const loginSchema = z.object({
    Email: z.string({
        required_error:"el correo es requerido",
    }).email({
        message: "coLOCA BIEN TU CORREO WEY",
    }),
    Password: z.string({
        required_error: "la contra es requerida",
    }).min(8,{
        message: "la contraseña min es de 8",
    }),
});