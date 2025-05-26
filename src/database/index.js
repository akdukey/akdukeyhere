import mongoose from "mongoose";

export default async function connectToDB(){
    try {
        await mongoose.connect(
            "mongodb+srv://admin:fuckduldul@cluster0.jgit9k1.mongodb.net/hello"
        );
        console.log('Database connected successfully');
    } catch (e) {
        console.log(e);
        console.log("not connected");
    }
}