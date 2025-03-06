import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js"
import { deleteUser, updateUser, userProfile } from "../Controller/User/userProfile.js";

const userRouter = Router()

// User Profile
userRouter.get('/profile',authMiddleware,userProfile)
userRouter.put('/update',authMiddleware,updateUser)
userRouter.delete('/delete',authMiddleware,deleteUser)

export default userRouter;