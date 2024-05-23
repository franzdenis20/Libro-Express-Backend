
import mongoose from "mongoose";


const boletoSchema =  new mongoose.Schema({
    asiento:{
        type: String,
        require:true,

    },
    nombre:{
        type: String,
        require:true,
    },
    ci:{
        type: String,
        require:true,
    },
    destino:{
        type: String,
        require:true,
    },
    hora:{
        type: String,
        require:true,
    },
    precio:{
        type: String,
        require:true,
    },
    sede:{
        type: String,
        require:true,
    },
    
    Date:{
        type:Date,
        default: Date.now,
    },
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleados',
        
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        
        
    },
    
    
    viaje:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    }
    

},{
    timestamps:true
})

export default mongoose.model("Boleto", boletoSchema);