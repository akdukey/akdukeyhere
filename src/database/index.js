import mongoose from "mongoose";

export default async function connectToDB(){
    try {
        await mongoose.connect(
            "mongodb+srv://akdukey:DJDyez0m6f8CnNv7@cluster0.5dzxtcn.mongodb.net/portfolio"
        );
        console.log('Database connected successfully');
    } catch (e) {
        console.log(e);
    }
}