// Default react imports 
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './app/serviceWorker';

// Importing Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingInsured from './app/landingPages/landingInsured';
import LandingPhysician from './app/landingPages/landingPhysician'
import Login from './app/accountManagement/login';
import RegisterInsured from './app/accountManagement/registerInsured';
import RegisterPhysician from './app/accountManagement/registerPhysician';
import Administration from './app/accountManagement/administration';
import NewPrescription from './app/newPrescription';

ReactDOM.render((
    <Router>
        <Switch>
            <Route path="/insured">
                <LandingInsured/>
            </Route>
            <Route path="/physician">
                <LandingPhysician/>
            </Route>
            <Route path="/registerInsured">
                <RegisterInsured/>
            </Route>
            <Route path="/registerPhysician">
                <RegisterPhysician/>
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
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
