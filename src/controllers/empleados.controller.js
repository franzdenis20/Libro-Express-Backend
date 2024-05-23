import Empleados from '../models/empleados.model.js'

import {createAccessToken} from '../libs/jwt.js'
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {TOKEN_SECRET} from '../config.js'



export const registerEmpleado = async (req, res) => {

    const {username, email, password,sede,numero } = req.body

    try {

        //validamos el correo

        const userFound = await Empleados.findOne({email});

        if(userFound){
            return res.status(400).json(["El Correo ya esta en uso"])
        }

        //const passwordHash = await bcrypt.hash(password, 10)//hjgjhg
        const newEmpleado = new Empleados({
            username,
            email,
            password,
            numero,
            sede
        })

       await newEmpleado.save();

       

    } catch (error) {
        res.status(500).json({message: error.message});
    }

};


// obtener los boletos de un viaje

export const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleados.find();
        if (empleados.length === 0) {
            return res.status(404).json({ message: 'En esta sede no se encuentran empleados registrados' });
        }
        res.json(empleados);
    } catch (error) {
        if (!res.headersSent) {
            return res.status(400).json({ message: "Empleados no encontrados" });
        }
    }
};

// Eliminar Empleados

export const deleteEmpleado = async (req, res) => {

    try {
        const empleado = await Empleados.findByIdAndDelete(req.params.id)
        
        if (!empleado) return res.status(404).json({ message: 'Empleado not found' })

        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({ message: "Empleado no encontrado" })
    }
};


