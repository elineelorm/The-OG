/* eslint-disable no-unused-vars */
import React from "react";
import "../App.css";
import logo from "../images/the-og-logo.png";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import history from './History';


function Login() {
  const performAction = () => {
    history.push('/SignUp');
    window.location.reload();
  }

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
    <div className="App-body">
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
      <div class="btn-group">
        <button onClick={addData}>Log In</button>
        <button class="dark-button" onClick={() => performAction()}> Sign Up </button>
      </div>
    </div>
  );
}

export default Login;