
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import Admin from "../../Model/admin.js";
import dotenv from 'dotenv'

dotenv.config()

export const signup = async (req ,res)=>{
    try{

        const {firstName, lastName, email, password } = req.body;

        if (!firstName) {
            return res.status(400).json({ msg: "First name is required" });
        }
        if (!lastName) {
            return res.status(400).json({ msg: "Last name is required" });
        }
        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ msg: "Password is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 8 characters long" });
        }



        let admin = await Admin.findOne({email})

        if(admin) {
            console.log("admin email alredy exist")
            return res.status(404).json({msg:"admin email alredy exist"})
        }

        admin = new Admin({
            firstName,
            lastName,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10)
        admin.password = await bcrypt.hash(password,salt)

        await admin.save()

        const accessToken = jwt.sign({id: admin._id, email: admin.email,role: admin.role}, process.env.AD_JWT_SECRET,{
                expiresIn: process.env.AD_ACCESS_TOKEN_EXPIRES,
             })
        
             console.log(accessToken ,'access')
            
        
             const refreshToken = jwt.sign({id:admin._id,email:admin.email,role: admin.role},process.env.AD_JWT_SECRET,
                {expiresIn:process.env.AD_REFRESH_TOKEN_EXPIRES})
                
                console.log('refreshToken',refreshToken )
        
                admin.refreshToken = refreshToken;
                admin.lastLogin = new Date();
                await admin.save();
                console.log("user successfully registered")
                

     const uid = admin._id; 
     return res.status(201).json({msg:"User sucessfully registered",accessToken})


    }catch(err){
        console.log("Error Occured ",err);
        return res.status(500).json({err:err.message});
    }
};

export const login = async (req,res) =>{
    try{
        const {email ,password} = req.body;

        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }
        if (!password) {
            return res.status(400).json({ msg: "Password is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 8 characters long" });
        }


        let admin = await Admin.findOne({email});
        if(!admin){
            console.log("Admin does not exist")
        }

        const verify = await bcrypt.compare(password, admin.password);
        if(!verify){
            console.log("Incorrect password");
            return res.status(400).json({ err: "Incorrect password" });
        }

        const accessToken = jwt.sign(
                { id: admin._id, email: admin.email,role: admin.role },
                process.env.AD_JWT_SECRET,
                { expiresIn: process.env.AD_ACCESS_TOKEN_EXPIRES }
            );
        
        const refreshToken = jwt.sign(
                { id: admin._id, email: admin.email,role: admin.role },
                process.env.AD_JWT_SECRET,
                { expiresIn: process.env.AD_REFRESH_TOKEN_EXPIRES }
            );
        
        admin.refreshToken = refreshToken
        admin.lastLogin = new Date();
        await admin.save()

        console.log("User successfully logged in");
        return res.status(201).json({ msg: "User successfully logged in", accessToken });



    }catch(err){
        console.log("Error occurred:", err)
        return res.status(500).json({error: err.message});
    }
}