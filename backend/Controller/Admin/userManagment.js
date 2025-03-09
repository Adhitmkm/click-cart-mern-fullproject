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

export const updateUser = async (req,res) =>{
    try{
        console.log(req.body,"recieved admin update request")

        const { firstName, lastName, email, status } = req.body;
        const userId = req.query.id || req.params.id || req.body.id;

        if(!firstName || !lastName || !email || !status) {
            console.log("Missing require fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findById(userId);
        if(!existingUser) {
            console.log("User not Found");
            return res.status(404).json({ msg: "User not found" });
        }

        const emailExists = await User.findOne({email})
        if(emailExists && emailExists._id.toString() !== userId) {
            console.log("This Email alredy exist");
            return res.status(400).json({ msg: "Email already in use" });
        }

        const updatedUser = await User.updateOne({ _id: userId }, // Find user by ID
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    status:status
                },
            });
            console.log(updatedUser, "Update result");

        if (updatedUser.modifiedCount > 0) {
            return res.status(200).json({ msg: "Details successfully updated" });
        } else {
            return res.status(400).json({ msg: "No changes made to user data" });
        }

    }catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Error updating user details", error: error.message });
    }
}