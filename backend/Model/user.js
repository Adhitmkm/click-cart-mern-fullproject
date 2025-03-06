import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default: "user", 
        enum: ["user"] 
    },
    status: { 
        type: String, 
        enum: ["active", "blocked"],
         default: "active" 
    },
    lastLogin: {
        type: Date, 
        default: null
    }
}, { timestamps: true })

const User = mongoose.model("User",UserSchema);
export default User;