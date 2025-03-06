import { Link, useNavigate } from 'react-router-dom'
import './AdminSingup.css'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_MY_URL;




export default function AdminSingup() {

  const navigate = useNavigate();


  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: ""
  });

  const [errors, setErrors] = useState({});



  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const validate = () => {
    let formErrors = {};
    
    if (!input.firstName.trim()) {
      formErrors.firstName = "firstName is required.";
    }

    if (!input.lastName.trim()) {
      formErrors.lastName = "lastName is required.";
    }

    if (!input.email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      formErrors.email = "Email is invalid.";
    } 
  
    if (!input.password.trim()) {
      formErrors.password = "Password is required.";
    } else if (input.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    }
  
    if (!input.conformPassword.trim()) {
      formErrors.conformPassword = "Please confirm your password.";
    } else if (input.password !== input.conformPassword) {
      formErrors.conformPassword = "Passwords do not match.";
    }
  
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


  const handleSubmitEvent = async (e) => {
    console.log("inputs",input)
    e.preventDefault();

    if (!validate()) {
      for (const key in errors) {
        if (errors[key]) {
          toast.error(errors[key]);
        }
      }
      return;
    }

    try {
      const response = await axios.post(`${url}/admin/auth/signup`, input);
      const accessToken = response.data.accessToken;
      console.log("token is",response.data.accessToken)
      localStorage.setItem('accessToken', accessToken);
      setInput({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        conformPassword: ""
      });
      
      toast.success("Successfully registered");
      navigate("/adminpage");
      toast.error(response.data.msg) // backend nn verunna msg

     } catch (err) {
      console.log(err);
      toast.error(err.data.err);
    }
  }; 


  return (
    <div className="signup-admin-main">
    <div className="signup-admin">
      <div className='signup-admin-page-1'>
        <div className='signup-admin-page1-content'>
          <div className='admin-welcome'>
          <img  className='sinup-logo-mobile' src='src\assets\Nav icons/greenvibe.png'></img>

          <h1>Welcome SOLEVIBE!</h1>
          <p>
            Our brand new day is here . Its our day to shape. <br />
            Sign Up and get Manage on your Vibe Users
          </p>
          </div>
          <form onSubmit={handleSubmitEvent} className='admin-signup-form'>
            <label>Name</label>
              <div className='admin-form-data'>
              <input
                  type="text"
                  name="firstName"
                  value={input.firstName}
                  placeholder="First Name"
                  onChange={handleInput}
                />
            </div>
            <label>Last Name</label>
              <div className='user-form-data'>
              <input
                  type="text"
                  name="lastName"
                  value={input.lastName}
                  placeholder="Last Name"
                  onChange={handleInput}
                />
            </div>
            <label>Email</label>
              <div className='admin-form-data'>
              <input
                  type="email"
                  name="email"
                  value={input.email}
                  placeholder="name@gmail.com"
                  onChange={handleInput}
                />
            </div>
            <label>Password</label>
              <div className='admin-form-data' id='admin-password'>
              <input
                  type="password"
                  name="password"
                  value={input.password}
                  placeholder="Password"
                  onChange={handleInput}
                />
            </div>
            <label>Conform Password</label>
              <div className='admin-form-data' id='admin-password'>
              <input
                  type="password"
                  name="conformPassword"
                  value={input.conformPassword}
                  placeholder="Confirm Password"
                  onChange={handleInput}
                />
            </div>
            <div className="user-btn">
            <button className="admin-submit-btn">Submit</button>
        </div>

          </form>
          <div className="admin-signup-divider">
        <span>Or continue with</span>
      </div>
      
      <div className='admin-signup-google-facebook'>
      <div className="admin-signup-google">
            <button className="admin-signup-google-btn">Google</button>
        </div>
        <div className="admin-signup-facebook">
            <button className="admin-signup-google-btn">Facebook</button>
        </div>
      </div>
      <div className="signup-prompt">
        Alredy you have an account? <Link to={"/admin/login"}>LogIn!</Link>
      </div>
        </div>
      </div>
      <div className='signup-admin-page-2'>
          <img src="src\assets\Login-signup-images\signimg.png" alt="" />
      </div>
    </div>
</div>
  )
}
