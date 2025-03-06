import User from "../../Model/user.js"

export const usersDetails = async (req,res)=> {
    console.log("enetered user details list")
    try{
        const id = req.query.id;
        console.log("uer id is:",id)
        const user = await User.find()
        return(res.status(200).json({user,message:"users detals"}))
    }catch(err){
        console.log("Error in user list:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUsers = async (req,res)=>{
    console.log("enetered user delete")
    try{
        const id = req.query.id;
        console.log("uer id is:",id)
        const deletedUsers = await User.findByIdAndDelete(id)
        if(!deletedUsers){
            console.log("user not found")
            return res.status(404).json({ message: "User not found" });
        }
        return(res.status(200).json({deletedUsers,message:"users deleted successfuly"}))
    }catch(err){
        console.log("Error in user delete list:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
}