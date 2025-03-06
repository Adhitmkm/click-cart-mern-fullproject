import { useEffect, useState } from "react";
import "./AccountSettings.css";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AccountSettings = () => {

  const navigate = useNavigate();


  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userData,setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
})  
  
  const url = "http://localhost:7000"


//show userdetails profile
  const userProfile = async () =>{
    try{
      const profile = await axios.get(`${url}/user/profile`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        
    });
      console.log("profile",profile)
      setUser(profile.data)
    }catch(err){
      console.log(err)
      toast.error(err.profile.msg) // backend nn verunna msg
      
    }
  }
  console.log("userData1111111",userData)
  


  // delete account
  const deleteHandle = async () =>{

    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action is irreversible. You will lose all your data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d4d", // Red color for delete
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete My Account",
      cancelButtonText: "Cancel",
      reverseButtons: true, // Swap button order (Cancel first)
      customClass: {
        popup: "my-custom-popup", // Custom styling
      },
    });
  
    if (!result.isConfirmed) {
      Swal.fire({
        title: "Cancelled",
        text: "Your account is safe!",
        icon: "info",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    console.log(userData?._id,"dataaaaaaa")
    try{
      const deleteuser = await axios.delete(`${url}/user/delete?id=${userData?._id}`,
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      console.log("deleteuser.data",deleteuser.data)
      if(deleteuser.data.data == true){
        localStorage.clear("accessToken")
        navigate('/')
        console.log("deleteuser.data.data",deleteuser.data.data )
      }
      console.log("deleteuser.data.data",deleteuser.data.data )

    }catch(err){
      console.log(err)
      toast.error(err.profile.msg) // backend nn verunna msg
      
    }
  }

  // mnanmuk editing

  const handleonChange = (event) => {
    console.log(event, "eventttt");
    const { value, name } = event.target;
    console.log(value, name, "currentvalue11");
  
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      

      let accessToken = localStorage.getItem("accessToken");
      console.log("abcddddddd",accessToken);
  
      const update = await axios.put(`${url}/user/update`,userData,{
        headers: {
          Authorization: `Bearer ${accessToken}`,

        },
        withCredentials:true
      },
      );
  
      console.log("Update response:", update);
      toast.success("User updated successfully");
  
    } catch (err) {
      console.error("Update error:", err);
  
      if (err.response && err.response.data) {
        toast.error(err.response.data.msg || "An error occurred during update.");
      } else {
        toast.error("Network error or server is down.");
      }
    }
  };
  


  useEffect(() => {
    userProfile();
  }, []);


  const handleEditPersonalClick = () => {
    setIsEditingPersonal(true);
  };

  const handleEditEmailClick = () => {
    setIsEditingEmail(true);
  };

  const handleClose = () => {
    setIsEditingPersonal(false);
    setIsEditingEmail(false);
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <div className="account-settings-section">
        <div className="account-section-header">
          <h2>Personal Details</h2>
          <FaPen className="account-edit-icon" onClick={handleEditPersonalClick} />
        </div>
        <p><strong>First Name:</strong> {userData.firstName}</p>
        <p><strong>Last Name:</strong> {userData.lastName}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <button onClick={deleteHandle} className="dltacc-btn">DELETE ACCOUNT</button>
      </div>
      
      <div className="account-email-section">
        <div className="account-section-header">
          <h2>Email & Password</h2>
          <FaPen className="account-edit-icon" onClick={handleEditEmailClick} />
        </div>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Password:</strong> **********</p>
      </div>

      {isEditingPersonal && (
        <div className="account-modal">
          <form  className="account-modal-content">
            <span className="account-close" onClick={handleClose}>&times;</span>
            <h2>Personal Details</h2>
            <label>First Name *</label>
            <input type="text"
              name="firstName"
             value={userData.firstName}
             onChange={handleonChange} />
            <label>Last Name *</label>
            <input type="text"
            name="lastName" 
            value={userData.lastName}
            onChange={handleonChange} />
            <label>Email</label>
            <input type="email"
            name="email"
            value={userData.email}
            onChange={handleonChange}  />
            {/* <input type="email" value={userData.email} disabled /> inghaney disable koduthal ith inpu type akan pattilla */}

            {/* <label>Gender *</label>
            <div >
              <input type="radio" name="gender" value="Male" checked /> Male
              <input type="radio" name="gender" value="Female" /> Female
            </div> */}
            {/* <label>Date of Birth *</label>
            <div className="dob">
              <select><option>2003</option></select>
              <select><option>January</option></select>
              <select><option>1</option></select>
            </div> */}
            <button onClick={handlesubmit} className="account-save-btn">SAVE</button>
          </form>
        </div>
      )}

      {isEditingEmail && (
        <div className="account-modal">
          <div className="account-modal-content">
            <span className="account-close" onClick={handleClose}>&times;</span>
            <h2>Login Details</h2>
            <label>Email</label>
            <input type="email" value="adhipes04@gmail.com" disabled />
            <h3>Change Password</h3>
            <label>Current Password *</label>
            <input type="password" placeholder="Current password" />
            <label>New Password *</label>
            <input type="password" placeholder="New password" />
            <p>Your password must contain at least 8 characters</p>
            <label>Confirm New Password *</label>
            <input type="password" placeholder="Confirm new password" />
            <button className="account-save-btn">SAVE CHANGES</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
