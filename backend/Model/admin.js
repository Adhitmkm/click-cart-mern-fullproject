import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
        required: true
    },
    role: {
        type: String,
        default: "admin", 
        enum: ["admin"] // Ensures only "admin" is allowed
    },
    status: { 
        type: String, 
        enum: ["active", "blocked"],
         default: "active" 
    },
    lastLogin:{
        type:Date,
        default:null
    }
},{ timestamps: true });

const Admin = mongoose.model("Admin", UserSchema);

export default Admin;
