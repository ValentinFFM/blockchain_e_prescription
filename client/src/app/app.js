/**
 * @author Valentin Mueller <https://github.com/ValentinFFM>
 */

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Component imports
import Administration from './administration';
import Login from './login';
import LandingInsured from './insured/landingInsured';
import RegisterInsured from './insured/registerInsured';
import LandingPharmacist from './pharmacist/landingPharmacist';
import RegisterPharmacist from './pharmacist/registerPhamacist';
import LandingPhysician from './physician/landingPhysician';
import NewPrescription from './physician/newPrescription';
import RegisterPhysician from './physician/registerPhysician';



class App extends Component {
    render(){

        // Checks if MetaMask is available and returns a error message, if not.
        if(window.ethereum === undefined){
            return(
                <div class="m-5">
                    <h1>MetaMask konnte nicht gefunden werden!</h1>
                    <p>
                        Die für die Anwendung erforderliche Browser-Erweiterung MetaMask konnte nicht gefunden werden. <br/>
                        Bitte überprüfen Sie, ob Sie MetaMask ihrem Browser hinzugefügt haben und Sie einen mit MetaMask kompatiblen Browser verwenden!
                    </p>
                </div>
            )
        } else {
            // Renders a router including all pages to enable the navigation through the application.
            return (
                <Router>
                    <Switch>
                        <Route path="/insured">
                            <LandingInsured/>
                        </Route>
                        <Route path="/physician">
                            <LandingPhysician/>
                        </Route>
                        <Route path="/pharmacist">
                            <LandingPharmacist/>
                        </Route>
                        <Route path="/registerInsured">
                            <RegisterInsured/>
                        </Route>
                        <Route path="/registerPhysician">
                            <RegisterPhysician/>
                        </Route>
                        <Route path="/registerPharmacist">
                            <RegisterPharmacist/>
                        </Route>
                        <Route path="/admin">
                            <Administration/>
                        </Route>
                        <Route path="/newPrescription">
                            <NewPrescription/>
                        </Route>
                        <Route path="/">
                            <Login/>
                        </Route>
                    </Switch>
                </Router>
            )
        }        
    }
}
export default App