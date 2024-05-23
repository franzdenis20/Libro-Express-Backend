import Administradores from '../models/admin.model.js'





export const registerAdmin = async (req, res) => {

    const {username, email, password,categoria,numero } = req.body

    try {

        //validamos el correo

        const userFound = await Administradores.findOne({email});

        if(userFound){
            return res.status(400).json(["El Correo ya esta en uso"])
        }

        //const passwordHash = await bcrypt.hash(password, 10)//hjgjhg
        const newAdmin = new Administradores({
            username,
            email,
            password,
            numero,
            categoria
        })

        const userSaved = await newAdmin.save();

        

        res.json({
             id: userSaved.id,
             username:userSaved.username,
             email:userSaved.email,
             categoria: userSaved.sede,
             
             
         })
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};


// obtener los boletos de un viaje

export const getAdministradores = async (req, res) => {
    try {
        const administardores = await Administradores.find();
        if (administardores.length === 0) {
            return res.status(404).json({ message: 'No hay Administradores registrados' });
        }
        res.json(administardores);
    } catch (error) {
        if (!res.headersSent) {
            return res.status(400).json({ message: "Administradores no encontrados" });
        }
    }
};

// Eliminar Empleados

export const deleteAdmin = async (req, res) => {

    try {
        const admin = await Administradores.findByIdAndDelete(req.params.id)
        
        if (!admin) return res.status(404).json({ message: 'administrador no encontrado' })

        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({ message: "Admin no encontrado" })
    }
};