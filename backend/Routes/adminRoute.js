import { Router } from "express";
import { deleteUsers, usersDetails } from "../Controller/Admin/userManagment.js";
import adminMiddleware from "../Middleware/adminMidleware.js";
import { adminProfile, deleteAdmin, updateAdminAcc } from "../Controller/Admin/adminProfile.js";



const adminRoute = Router()
// Admin profile
adminRoute.get('/profiles',adminMiddleware,adminProfile)
adminRoute.delete('/delete',adminMiddleware,deleteAdmin)
adminRoute.post('/update',adminMiddleware,updateAdminAcc)


//User managment
adminRoute.get('/users',adminMiddleware,usersDetails,)
adminRoute.delete('/userdelete',adminMiddleware,deleteUsers)



export default adminRoute;