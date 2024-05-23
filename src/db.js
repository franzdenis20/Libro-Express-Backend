import mongoose from "mongoose";

 export const connectDB = async()=> {
    try{
        await mongoose.connect('mongodb+srv://Denis:DenisUPDS@libreriaexpress.woeohzz.mongodb.net/')
        console.log(">>>> DB Connected")
    }catch(error){
        console.log(error);
        console.log("error");
    }
 }