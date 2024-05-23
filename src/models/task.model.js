import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true,

    },
    imagen: {
        type: String,
        require: true,
    },
    autor: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,

    },
    categoria: {
        type: String,
        require: true,

    },
    estado: {
        type: String,
        default: "disponible"

    },
    Date: {
        type: Date,
        default: Date.now,
    }


}, {
    timestamps: true
})

export default mongoose.model("Task", taskSchema);