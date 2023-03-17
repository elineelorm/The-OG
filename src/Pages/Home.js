import React, { Component } from "react";
import cookingPot from "../images/pot-icon-12.jpg";
import logo from "../images/the-og-logo.png";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
// import history from './History';
// import { Button } from 'react-bootstrap';


export default class Home extends Component {
    render(){
        return (
            <div className="App-header">
                <img src={logo} alt="logo" />
                <div className="section">
                    <img src={cookingPot} alt="cooking pot"/>
                    <div className="info-display">
                        <h4 className="info-title">Thermal Stove System</h4>
                        <h5>ID: </h5>
                        <h6>Status: </h6>
                        <h6>Previous Cooking Method: </h6>
                        <h6>Stove System Check: </h6>
                    </div>
                </div>
                <div className="section">
                    <form>
                        <div class="form-group">
                            <label for="new-email">Add Contact</label>
                            <input type="email" class="form-control" id="new-email" placeholder="Contact Email"></input>
                        </div>
                        <button type="submit">Add</button>
                    </form>
                    <button onClick={signOut(auth)}>Log out</button> 
                </div>
            </div>
        );
    }
}
