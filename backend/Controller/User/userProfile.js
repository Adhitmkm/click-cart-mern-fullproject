import User from "../../Model/user.js";


export const userProfile = async (req, res) => {
    console.log("profile route woking");
    
    try {
        console.log("Extracted User ID:", req.userId);
        
        if (!req.userId) {
            return res.status(400).json({ err: "User ID missing in request" });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            console.log("User does not exist");
            return res.status(404).json({ err: "User not found" });
        }

        console.log("User Data:", user);
        return res.status(200).json(user);
        
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ err: "Something went wrong" });
    }
};





export const deleteUser = async (req, res)=>{
    console.log("delete entereed")
    try{
        const id = req.query.id || req.params.id || req.body.id;
        console.log(id,"id recived")
        if(!id){
            console.log("User ID is required")
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await User.findByIdAndDelete(id);
        if(!user){
            console.log("user not found")
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ msg: "User deleted successfully", data: true });
    }catch(err){
        console.error("Error deleting account:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}





export const updateUser = async (req, res) => {
    try {
        console.log(req.body, "Received update request");

        const { firstName, lastName, email } = req.body;
        const userId = req.userId; // Extract userId from middleware

        // Validate input
        if (!firstName || !lastName || !email) {
            console.log("Missing required fields");
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user exists
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if the new email already exists in another account
        const emailExists = await User.findOne({ email });
        if (emailExists && emailExists._id.toString() !== userId) {
            console.log("Email already in use");
            return res.status(400).json({ msg: "Email already in use" });
        }

        // Update user details
        const updatedUser = await User.updateOne(
            { _id: userId }, // Find user by ID
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                },
            }
        );

        console.log(updatedUser, "Update result");

        if (updatedUser.modifiedCount > 0) {
            return res.status(200).json({ msg: "Details successfully updated" });
        } else {
            return res.status(400).json({ msg: "No changes made to user data" });
        }
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Error updating user details", error: error.message });
    }
};
