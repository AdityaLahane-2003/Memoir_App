import mongoose from "mongoose";
import dotenv from 'dotenv';
//env config
dotenv.config();

// For connecting with database 
 const connectDB = async ()=> {
    const URL = process.env.MONGO_URL;
    
    try {
        await mongoose.connect(URL,{useNewUrlParser:true});
        console.log("Successfully Connected to Database");
    } catch (error) {
        console.log("Alert-> error occured !", error);
    }
}
export default connectDB;