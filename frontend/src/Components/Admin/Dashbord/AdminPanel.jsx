import { useState } from "react";
import CustomersList from "./Customers/CustomersList";
import "./AdminPanel.css";
import { FaUserCircle } from "react-icons/fa";

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("customers");

  const menuItems = [
    { id: "dashboard", label: "DASHBOARD" },
    { id: "customers", label: "CUSTOMERS" },
    { id: "analytics", label: "ANALYTICS" },
    { id: "messages", label: "MESSAGES" },
    { id: "settings", label: "SETTING" },
    { id: "help", label: "HELP CENTRE" },
  ];

  const adminProfile = {
    name: "John Doe",
    email: "admin@example.com",
  };

  return (
    <div className="admin-panel-main">
      <div className="admin-panel-main1">
        <div className="admin-panel-navbar">
        <div className="admin-profile">
              <div className="profile-info">
                <span className="admin-name">
                  <FaUserCircle className="admin-icon" /> {adminProfile.name}
                </span>
                <span className="admin-email">{adminProfile.email}</span>
              </div>
            </div>
        </div>
        <div className="admin-panel">
          <div className="sidebar">
 {/* Admin Profile Section */}
 {/* <div className="admin-profile">
              <div className="profile-info">
                <span className="admin-name">
                  <FaUserCircle className="admin-icon" /> {adminProfile.name}
                </span>
                <span className="admin-email">{adminProfile.email}</span>
              </div>
            </div> */}

            <div className="brand-logo">Brand.</div>
            <nav className="menu">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`menu-item ${activeMenu === item.id ? "active" : ""}`}
                  onClick={() => setActiveMenu(item.id)}
                >
                  <span className="menu-label">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
          <div className="main-content">
            {activeMenu === "customers" && <CustomersList />}
            {/* Add other content for different menu items */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
 