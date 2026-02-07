import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected!");
    } catch (error) {
        console.log("DB ERROR")
    }
}
export default connectDB;