// authentication mathram aan ith use cheyunna sytax pakka aakan aan seperate create aakunnath matteu karyanghalk middleware auth use cheyyuka

import { Router } from "express";
import { login, signup } from "../../Controller/User/userRegister.js";


const userauth = Router();
// User Registration
userauth.post('/signup',signup)
userauth.post('/login',login)




export default userauth;
