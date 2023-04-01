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
            errorMessage: ''

        }
        this.handleEmailInput = this.handleEmailInput.bind(this);
    }
    componentDidMount() {
        const dbRef = ref(database, '/Users/1/StoveManagement/stoveid/2/dataId/');

        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // let dataSets = [];

                // snapshot.forEach(childSnapshot=>{
                //     let childKey = childSnapshot.key;
                //     let childValue = childSnapshot.val();
                //     dataSets.push({"ChildKey" : childKey, "data": childValue});
                // });
                // this.setState({dataValues: dataSets});
                // console.log(this.state.dataValues);

                let objArray = Object.keys(data);
                let lastObjId = objArray[objArray.length - 1];
                const lastObj = data[lastObjId];
                console.log(data);
                console.log(objArray);

                console.log(lastObj);
                const currentDataset = lastObj;
                console.log(currentDataset);
                console.log(currentDataset.Safety);
                this.setState({
                    id: lastObjId, safety: currentDataset.Safety, state: currentDataset.State,
                    type: currentDataset.Type
                });
            }
            else {
                console.log("No data for this user");
            }
        })
        const dbRefForContact = ref(database, '/Users/1/Contacts/');

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
            set(ref(database, '/Users/1/Contacts/' + this.state.contactId), {
                Email: this.state.addEmail
            });
            this.setState({ addEmail: '' });
        }
    }
    handleEmailInput(event) {
        this.setState({ addEmail: event.target.value });
        console.log(this.state.addEmail);
    }
    handleLogout() {
        signOut(auth);//signout relocated went to a page only with Footer
        history.push('/Login');
        window.location.reload();
    }
    render() {
        return (
            <div className="App-body">
                <img class="img-position" src={logo} alt="logo" />
                <div className="row">
                    <div className="col-sm-8 border-right">
                        <img className="cooking-pot" src={cookingPot} alt="cooking pot" />
                        <div className="info-display">
                            <h4 className="info-title">Thermal Stove System</h4>
                            <h5>ID: {this.state.id}</h5>
                            <h6>Status: {this.state.safety}</h6>
                            <h6>Previous Cooking Method: {this.state.type}</h6>
                            <h6>Stove System Check: {this.state.state}</h6>
                        </div>
                    </div>
                    {/* <div class="d-flex" style={{height: "527px", color: "white"}}>
                        <div className="vr"></div>
                    </div> */}
                    <div className="col-sm-4">
                        <form>
                            <div class="form-group">
                                <label for="new-email">Add Contact</label>
                                <input type="email" class="" id="new-email" placeholder="Contact Email" value={this.state.addEmail} onChange={this.handleEmailInput} required />
                            </div>
                            <button type="submit" onClick={this.emailSubmitClick}>Add</button>
                        </form>
                        {this.state.errorMessage && (
                            <div>
                                <p>{this.state.errorMessage}</p>
                            </div>
                        )}
                        <button class="dark-button" onClick={this.handleLogout}>Log out</button>
                    </div>
                </div>

            </div>
        );
    }
}
