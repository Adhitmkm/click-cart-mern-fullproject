import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_MY_URL;

const Signup = () => {
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
      // namuk email anghaney seperate pakaram aa key eduth kanukan
      for (const key in errors) {
        if (errors[key]) {
          toast.error(errors[key]); // erorum kankum eathintathanann key vech manasilakum
        }
      }
      return; // Stop further execution if validation fails
    }


    try {
      const response = await axios.post(`${url}/auth/signup`, input);
      if (response.data.err) {
        toast.error(response.data.err);
        return;
      } 
      // console.log("response",response)
      // toast.error(response.data.err);
      // console.log("token is",response.data.accessToken)
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      setInput({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        conformPassword: ""
      });
      toast.success("Successfully registered");
      navigate("/vibe");
     } catch (err) {
      console.error("Signup error:", err);
    
      if (err.response && err.response.data) {
        toast.error(err.response.data.err || "An error occurred during signup.");
      } else {
        toast.error("Network error or server is down.");
      }
    }
  };

  return (
    <div className="signup-user-main">
      <div className="signup-user">
        <div className='signup-user-page-1'>
          <div className='signup-user-page1-content'>
            <div className='user-welcome'>
              <img className='sinup-logo-mobile' src='src/assets/Nav icons/greenvibe.png' alt="logo" />
              <h1>Welcome SOLEVIBE!</h1>
              <p>
                A brand new day is here. Its your day to shape. <br />
                Sign in and get started on your Vibe
              </p>
            </div>
            <form onSubmit={handleSubmitEvent} className='user-signup-form'>
              <label>Name</label>
              <div className='user-form-data'>
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
              <div className='user-form-data'>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  placeholder="name@gmail.com"
                  onChange={handleInput}
                />
              </div>
              <label>Password</label>
              <div className='user-form-data' id='user-password'>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  placeholder="Password"
                  onChange={handleInput}
                />
              </div>
              <label>Confirm Password</label>
              <div className='user-form-data' id='user-password'>
                <input
                  type="password"
                  name="conformPassword"
                  value={input.conformPassword}
                  placeholder="Confirm Password"
                  onChange={handleInput}
                />
              </div>
              <div className="user-btn">
                <button className="user-submit-btn">Submit</button>
              </div>
            </form>
            <div className="user-signup-divider">
              <span>Or continue with</span>
            </div>
            <div className='user-signup-google-facebook'>
              <div className="user-signup-google">
                <button className="user-signup-google-btn">Google</button>
              </div>
              <div className="user-signup-facebook">
                <button className="user-signup-google-btn">
                  <img src='src/assets/Login-signup-images/signup-prompt' alt='' />
                  Facebook
                </button>
              </div>
            </div>
            <div className="signup-prompt">
              Already have an account? <Link to="/Login">LogIn!</Link>
            </div>
          </div>
        </div>
        <div className='signup-user-page-2'>
          <img src="src/assets/Login-signup-images/signimg.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;











