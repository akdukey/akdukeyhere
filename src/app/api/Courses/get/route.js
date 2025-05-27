import connectToDB from "@/database"; 
import Courses from "@/models/Courses";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(req) {
    try {
        console.log("📚 Courses API: Starting request");
        
        // Test database connection
        console.log("🔌 Connecting to database...");
        await connectToDB();
        console.log("✅ Database connected successfully");
        
        // Test model query
        console.log("🔍 Querying Courses collection...");
        const extractData = await Courses.find({});
        console.log("📊 Courses found:", extractData ? extractData.length : 0);
        console.log("🗂️ Sample data:", extractData ? extractData.slice(0, 2) : "No data");

        if (extractData && extractData.length > 0) {
            console.log("✅ Returning courses data");
            return NextResponse.json({
                success: true,
                data: extractData,
            });
        } else {
            console.log("⚠️ No courses found in database");
            return NextResponse.json({
                success: true, // Still success, just empty data
                data: [],
                message: "No courses found"
            });
        } 
    } catch (e) {
        console.error("❌ Courses API Error Details:");
        console.error("Error name:", e.name);
        console.error("Error message:", e.message);
        console.error("Error stack:", e.stack);
        
        // Check for specific error types
        if (e.name === 'MongooseError' || e.name === 'MongoError') {
            console.error("🔴 Database connection error");
        }
        
        return NextResponse.json({
            success: false,
            message: "Database error: " + e.message,
            error: process.env.NODE_ENV === 'development' ? e.stack : undefined
        }, { status: 500 });
    }
}