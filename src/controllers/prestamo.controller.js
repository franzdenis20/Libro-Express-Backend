
import Prestamo from "../models/prestamo.model.js";




export const registerPrestamo = async (req, res) => {

    const {idLibro, idEmpleado,idUser,direccion,fechaDevolucion} = req.body

    try {

        //validamos el prestamo
        /*
        const existePrestamo = await Prestamo.findOne({idLibro});

        if(existePrestamo){
            return res.status(400).json(["El libro ya se encuentra ocupado por un usuario"])
        }
        */
        

        // creamos una nueva instancia de pretamo

        const newPrestamo = new Prestamo({
            idLibro,
            idEmpleado,
            idUser,
            fechaDevolucion,
            direccion
        })

        await newPrestamo.save();

        

        res.status(200).json({message: "EL prestamo se creo correctamente"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};


// obtener todos los libros de un usuario logueado
export const getLibrosPrestados = async (req, res) => {
    try {
        
        const libros = await Prestamo.find({
            idUser: req.params.id
        }).populate('idLibro');  
        res.json(libros);
    } catch (error) {
        return res.status(400).json({ message: "Libros Prestados del Usurio no encontrados" })
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