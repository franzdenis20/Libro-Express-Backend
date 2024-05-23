
import Task from '../models/task.model.js'


// Obtiner todos los viajes tasks para mostrar en el inicio 

export const getTasksPublick = async (req, res) => {
    try {
        
        console.log(req.params.id)
        const tasks = await Task.find({categoria : req.params.id});
        res.json(tasks);
    } catch (error) {
        return res.status(400).json({ message: "Viajes no encontrados" })
    }
};




// obtener todos los viajes tasks de un usuario logeado
export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user');
    res.json(tasks);
};

export const createTask = async (req, res) => {
    try {
        const { titulo,imagen,autor,descripcion,estado,categoria} = req.body;
        //console.log(req.body)
        //console.log(destino);
        //console.log(req.user)

        const newTask = new Task({
            titulo,
            imagen,
            autor,
            descripcion,
            categoria,
            estado

        });
        console.log(newTask);
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        return res.status(400).json({ message: "Libro no guardado en las base de datos" })
    }

};

//Para obetenerr un viaje en espesifico
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'El libro no existe' })

        res.json(task);
    } catch (error) {
        return res.status(400).json({ message: "Libro no encontrado" })
    }
};
export const deleteTask = async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Task not found' })

        return res.sendStatus(204);
    } catch (error) {
        return res.status(400).json({ message: "Viaje no encontrado" })
    }
};

export const updateTask = async (req, res) => {

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).json({ message: 'Viajes not found' })

        res.json(task);
    } catch (error) {
        return res.status(400).json({ message: "Viaje no encontrado" })
    }
};

