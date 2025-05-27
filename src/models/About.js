import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
    {
        aboutme: String,
        noofprojects: String,
        yearofexerience: String,
        noofclients: String,
        skills: String,
        images:String,
    },
    { timestamps: true }
);
const About = mongoose.models.About || mongoose.model("About",AboutSchema);
export default About;