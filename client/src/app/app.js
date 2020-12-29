import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RegisterInsured from './insured/registerInsured';
import RegisterPhysician from './physician/registerPhysician';
import LandingInsured from './insured/landingInsured';
import LandingPhysician from './physician/landingPhysician';
import Administration from './administration';
import NewPrescription from './physician/newPrescription';
import Login from './login';
import RegisterPharmacist from './pharmacist/registerPhamacist';
import LandingPharmacist from './pharmacist/landingPharmacist';

class App extends Component {    
    // Renders page content
    render(){
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
export default App