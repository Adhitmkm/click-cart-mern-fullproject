import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Components/Home/Home";
import LogIn from "./Components/User/Login - SignUp/SignIn/LogIn";
import Signup from "./Components/User/Login - SignUp/SignUp/Signup";
import AdminLogin from "./Components/Admin/Login-Signup/SignIn/AdminLogin";
import AdminSingup from "./Components/Admin/Login-Signup/SignUp/AdminSingup";
import UserProfile from "./Components/User/Profile/UserProfile";
import Adminpage from "./Components/Admin/Dashbord/AdminPanel";
import AccountSettings from "./Components/User/Profile/new profile/AccountSettings";
import Navbar from "./Components/Home/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./Components/Error/ErrorBoundary";
import CustomersList from "./Components/Admin/Dashbord/Customers/CustomersList";

// User Layout for nested routes
const VibezLayout = () => (
  <>

    <Navbar />
    <Outlet /> {/* This renders child components inside /vibez */}
  </>
);

// Admin Layout for nested routes
const AdminLayout = () => (
  <>
    <Adminpage />
    <Outlet /> {/* This renders child components inside /adminpage */}
  </>
);

// Defining routes using createBrowserRouter
const router = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <LogIn /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/signup", element: <AdminSingup /> },
  

  // Nested User Routes
  {
    path: "/vibe",
    element: <VibezLayout />,
    children: [
      { index: true, element: <Home /> }, // Default route for /vibez
      { path: "home", element: <Home /> },
      { path: "profile/*", element: <UserProfile />,
        children : [
          { path: "account", element: <AccountSettings /> },
        ]
       },
    ],
  },

  // Nested Admin Routes
  {
    path: "/adminpage",
    element: <AdminLayout />,
    children: [
      { path: "customers", element: <CustomersList /> },
    ],
  },
]);

function App() {
  return (
  
    <>
    <ErrorBoundary>
      <Toaster /> {/* Add Toaster here to make toast notifications available globally */}
      <RouterProvider router={router} />
      </ErrorBoundary>
    </>


  )
}

export default App;


































































// import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
// import Home from "./Components/Home/Home";
// import LogIn from "./Components/User/Login - SignUp/SignIn/LogIn";
// import Signup from "./Components/User/Login - SignUp/SignUp/Signup";
// import AdminLogin from "./Components/Admin/Login-Signup/SignIn/AdminLogin";
// import AdminSingup from "./Components/Admin/Login-Signup/SignUp/AdminSingup";
// import UserProfile from "./Components/User/Profile/UserProfile";
// import Adminpage from "./Components/Admin/Dashbord/Adminpage";
// import Customers from "./Components/Admin/Dashbord/Customers/Customers";
// import AccountSettings from "./Components/User/Profile/new profile/AccountSettings";
// import Navbar from "./Components/Home/Navbar/Navbar";







// function App() {
//   return (
//     <>

//       <Router>
//         <Routes>
//           {/* User Routes */}
//           <Route path="/login" element={<LogIn />} />
//           <Route path="/" element={<Signup />} />
//           {/* <Route path="/account" element={<AccountSettings />} /> */}
//           {/* Admin Routes */}
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin/signup" element={<AdminSingup />} />
//           {/* <Route path="/admin/user" element={<UserManagementTable />} /> */}
//           {/* <Route path="/customers" element={<Customers/>}/> */}
//           {/* <Route path="/admin" element={<Adminpage/>}/>  */}
//         </Routes>
//       </Router>





//       {/* USER PROFILE PAGE */}




//       {/* USER PROFILE PAGE */}

//       <Router>
//       <Routes>
//         {/* Parent Route with Navbar */}
//         <Route path="/vibez" element={<Navbar />}>
//           <Route index element={<Home />} /> {/* Default page inside /vibe */}
//           <Route path="home" element={<Home />} />
          
//           {/* Profile Page with Nested Routes */}
//           <Route path="profile/*" element={<UserProfile />} />
//         </Route>
//       </Routes>
//     </Router>









//           {/* ADMIN REGISTER*/}
      
//           {/* <Router>
//         <Routes> */}
//           {/* Parent route with nested routes */}
//           {/* <Route path="/admin" element={<AdminSignin />}>
//             <Route path="signup" element={<AdminSingup />} /> */}
//             {/* <Route path="service" element={<Service />} /> */}
//             {/* <Route path="about" element={<About />} /> */}
//           {/* </Route>
//         </Routes>
//       </Router> */}



//       {/* ADMIN ADMINPAGE */}

      
//       <Router>
//         <Routes>
//           {/* Parent route with nested routes */}
//           <Route path="/adminpage" element={<Adminpage />}>
//             <Route path="customers" element={<Customers />} />
//             {/* <Route path="service" element={<Service />} /> */}
//             {/* <Route path="about" element={<About />} /> */}
//           </Route>
//         </Routes>
//       </Router>






//       {/* const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />, // Main landing page
//   },
//   {
//     path: "/admin",
//     element: <AdminPage />, // Parent route with Outlet
//     children: [
//       { path: "dashboard", element: <Dashboard /> },
//       { path: "service", element: <Service /> },
//       { path: "about", element: <About /> },
//     ],
//   },
// ]); */}
//     </>
//   );
// }

// export default App;





