import { Router } from "express";
import { login, signup } from "../../Controller/Admin/adminRegister.js";


const adminAuth = Router()

adminAuth.post('/signup',signup)
adminAuth.post('/login',login)



export default adminAuth;