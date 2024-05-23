import User from '../models/user.model.js';
import Empleados from '../models/empleados.model.js'
import Administradores from '../models/admin.model.js'
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken';

import { TOKEN_SECRET } from '../config.js'


export const register = async (req, res) => {

    const { email, password, username } = req.body

    try {

        //validamos el correo

        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json(["El Correo ya esta en uso"])
        }

        const passwordHash = await bcrypt.hash(password, 10)//hjgjhg
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })

        const userSaved = await newUser.save();

        // Guardad token en coockie

        const token = await createAccessToken({ id: userSaved.id })

        res.cookie('token', token, { secure: true, sameSite: 'None', });



        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,

        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario en la colección User
        const userFound = await User.findOne({ email });

        // Si se encuentra un usuario en User
        if (userFound) {
            // Compara la contraseña
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) return res.status(400).json({ message: "La contraseña es incorrecta" });

            // Guarda el token en la cookie
            const token = await createAccessToken({ id: userFound.id });
            res.cookie('token', token, { secure: true, sameSite: 'None' });

            // Envía la respuesta
            return res.json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updateAt: userFound.updatedAt,
            });
        }

        // Busca el usuario en la colección Administradores
        const userAdmin = await Administradores.findOne({ email });
        if (userAdmin) {
            // Compara la contraseña
            const isMatch = (password === userAdmin.password);
            if (!isMatch) return res.status(400).json({ message: "La contraseña es incorrecta" });

            // Guarda el token en la cookie
            const token = await createAccessToken({ id: userAdmin.id });
            res.cookie('token', token, { secure: true, sameSite: 'None' });

            // Envía la respuesta
            return res.json({
                id: userAdmin.id,
                username: userAdmin.username,
                email: userAdmin.email,
                categoria: userAdmin.categoria,
            });
        }

        // Busca el usuario en la colección Empleados
        const userEmpleado = await Empleados.findOne({ email });
        if (userEmpleado) {
            // Compara la contraseña
            const isMatch = (password === userEmpleado.password);
            if (!isMatch) return res.status(400).json({ message: "La contraseña es incorrecta" });

            // Guarda el token en la cookie
            const token = await createAccessToken({ id: userEmpleado.id });
            res.cookie('token', token, { secure: true, sameSite: 'None' });

            // Envía la respuesta
            return res.json({
                id: userEmpleado.id,
                username: userEmpleado.username,
                email: userEmpleado.email,
                sede: userEmpleado.sede,
                createdAt: userEmpleado.createdAt,
                updateAt: userEmpleado.updatedAt,
            });
        }

        // Si no se encontró ningún usuario
        return res.status(400).json({ message: "El correo no existe" });
    } catch (error) {
        // Si ocurre un error
        return res.status(500).json({ message: error.message });
    }
};



// se cierra secion
export const logout = (req, res) => {

    res.cookie('token', "", {
        expires: new Date(0),
    });

    return res.sendStatus(200);
}



export const profile = async (req, res) => {
    // el user lo recivimos de validetaToken
    console.log(req.user)


    const userFount = await User.findById(req.user.id);
    console.log(userFount);
    //if(!userFound) return res.status(400).json({message:"User not found"});

    return res.json({
        id: userFount.id,
        username: userFount.username,
        email: userFount.email,
        createdAt: userFount.createdAt,
        updateAt: userFount.updatedAt,

    })

}


// Validamos token mediante las cookies

export const verifyToken = async (req, res) => {

    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "Token no Autorizado" })


    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        let aux = false;
        if (err) return res.status(401).json({ message: "Token jwt no autorizado" })

        const userFound = await User.findById(user.id)
        if (userFound) {
            if (!userFound) return res.status(401).json({ message: "Token no autroizado id" })

            return res.json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            })
            
        }
        const userAdmin = await Administradores.findById(user.id)
        if(userAdmin){
            
            

            res.json({
                id: userAdmin.id,
                username: userAdmin.username,
                email: userAdmin.email,
                categoria: userAdmin.categoria,
               

            })
            aux = true;
        }

        if(!aux){
            const userEmpleado = await Empleados.findById(user.id)
            if (!userEmpleado) return res.status(401).json({ message: "Token no autroizado id" })

            res.json({
                id: userEmpleado.id,
                username: userEmpleado.username,
                email: userEmpleado.email,
                sede: userEmpleado.sede,
               

            })
        }

    })



}