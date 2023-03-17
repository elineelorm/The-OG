import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import history from './History';

export default class Switch extends Component {
    render() {
        return (
            <Router history={history}>
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="/SignUp" element={<SignUp/>} />
                    <Route path="/Home" element={<Home />} />
                    {/* <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} /> */}
                </Routes>
            </Router>
        )
    }
}