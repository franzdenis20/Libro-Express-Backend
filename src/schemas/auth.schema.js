import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: "EL nombre de usurio es requerido",
    }),
    email: z.string({
        required_error: "El correo es requerido",
    })
        .email({
            message: "El correo no es valido"
        }),
    password: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(6, {
            message: "La contraseña debe ser como minimo 6 caracteres"
        }),
});



export const loginSchema = z.object({
    email: z.string({
        required_error: "El correo es requerido",
    })
        .email({
            message: "El Correo no es valido"
        }),
    password: z
        .string({
            required_error: "La contraseña es requerida",
        })
        .min(6, {
            message: "La contraseña al menos debe tener 6 caracteres"
        }),

})