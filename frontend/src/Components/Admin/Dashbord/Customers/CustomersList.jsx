import { useEffect, useState } from 'react';
import './CustomersList.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const CustomersList = () => {
  const [usersData, setUsers] = useState([]);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [userData, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    status: "active",
  });

  const url = "http://localhost:7000";

  const customersList = async () => {
    try {
      const response = await axios.get(`${url}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUsers(response.data.user);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.msg || "Network error or server is down.");
    }
  };

  const deleteuser = async (id) => {
    if (!id) {
      console.log("User ID not found, delete not working");
      return;
    }

    try {
      const response = await axios.delete(`${url}/admin/userdelete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200) {
        toast.success("User deleted successfully!");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.msg || "Network error or server is down.");
    }
  };

  const handleonChange = (event) => {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      let accessToken = localStorage.getItem("accessToken");

      const update = await axios.put(`${url}/admin/userupdate?id=${userData.id}`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      toast.success("User updated successfully!");

    setIsEditingPersonal(false);

    customersList();


      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userData.id ? update.data : user
        )
      );

      setIsEditingPersonal(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.msg || "Failed to update user.");
    }
  };

  const handleEditPersonalClick = async (id) => {
    if (!id) {
      console.log("User ID not found, edit not working");
      return;
    }

    const userToEdit = usersData.find((user) => user._id === id);
    if (userToEdit) {
      setUser({
        id: userToEdit._id,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
        status: userToEdit.status,
      });
      setIsEditingPersonal(true);
    }
  };

  const handleClose = () => {
    setIsEditingPersonal(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-approved';
      case 'blocked':
        return 'status-blocked';
      default:
        return '';
    }
  };

  useEffect(() => {
    customersList();
  }, []);

  return (
    <div className="customers-list-container">
      <div className="customers-list-header">
        <h1>Customers List</h1>
        <button className="new-customer-btn">+ NEW CUSTOMER</button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>E-Mail</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>


<tbody>
  {usersData.length > 0 ? (
    usersData.map((user, index) => (
      <tr key={user._id || index}>
        <td>{user.firstName} {user.lastName || ''}</td>
        <td>{user.email}</td>
        <td>
          <span className={`status-dot ${getStatusClass(user.status || 'unknown')}`}></span>
          {user.status ? (
            user.status.charAt(0).toUpperCase() + user.status.slice(1)
          ) : (
            'Unknown'
          )}
        </td>
        <td>{user.lastLogin}</td>
        <td className="actions">
          <button onClick={() => handleEditPersonalClick(user._id)}>Edit</button>
          <button onClick={() => deleteuser(user._id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No users found</td>
    </tr>
  )}
</tbody>


        </table>
      </div>

      {/* ✅ Modal for Edit */}
      {isEditingPersonal && (
        <div className="account-modal">
          <form className="account-modal-content">
            <span className="account-close" onClick={handleClose}>&times;</span>
            <h2>Edit User</h2>
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleonChange}
            />
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleonChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleonChange}
            />
            <label>Status</label>
            <select name="status" value={userData.status} onChange={handleonChange}>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <button onClick={handlesubmit} className="account-save-btn">
              SAVE
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomersList;
















































// import { useEffect, useState } from 'react';
// import './CustomersList.css';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const CustomersList = () => {
//   const [usersData, setUsers] = useState([]); 
//   const url = "http://localhost:7000";

//   const [isEditingPersonal, setIsEditingPersonal] = useState(false);
//   const [userData,setUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
// })  


//   const customersList = async () => {
//     console.log("enetered customer list")
//     try {
//       const response = await axios.get(`${url}/admin/users`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       console.log("User data:", response.data);
//       setUsers(response.data); 
//     } catch (err) {
//       console.error("Fetch error:", err);
//       toast.error(err.response?.data?.msg || "Network error or server is down.");
//     }
//   };

//   const deleteuser = async (id) => {
//     console.log(id, "idddddd");

//     if (!id) {
//       console.log("User ID not found, delete not working");
//       return;
//     }

//     try {
//       const response = await axios.delete(`${url}/admin/userdelete?id=${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       if (response.status === 200) {
//         toast.success("User deleted successfully!");
//         setUsers(prevUsers => ({
//           ...prevUsers,
//           user: prevUsers.user.filter(user => user._id !== id)
//         }));
//       } else {
//         toast.error("Failed to delete user.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       toast.error(err.response?.data?.msg || "Network error or server is down.");
//     }
//   };

//   // editing 

//   const handleonChange = (event) => {
//     console.log(event, "eventttt");
//     const { value, name } = event.target;
//     console.log(value, name, "currentvalue11");
  
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };
  
//   const handlesubmit = async (e) => {
//     e.preventDefault();

//     try {
      

//       let accessToken = localStorage.getItem("accessToken");
//       console.log("abcddddddd",accessToken);
  
//       const update = await axios.put(`${url}/admin/update`,userData,{
//         headers: {
//           Authorization: `Bearer ${accessToken}`,

//         },
//         withCredentials:true
//       },
//       );
  
//       console.log("Update response:", update);
//       toast.success("User updated successfully");
  
//     } catch (err) {
//       console.error("Update error:", err);
  
//       if (err.response && err.response.data) {
//         toast.error(err.response.data.msg || "An error occurred during update.");
//       } else {
//         toast.error("Network error or server is down.");
//       }
//     }
//   };


//   useEffect(() => {
//     customersList();
//   }, []); 

//   const handleEditPersonalClick = () => {
//     setIsEditingPersonal(true);
//   };

//   const handleClose = () => {
//     setIsEditingPersonal(false);
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'active': return 'status-approved';
//       case 'blocked': return 'status-blocked';
//       default: return '';
//     }
//   };



//   return (
//     <div className="customers-list-container">
//       <div className="customers-list-header">
//         <h1>Customers List</h1>
//         <button className="new-customer-btn">+ NEW CUSTOMER</button>
//       </div>
//       <div className="search-container">
//         <input type="text" placeholder="Search" className="search-input" />
//       </div>
//       <div className="customers-table-container">
//         <table className="customers-table">
//           <thead>
//             <tr>
//               <th>Full Name</th>
//               <th>E-Mail</th>
//               <th>Status</th>
//               <th>Last Login</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {usersData.user?.length > 0 ? (
//               usersData.user?.map((user, index) => (
//                 <tr key={index}>
//                   <td>{user.firstName} {user.lastName || ''}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <span className={`status-dot ${getStatusClass(user.status)}`}></span>
//                     {user.status?.charAt(0).toUpperCase() + user.status.slice(1)}
//                   </td>
//                   <td>{user.lastLogin}</td>
//                   <td className="actions">
//                     <button onClick={()=>handleEditPersonalClick(user._id)}>Edit</button>
//                     <button onClick={()=>deleteuser(user._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         {isEditingPersonal && (
//         <div className="account-modal">
//           <form  className="account-modal-content">
//             <span className="account-close" onClick={handleClose}>&times;</span>
//             <h2>Personal Details</h2>
//             <label>First Name *</label>
//             <input type="text"
//               name="firstName"
//              value={userData.firstName}
//              onChange={handleonChange} />
//             <label>Last Name *</label>
//             <input type="text"
//             name="lastName" 
//             value={userData.lastName}
//             onChange={handleonChange} />
//             <label>Email</label>
//             <input type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleonChange}  />
//             <button onClick={handlesubmit} className="account-save-btn">SAVE</button>
//           </form>
//         </div>
//       )}
//         <div className="pagination">
//           <span>1</span>
//           <span>2</span>
//           <span>3</span>
//           <span>4</span>
//           <span>10</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomersList;

