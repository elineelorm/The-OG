import React, { Component } from "react";
import cookingPot from "../images/pot-icon-12.jpg";
import logo from "../images/the-og-logo.png";
import { auth, database } from '../firebase';
import { signOut } from 'firebase/auth';
import history from './History';
// import { Button } from 'react-bootstrap';
import { ref, set, get, update, remove, child , onValue} from "firebase/database";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            safety: '',
            state: '',
            type: ''

        }
    }
    componentDidMount(){
        const dbRef = ref(database, '/Users/1/StoveManagement/stoveid/1/dataId/');
        // const dbRef = ref(database, '/Users/1/StoveManagement');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            // let dataSets = [];

            // snapshot.forEach(childSnapshot=>{
            //     let childKey = childSnapshot.key;
            //     let childValue = childSnapshot.val();
            //     dataSets.push({"ChildKey" : childKey, "data": childValue});
            // });
            // this.setState({dataValues: dataSets});
            // console.log(this.state.dataValues);
            const currentDataset = data[2];
            console.log(currentDataset.Safety);
            this.setState({safety: currentDataset.Safety, state: currentDataset.State,
                 type: currentDataset.Type});
        })

    }
    handleClick() {
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
                            <h5>ID: </h5>
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
