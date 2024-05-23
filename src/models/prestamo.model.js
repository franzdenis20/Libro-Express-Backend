
import mongoose from "mongoose";

const PrestamoSchema = new mongoose.Schema({
    
    idLibro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        
        
    },
    idUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    idEmpleado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleados'
    },
    fechaDevolucion:{
        type: String,
        require: true
    },
    direccion:{
        type: String,
        require: true
    },
    estado:{
        type:String,
        default: "pendiente",
        require: true
    }
},{
    timestamps: true
})

export default mongoose.model("Prestamo", PrestamoSchema);