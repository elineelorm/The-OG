import React, { Component } from "react";
import logo from "../images/the-og-logo.png";
import history from './History';
import { Button } from 'react-bootstrap';


export default class SignUp extends Component {
    render(){
        return (
            <div className="App-header">
              <img src={logo} alt="logo"></img>
              <input
                placeholder="Name"
                name="email"
                className="input-fields"
              />
              <input
                placeholder="Email"
                name="email"
                type="email"
                className="input-fields"
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                className="input-fields"
              />
              <input
                placeholder="Confirm Password"
                name="password"
                type="password"
                className="input-fields"
              />
              <label>
              <input type="checkbox" />
                Allow Notifications
              </label>
              <Button variant="btn" onClick={() => history.push('/Home')}> SignUp </Button>
            </div>
        );
    }
}
