import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    sede:{
        type: String,
        require:true,
        trim:true,
        unique:true,
    }
    
},{
    timestamps:true,
})

export default mongoose.model('Sedes', userSchema);