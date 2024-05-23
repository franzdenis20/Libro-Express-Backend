import Sedes from '../models/sede.model.js'





export const registerSede = async (req, res) => {

    const {sede} = req.body

    try {

        //validamos el correo

        const Sede = await Sedes.findOne({sede});

        if(Sede){
            return res.status(400).json(["La sede ya existe"])
        }

        //const passwordHash = await bcrypt.hash(password, 10)//hjgjhg
        const newSede = new Sedes({
            sede
        })

        const sedeSaved = await newSede.save();

        

        res.json({
             id: sedeSaved.id,
             username:sedeSaved.sede
             
             
             
         })
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};


// obtener los boletos de un viaje

export const getSedes = async (req, res) => {
    try {
        const sedes = await Sedes.find();
        if (sedes.length === 0) {
            return res.status(404).json({ message: 'No hay sedes registradas' });
        }
        res.json(sedes);
    } catch (error) {
        if (!res.headersSent) {
            return res.status(400).json({ message: "sedes no encontrados" });
        }
    }
};

// Eliminar Empleados

export const deleteSede = async (req, res) => {

    try {
        const sede = await Sedes.findByIdAndDelete(req.params.id)
        
        if (!sede) return res.status(404).json({ message: 'sede no encontrado' })

        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({ message: "sede no encontrado" })
    }
};