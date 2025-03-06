import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../Model/user.js'
import dotenv from 'dotenv';

dotenv.config();
export const signup = async (req,res)=>{
  try{
     const{firstName, lastName, email, password  } = req.body;  


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



     let user = await User.findOne({email});
     if(user){
         console.log("user email alredy exist")
         return res.status(404).json({err:"user email alredy exist"})
     }
     user = new User({
         firstName,
         lastName,
         email,
         password
     })

     const salt = await bcrypt.genSalt(10)
     user.password = await bcrypt.hash(password,salt);

     await user.save()
     
     const accessToken = jwt.sign({id: user._id, email: user.email,role: user.role}, process.env.JWT_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
     })

     console.log(accessToken ,'access')
    

     const refreshToken = jwt.sign({id:user._id,email:user.email,role: user.role},process.env.JWT_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRES})
        
        console.log('refreshToken',refreshToken )

        user.refreshToken = refreshToken;
        user.lastLogin = new Date();
        await user.save();
        console.log("user successfully registered")


     const uid = user._id; 
     return res.status(201).json({msg:"User sucessfully registered",accessToken})

 }catch(err){
     console.log(err.message );
         res.status(500).json({err:err.message})
 }
};

export const login = async (req, res) => {
    try {
        const { email,password } = req.body;

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


        let user = await User.findOne({ email });
        if (!user) {
            console.log("User does not exist");
            return res.status(400).json({ err: "User does not exist" });
        }

        const verify = await bcrypt.compare(password, user.password);
        if (!verify) {
            console.log("Incorrect password");
            return res.status(400).json({ err: "Incorrect password" });
        }

        const accessToken = jwt.sign(
            { id: user._id, email: user.email,role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
        );

        const refreshToken = jwt.sign(
            { id: user._id, email: user.email,role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
        );

        user.refreshToken = refreshToken;

        user.lastLogin = new Date();

        await user.save();

        console.log("User successfully logged in");
        return res.status(201).json({ msg: "User successfully logged in", accessToken });
    } catch (err) {
        console.log("Error occurred:", err); 
        res.status(500).json({ error: err.message });
    }
};

