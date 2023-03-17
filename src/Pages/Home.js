import React, { Component } from "react";
import cookingPot from "../images/pot-icon-12.jpg";
// import logo from "../images/the-og-logo.png";
// import history from './History';
// import { Button } from 'react-bootstrap';


export default class Home extends Component {
    render(){
        return (
            <div className="App-header">
                <div className="section">
                    <img src={cookingPot} alt="cooking pot"/>
                </div>
              <h1>Hi</h1>
            </div>
        );
    }
}
