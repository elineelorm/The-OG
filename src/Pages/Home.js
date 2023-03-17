import React, { Component } from "react";
import cookingPot from "../images/pot-icon-12.jpg";
import logo from "../images/the-og-logo.png";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import history from './History';
// import { Button } from 'react-bootstrap';


export default class Home extends Component {
    handleClick(){
        signOut(auth)
        history.push('/Login');        
        window.location.reload();
    }
    render(){
        return (
            <div className="App-body">
                <img class="img-position" src={logo} alt="logo" />
                <div className="row">
                    <div className="col-sm-8 border-right">
                        <img className="cooking-pot" src={cookingPot} alt="cooking pot"/>
                        <div className="info-display">                        
                            <h4 className="info-title">Thermal Stove System</h4>
                            <h5>ID: </h5>
                            <h6>Status: </h6>
                            <h6>Previous Cooking Method: </h6>
                            <h6>Stove System Check: </h6>
                        </div>
                    </div>
                    {/* <div class="d-flex" style={{height: "527px", color: "white"}}>
                        <div className="vr"></div>
                    </div> */}
                    <div className="col-sm-4">
                        <form>
                            <div class="form-group">
                                <label for="new-email">Add Contact</label>
                                <input type="email" class="" id="new-email" placeholder="Contact Email"></input>
                            </div>
                            <button type="submit">Add</button>
                        </form>
                        <button class="dark-button" onClick={this.handleClick}>Log out</button> 
                    </div>
                </div>
                
            </div>
        );
    }
}
