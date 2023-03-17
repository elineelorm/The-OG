/* eslint-disable no-unused-vars */
import React from "react";
import "../App.css";
import logo from "../images/the-og-logo.png";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import history from './History';
import { Button } from 'react-bootstrap';


function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }

    setData({ ...data, ...inputs })
  }

  const addData = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
    history.push('/Home')
  }

  const handlelogout = () => {
    signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if(data){
        alert("Logged In")
      }
      else {
        alert('Not Logged In')
      }
    })
  }, [])
  return (
    <div className="App-header">
      <img src={logo} alt="logo"></img>
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={event => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={event => handleInputs(event)}
      />
      <Button onClick={addData}>Log In</Button>
      <Button variant="btn" onClick={() => history.push('/SignUp')}> SignUp </Button>
    </div>
  );
}

export default Login;