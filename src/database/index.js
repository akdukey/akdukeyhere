import mongoose from "mongoose";

export default async function connectToDB(){
    try {
        await mongoose.connect(
            "mongodb+srv://akdukey:DJDyez0m6f8CnNv7@cluster0.jgit9k1.mongodb.net/"
        );
        console.log('Database connected successfully');
    } catch (e) {
        console.log(e);
    }
}