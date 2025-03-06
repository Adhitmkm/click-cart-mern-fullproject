import "./UserProfile.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.clear(); 
    navigate("/login");
  };


  return (
    <div>
      <div className="user-profile-main">
        <div className="user-profile">
          <div className="user-profile-left">
            <div className="nav-items">
              <a href="#" className="nav-item">Account Overview</a>
              <a href="#" className="nav-item">My Orders</a>
              <a href="#" className="nav-item">Wishlist</a>
              <a href="#" className="nav-item">Addresses</a>
              <Link to="/vibe/profile/account" className="nav-item active">Account Settings</Link>
              </div>
            <div className="nav-footer">
              <div className="help-text">Need Help?</div>
              <a href="#" className="logout-link" onClick={logoutHandle}>
              <i className="fa-solid fa-right-from-bracket"></i> LOGOUT
              </a>
            </div>
          </div>

          <div className="user-profile-right">
            <Outlet/>
          {/* <Routes>
        <Route path="account" element={<AccountSettings />} />
      </Routes> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;


























// import { useState } from "react";
// import "./UserProfile.css";
// import Navbar from "../../Home/Navbar/Navbar";
// import PersonalDetails from "./AccountSetings/PersonalDetails";
// // import EmailEdit from "./AccountSetings/EmailEdit";

// function UserProfile() {
//   const [isEditing, setIsEditing] = useState(false); // State for personal details modal
//   const [isEditingEmail, setIsEditingemail] = useState(false); // State for email edit modal

//   return (
//     <div>
//       <Navbar />
//       <div className={`user-profile-main ${isEditing || isEditingEmail ? "blurred" : ""}`}>
//         <div className="user-profile">
//           <div className="user-profile-left">
//             <div className="nav-items">
//               <a href="#" className="nav-item">
//                 <span>Account Overview</span>
//               </a>
//               <a href="#" className="nav-item">
//                 <span>My Orders</span>
//               </a>
//               <a href="#" className="nav-item">
//                 <span>Wishlist</span>
//               </a>
//               <a href="#" className="nav-item">
//                 <span>Addresses</span>
//               </a>
//               <a href="#" className="nav-item active">
//                 <span>Account Settings</span>
//               </a>
//             </div>
//             <div className="nav-footer">
//               <div className="help-text">Need Help?</div>
//               <a href="#" className="logout-link">
//                 <i className="fa-solid fa-right-from-bracket"></i> LOGOUT
//               </a>
//             </div>
//           </div>
//           <div className="user-profile-right">
//             <div className="content">
//               <h1 className="page-title">Account Settings</h1>

//               <div className="settings-card">
//                 <div className="card-header">
//                   <h2>Personal Details</h2>
//                   <button className="edit-button" onClick={() => setIsEditing(true)}>
//                     <i className="fa-solid fa-pen-to-square"></i>
//                   </button>
//                 </div>
//                 <div className="card-content">

//                   <div className="detail-item">
//                     <span className="detail-label">First Name:</span>
//                     <span className="detail-value">Adhi</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Last Name:</span>
//                     <span className="detail-value">T</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Email:</span>
//                     <span className="detail-value">example@gmail.com</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="settings-card">
//                 <div className="card-header">
//                   <h2>Email & Password</h2>
//                   <button className="edit-button" onClick={() => setIsEditingemail(true)}>
//                     <i className="fa-solid fa-pen-to-square"></i>
//                   </button>
//                 </div>
//                 <div className="card-content">
//                   <div className="detail-item">
//                     <span className="detail-label">Email:</span>
//                     <span className="detail-value">adhipes04@gmail.com</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Password:</span>
//                     <span className="detail-value">•••••••••••••</span>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Render EmailEdit only if isEditing is true */}
//       {isEditing && <PersonalDetails onClose={() => setIsEditing(false)} />}
// {/* {isEditingEmail && <EmailEdit onClose={() => setIsEditingemail(false)} />} */}
//     </div>
//   );
// }

// export default UserProfile;





















