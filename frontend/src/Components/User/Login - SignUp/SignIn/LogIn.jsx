//"Sign in" means accessing an existing account on a website or app using your credentials,
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './LogIn.css'
import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

const url = import.meta.env.VITE_MY_URL;


  const LogIn = () => {
  const navigate=useNavigate();

const [input, setInput] = useState({
  email : "",
  password : "",
  conformPassword : ""
})

// const handleInput = (e) =>{
//   const name = e.target.name;    // eath input box aanann 
//   console.log("name",name) 
//   const value = e.target.value;   // values edukkam
//   console.log("value",value) 
// ee name value destucture format   const { name, value } = e.target;
//   setInput((prev) => { // data
//     return {...prev, [name]:value}
//   })
// }  ith destucture cheyam



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
};



// const handleSubmitEvent = (e)=>{
//   console.log("inputs",input)
//   e.preventDefault();

// } // ith nammal oru form ayath kond onsubmit feature und ath vech nammal a values submit click cheyumbo input aakiya datas edukam or kanam

// ith nammal async aakunnu bcz namuk oru api call api und so sear more info 
// thayey ulla awit eyuthanamenkil asyc function aavanam
const handleSubmitEvent = async (e)=>{
  e.preventDefault();
  
  // console.log("inputs",input)
  // console.log("email",email)
  // console.log("password",password) // checking destucture
  //  if(!input.email.trim()) {} // destructure illankil ee way use aakuka
  // const {email,password} = input // eror another way use aakam


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
      const response = await axios.post(`${url}/auth/login`, input);
      if (response.data.err) {
        toast.error(response.data.err);
      } 
      console.log("response:",response)
      if (response.data.err) {
        toast.error(response.data.err); // Show error message from backend
        return; // Stop execution if there's an error
      }
        const accessToken = response.data.accessToken;
        if (!accessToken) {
          toast.error("No user found.");
          return;
        }

        console.log("acess token",accessToken)
        localStorage.setItem('accessToken',accessToken);
        setInput({
          email: "",
          password: "",
          conformPassword: ""
        });
        
        toast.success("Successfully registered");
        navigate("/vibe");


  }catch (err) {
    console.error("Login error:", err);
  
    if (err.response && err.response.data) {
      toast.error(err.response.data.err || "An error occurred during login.");
    } else {
      toast.error("Network error or server is down.");
    }
  }

  setInput({
    email: "",
    password: "",
  });

}

  return (
    <div className="signin-user-main">
        <div className="signin-user">
          <div className='signin-user-page-1'>
            <div className='signin-user-page1-content'>
              <div className='user-welcome'>
              <img  className='sinup-logo-mobile' src='src\assets\Nav icons/greenvibe.png'></img>

              <h1>Welcome Back!</h1>
              <p>
                A brand new day is here . Its your day to shape. <br />
                Sign in and get started on your Vibe
              </p>
              </div>
              <form  onSubmit={handleSubmitEvent} className='user-signin-form'>
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
                <label>Conform Password</label>
                  <div className='user-form-data' id='user-signin-password'>
                  <input
                  type="password"
                  name="conformPassword"
                  value={input.conformPassword}
                  placeholder="Confirm Password"
                  onChange={handleInput}
                />
                    <p className="user-reset">Forgot Password ?</p>
                </div>
                <div className="user-btn">
                <button className="user-submit-btn">Submit</button>
            </div>
              </form>
              <div className="user-signin-divider">
            <span>Or continue with</span>
          </div>
          
          <div className='user-signin-google-facebook'>
          <div className="user-signin-google">
                <button className="user-signin-google-btn">Google</button>
            </div>
            <div className="user-signin-facebook">
                <button className="user-signin-google-btn">Facebook</button>
            </div>
          </div>
          <div className="signin-user-prompt">
            Dont you have an account? <Link to={"/"}>SignUp!</Link>
          </div>
            </div>
          </div>
          <div className='signin-user-page-2'>
              <img src="src\assets\Login-signup-images\signimg.png " alt="" />
          </div>
        </div>
    </div>
  )
}
export default LogIn;