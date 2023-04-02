/* eslint-disable no-unused-vars */
import React from "react";
import "../App.css";
import logo from "../images/the-og-logo.png";
import { useEffect, useState } from 'react';
import { auth, database } from '../firebase';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import history from './History';
import { ref, set, onValue } from "firebase/database";

function Login() {
  const performAction = () => {
    history.push('/SignUp');
    window.location.reload();
  }

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [userId, setUserId] = useState(0);
  const [userLogin, setUserLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function checkUserLogin(dataObj) {
    const { email, password } = dataObj;
    console.log(email);
    const dbuserRef = ref(database, 'Users/');
    onValue(dbuserRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let userIdArray = Object.keys(data);

        for (let index of userIdArray) {
          if (data[index].Email === email) {
            console.log("In for loop");
            if (data[index].Password === password) {
              setUserLogin(true);
              setUserId(Number(index));
              console.log("In for loop true");
              break;
            }
            else {
              setErrorMessage(`Password incorrect!`);
              console.log("In for loop wrong");
            }
            break;
          } else {
            setErrorMessage(`No such user!`);
          }
        }
      }
      else {
        console.log("No users");
        setErrorMessage(`No user!`);
      }
    });
  }

  const handleInputs = (event) => {
    event.preventDefault();

    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  }

  const addData = (event) => {
    event.preventDefault();

    // signInWithEmailAndPassword(auth, data.email, data.password);
    
    checkUserLogin(data);
    if (userLogin) {
      set(ref(database, '/Admin/'), {
        currentUserId: userId
      });
      history.push('/Home');
      window.location.reload();
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
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
      {errorMessage && (
        <div>
          <p >{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;