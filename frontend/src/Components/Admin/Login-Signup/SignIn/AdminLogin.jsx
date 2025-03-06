import { Link, useNavigate } from 'react-router-dom'
import './AdminLogIn.css'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_MY_URL;


export default function AdminSignin() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email : "",
    password : "",
    conformPassword : ""
  })


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
}

const handleSubmitEvent = async (e)=>{
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
      const response = await axios.post(`${url}/admin/auth/login`, input);
      if (response.data.err) {
        toast.error(response.data.err);
      } 
      console.log("response:",response)
        const accessToken = response.data.accessToken;
        console.log("acess token",accessToken)
        localStorage.setItem('accessToken',accessToken);
        setInput({
          email: "",
          password: "",
          conformPassword: ""
        });
        
        toast.success("Successfully registered");
        navigate("/adminpage");
        toast.error(response.data.msg)


  }catch(err){
    console.error("Signup error:", err);
    if (err.response) {
      toast.error(err.response.data.err || "An error occurred during signup.");
    } else {
      toast.error("Network error or server is down.");
    }
  }


  setInput({
    email: "",
    password: "",
    conformPassword : ""
  });

}




  return (
    <div className="signin-admin-main">
    <div className="signin-admin">
      <div className='signin-admin-page-1'>
        <div className='signin-admin-page1-content'>
          <div className='admin-welcome'>
          <img  className='sinup-logo-mobile' src='src\assets\Nav icons/greenvibe.png'></img>
          <h1>Welcome Back!</h1>
          <p>
            Our brand new day is here . Its your day to shape. <br />
            Sign in and get Manage on your Vibe Users
          </p>
          </div>
          <form onSubmit={handleSubmitEvent} className='admin-signin-form'>
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
              <div className='admin-form-data'>
              <input
                  type="password"
                  name="password"
                  value={input.password}
                  placeholder="Password"
                  onChange={handleInput}
                />   
            </div>
            <label>Conform Password</label>
              <div className='admin-form-data' id='admin-signin-password'>
              <input
                  type="password"
                  name="conformPassword"
                  value={input.conformPassword}
                  placeholder="Confirm Password"
                  onChange={handleInput}
                />
                <p className="admin-reset">Forgot Password ?</p>
            </div>
            <div className="admin-btn">
            <button className="admin-submit-btn">Submit</button>
        </div>
          </form>
          <div className="admin-signin-divider">
        <span>Or continue with</span>
      </div>
      
      <div className='admin-signin-google-facebook'>
      <div className="admin-signin-google">
            <button className="admin-signin-google-btn">Google</button>
        </div>
        <div className="admin-signin-facebook">
            <button className="admin-signin-google-btn">Facebook</button>
        </div>
      </div>
      <div className="signin-admin-prompt">
        Dont you have an account? <Link to={"/admin/signup"}>SignUp!</Link>
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
