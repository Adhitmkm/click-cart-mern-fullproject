import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import connectDB from './config/DB.js';
import usreAuth from './Routes/Auth/userAuth.js'
import adminAuth from './Routes/Auth/adminAuth.js'
import userRouter from './Routes/userRoute.js';
import adminRoute from './Routes/adminRoute.js';


dotenv.config()
const app = express();
connectDB();
// Middleware
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true

}))

app.use(express.json());

// user Registration
app.use('/auth',usreAuth)

// User Route
app.use('/user',userRouter)


// admin Registration
app.use('/admin/auth',adminAuth)

// Admin Route
app.use('/admin',adminRoute)


const PORT = process.env.PORT || 9000

app.listen(PORT,()=>{
    console.log(`i am reAdy at port ${PORT}`)
})