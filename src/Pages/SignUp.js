import React, { Component } from "react";
import logo from "../images/the-og-logo.png";
import history from './History';


export default class SignUp extends Component {
    handleClick() {
        history.push('/Home');        
        window.location.reload();
    }
    render(){
        return (
            <div className="App-body">
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
              <label class="checkbox-group">
              <input id="check-box" type="checkbox" checked/>
                Allow Notifications
              </label>
              <button class="dark-button" onClick={this.handleClick}> SignUp </button>
            </div>
        );
    }
}
