import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user","owner","deliveryBoy"],
        required: true
    },
    resetOtp: {
        type: String
    },
    isOtpVerified: {
        type: String,
        default: false
    },
    otpExpires: {
        type: Date
    }
},{timestamps: true})

const User = mongoose.model("User",userSchema) // it will automatically make the model starting letter "capital"
// const User = mongoose.model("What name we give to the model", schema_name that we made);
export default User;