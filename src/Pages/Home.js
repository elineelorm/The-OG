import React, { Component } from "react";
import cookingPot from "../images/pot-icon-12.jpg";
import logo from "../images/the-og-logo.png";
import { auth, database } from '../firebase';
import { signOut } from 'firebase/auth';
import history from './History';
// import { Button } from 'react-bootstrap';
import { ref, set, get, update, remove, child, onValue } from "firebase/database";
import { validateEmail } from '../utils/helpers';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            safety: '',
            state: '',
            type: '',
            addEmail: '',
            contactId: 1,
            errorMessage: '',
            userId: 1,
            dataMessage: ''

        }
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }
    componentDidMount() {
        const dbAdminRef = ref(database, '/Admin/');

        onValue(dbAdminRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                //console.log(data);
                this.setState({
                    userId: data.currentUserId
                });
            }
            else {
                console.log("No current user");
            }
        }) 
        
        const dbRef = ref(database, '/Users/' + this.state.userId + '/StoveManagement/');
        console.log(this.state.userId);
        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                //console.log(data);
                this.setState({
                    id: data.stoveId, safety: data.Safety, state: data.State,
                    type: data.Type
                });
            }
            else {
                this.setState({ dataMessage: 'No stove data at the moment!' });
            }
        })
        const dbRefForContact = ref(database, '/Users/' + this.state.userId + '/Contacts/');

        onValue(dbRefForContact, (snapshot) => {
            if (snapshot.exists()) {
                const contactData = snapshot.val();

                let contactArray = Object.keys(contactData);
                let lastContactId = contactArray[contactArray.length - 1];
                let newContactId = Number(lastContactId) + 1;
                this.setState({
                    contactId: newContactId
                });
            }
            else {
                console.log("No contact for this user");
                this.setState({
                    contactId: 1
                });
            }
        })
    }
    emailSubmitClick = (event) => {
        event.preventDefault();
        const isValid = validateEmail(this.state.addEmail);
        if (!isValid) {
            this.setState({ errorMessage: 'Your email is invalid.' });
        } else {
            this.setState({ errorMessage: '' });
            set(ref(database, '/Users/' + this.state.userId + '/Contacts/' + this.state.contactId + "/"), {
                Email: this.state.addEmail
            });
            this.setState({
                contactId: Number(this.state.contactId) + 1
            });
            this.setState({ addEmail: '' });
        }
    }
    handleEmailInput(event) {
        this.setState({ addEmail: event.target.value });
        console.log(this.state.addEmail);
    }
    handleLogout() {
        // signOut(auth);
        set(ref(database, '/Admin/'), {
            currentUserId: 0
        });
        history.push('/');
        window.location.reload();
    }
    render() {
        return (
            <div className="App-body">
                <img className="img-position" src={logo} alt="logo" />
                <div className="row">
                    <div className="col-sm-8 border-right">
                        <img className="cooking-pot" src={cookingPot} alt="cooking pot" />
                        <div className="info-display">
                            <h4 className="info-title">Thermal Stove System</h4>
                            <h5>Stove ID: {this.state.id}</h5>
                            <h6>Status: {this.state.safety}</h6>
                            <h6>Previous Cooking Method: {this.state.type}</h6>
                            <h6>Stove System Check: {this.state.state}</h6>
                            {this.state.dataMessage && (
                                <h3>{this.state.dataMessage}</h3>

                            )}
                        </div>
                    </div>
                    {/* <div class="d-flex" style={{height: "527px", color: "white"}}>
                        <div className="vr"></div>
                    </div> */}
                    <div className="col-sm-4">
                        <form>
                            <div className="form-group">
                                <label htmlFor="new-email">Add Contact</label>
                                <input type="email" className="" id="new-email" placeholder="Contact Email" value={this.state.addEmail} onChange={this.handleEmailInput} required />
                            </div>
                            <button type="submit" onClick={this.emailSubmitClick}>Add</button>
                        </form>
                        {this.state.errorMessage && (
                            <div>
                                <p>{this.state.errorMessage}</p>
                            </div>
                        )}
                        <button className="dark-button" onClick={this.handleLogout}>Log out</button>
                    </div>
                </div>

            </div>
        );
    }
}
