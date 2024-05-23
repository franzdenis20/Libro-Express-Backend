import Boleto from '../models/boleto.model.js'







// obtener todos los boletos de un usuario logeado
export const getBoletos = async (req, res) => {
    try {
        const boletos = await Boleto.find({
            empleado: req.user.id
        }).populate('empleado');  
        res.json(boletos);
    } catch (error) {
        return res.status(400).json({ message: "Boletos del Usurio no encontrados" })
    }
};

// obtener los boletos de un viaje

export const getBoletosViaje = async (req, res) => {
    try {
        const boletos = await Boleto.find({ viaje: req.params.id }).populate('empleado');
        if (boletos.length === 0) {
            return res.status(404).json({ message: 'El Viaje no tiene boletos comprados' });
        }
        res.json(boletos);
    } catch (error) {
        if (!res.headersSent) {
            return res.status(400).json({ message: "Boletos del viaje no encontrado" });
        }
    }
};



export const createBoleto = async (req, res) => {
    try {
        const { asiento,destino,precio,hora,user,viaje,nombre, ci } = req.body;
        //console.log(req.body)
        //console.log(destino);
        //console.log(req.user)

        const newBoleto = new Boleto({
            asiento,
            destino,
            precio,
            hora,
            nombre,
            ci,
            
            empleado: req.user.id,
            viaje,

        });
        console.log(newBoleto);
        const savedBoleto = await newBoleto.save();
        res.json(savedBoleto);
    } catch (error) {
        return res.status(400).json({ message: "Boleto no encontrado" })
    }

};