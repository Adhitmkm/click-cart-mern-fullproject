import Admin from "../../Model/admin.js";

export const adminProfile = async (req,res) => {
    console.log("admin profile route woking");
    try{
        console.log("your extracted id",req.adminId)
        if(!req.adminId){
            console.log("User ID missing in request")
            return res.status(400).json({ err: "User ID missing in request" });
        }
        const admin = await Admin.findById(req.adminId)

        if(!admin){
            console.log("User does not exist");
            return res.status(404).json({ err: "User not found" });
        }
        console.log("admin Data",admin)
        return res.status(200).json(admin)
    }catch(err){
        console.error("Error:", err);
        return res.status(500).json({ err: "Something went wrong" });
    }
}

export const updateAdminAcc = async (req,res) =>{
console.log("entered updated admin acc");
try{
    console.log("your id:",req.adminId)
    const { firstName, lastName, email } = req.body;
    const adminId = req.adminId

    if(!firstName || !lastName || !email){
        console.log("Missing required fields");
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await Admin.findById(adminId);
    if (!existingUser) {
        console.log("User not found");
        return res.status(404).json({ msg: "User not found" });
    }
    
    // Check if the new email already exists in another account
    const emailExists = await Admin.findOne({ email });
    if (emailExists && emailExists._id.toString() !== adminId) {
        console.log("Email already in use");
        return res.status(400).json({ msg: "Email already in use" });
    }
    
    // Update user details
    const updateAdmin = await Admin.updateOne(
        { _id: adminId }, // Find user by ID
        {
            $set:{
                firstName: firstName,
                lastName: lastName,
                email: email,
            },
        }
    );
    console.log(updateAdmin, "Update result");
    if (updateAdmin.modifiedCount > 0) {
        return res.status(200).json({ msg: "Details successfully updated" });
    } else {
        return res.status(400).json({ msg: "No changes made to user data" });
    }
}catch(err){
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Error updating user details", error: error.message });
}
}


export const deleteAdmin = async(req,res)=>{
    console.log("Admin delete entereed")

    try{
        const adminId = req.adminId;
        console.log("your id",adminId)
        if(!adminId){
            console.log("User ID is required")
            return res.status(400).json({ error: "User ID is required" });
        }

        const admin = await Admin.findByIdAndDelete(adminId)
        if(!admin){
            console.log("Admin acccount not font")
            return res.status(404).json({ error: "Admin not found" });
        }
        return res.json({ msg: "User deleted successfully", data: true });
    }catch(err){
        console.error("Error deleting account:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}