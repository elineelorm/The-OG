import React from "react";
import './App.css';
// import { useEffect, useState } from 'react';
// import { auth } from './firebase';
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
import Footer from "./components/Footer";
// import SignUp from "./Pages/SignUp";
// import Home from "./Pages/Login";
// import logo from "../src/images/the-og-logo.png";
// import { BrowserRouter as Router, Route}
//     from 'react-router-dom';
import Switch from "./Pages/Switch";

function App() {
  //const auth = getAuth();
  // const [data, setData] = useState({
  //   email: '',
  //   password: ''
  // })
  // const handleInputs = (event) => {
  //   let inputs = { [event.target.name]: event.target.value }

  //   setData({ ...data, ...inputs })
  // }

  // const addData = () => {
  //   signInWithEmailAndPassword(auth, data.email, data.password)
  // }

  // const handlelogout = () => {
  //   signOut(auth);
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (data) => {
  //     if(data){
  //       alert("Logged In")
  //     }
  //     else {
  //       alert('Not Logged In')
  //     }
  //   })
  // }, [])
  return (
     <div>
       {/* <Home /> */}
        {/* <Router> */}
        <Switch />
        {/* </Router> */}
      
      

       {/* <button onClick={addData}>Log In</button> */}
      
      
      {/* <button onClick={handlelogout}>Log out</button> */}
      <Footer />
  
      </div>
  );
}

export default App; 
