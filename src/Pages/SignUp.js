import React, { Component } from "react";
import logo from "../images/the-og-logo.png";
import history from './History';
import { database } from '../firebase';
import { ref, set, onValue } from "firebase/database";
import { validateEmail } from '../utils/helpers';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      pw: '',
      confirmPw: '',
      userId: 1,
      errorMessage: ''

    }
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePwInput = this.handlePwInput.bind(this);
    this.handleconfirmPwInput = this.handleconfirmPwInput.bind(this);
  }

  componentDidMount() {
    const dbuserRef = ref(database, '/Users/');

    onValue(dbuserRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();

        let userArray = Object.keys(userData);
        let lastUserId = userArray[userArray.length - 1];
        let newUserId = Number(lastUserId) + 1;
        this.setState({
          userId: newUserId
        });
      }
      else {
        console.log("No user");
        this.setState({
          userId: 1
        });
      }
    })
  }
  handleNameInput(event) {
    this.setState({ name: event.target.value });
    console.log(this.state.name);
  }
  handleEmailInput(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }
  handlePwInput(event) {
    this.setState({ pw: event.target.value });
    console.log(this.state.pw);
  }
  handleconfirmPwInput(event) {
    this.setState({ confirmPw: event.target.value });
    console.log(this.state.confirmPw);
  }
  signupClick = (event) => {
    event.preventDefault();

    const isValid = validateEmail(this.state.email);
    if (!this.state.name) {
      this.setState({ errorMessage: 'Missing name' });
    }
    else if (!isValid) {
      this.setState({ errorMessage: 'Your email is invalid.' });
    } else if (this.state.confirmPw !== this.state.pw) {
      this.setState({ errorMessage: 'Confirm Password is different than Password' });
    }
    else if (!this.state.pw) {
      this.setState({ errorMessage: 'Missing Password' });
    }
    else {
      this.setState({ errorMessage: '' });
      set(ref(database, '/Users/' + this.state.userId), {
        Email: this.state.email,
        Name: this.state.name,
        Password: this.state.pw
      });
      set(ref(database, '/Admin/'), {
        currentUserId: this.state.userId
      });
      this.setState({ name: '' });
      this.setState({ email: '' });
      this.setState({ pw: '' });
      this.setState({ confirmPw: '' });
      history.push('/Home');
      window.location.reload();
    }

  }
  // handleSignup() {
  //   history.push('/Home');
  //   window.location.reload();
  // }
  render() {
    return (
      <div className="App-body" >
        <img src={logo} alt="logo"></img>
        <input
          placeholder="Name"
          name="name"
          type="name"
          className="input-fields"
          value={this.state.name} onChange={this.handleNameInput}
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          className="input-fields"
          value={this.state.email} onChange={this.handleEmailInput}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          className="input-fields"
          value={this.state.pw} onChange={this.handlePwInput}
        />
        <input
          placeholder="Confirm Password"
          name="password"
          type="password"
          className="input-fields"
          value={this.state.confirmPw} onChange={this.handleconfirmPwInput}
        />
        <label class="checkbox-group">
          <input id="check-box" type="checkbox" checked />
          Allow Notifications
        </label>
        <button class="dark-button" onClick={this.signupClick}> SignUp </button>
        {this.state.errorMessage && (
          <div>
            <p>{this.state.errorMessage}</p>
          </div>
        )
        }
      </div >
    );
  }
}
