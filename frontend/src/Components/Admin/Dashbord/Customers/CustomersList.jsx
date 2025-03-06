import { useEffect, useState } from 'react';
import './CustomersList.css';
import toast from 'react-hot-toast';
import axios from 'axios';

const CustomersList = () => {
  const [userData, setUser] = useState([]); 
  const url = "http://localhost:7000";

  const customersList = async () => {
    console.log("enetered customer list")
    try {
      const response = await axios.get(`${url}/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("User data:", response.data);
      setUser(response.data); 
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.msg || "Network error or server is down.");
    }
  };

  const deleteuser = async (id)=>{

    console.log(id,"idddddd")

    if(!id){
      console.log("User ID not found delete not work");
      return;
    }

    try{
      const response = await axios.delete(
        `${url}/admin/userdelete?id=${id}`
      );

      if (response.ok) {
        toast.success("User deleted successfully!");
        // Refresh user list (call API again)
      } else {
        toast.error("Failed to delete user.");
      }
      setUser(prevUsers=>prevUsers.filter((_,i)=> i !== id));
      console.log(userData._id,"delete2222")
      console.log(response,"dataadelete");

    }catch(err) {
      console.error("Fetch error:", err);
      toast.error(err.response?.data?.msg || "Network error or server is down.");
    }
  } 

  useEffect(() => {
    customersList();
  }, []); 

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-approved';
      case 'blocked': return 'status-blocked';
      default: return '';
    }
  };



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
            {userData.user?.length > 0 ? (
              userData.user?.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName} {user.lastName || ''}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-dot ${getStatusClass(user.status)}`}></span>
                    {user.status?.charAt(0).toUpperCase() + user.status.slice(1)}
                  </td>
                  <td>{user.lastLogin}</td>
                  <td className="actions">
                    <button >Edit</button>
                    <button onClick={()=>deleteuser(user._id)}>Delete</button>
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
        <div className="pagination">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;

