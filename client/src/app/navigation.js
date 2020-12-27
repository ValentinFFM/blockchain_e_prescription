import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Home from './home';
import RegisterInsured from './accountManagement/registerInsured';
import RegisterPhysician from './accountManagement/registerPhysician';
import Administration from './accountManagement/administration';
import NewPrescription from './newPrescription';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class Navigation extends Component {
    render(){
        return(
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/home">E-Prescription</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/registerInsured">Registration Insured</Nav.Link>
                            <Nav.Link href="/registerPhysician">Registration Physician</Nav.Link>
                            <Nav.Link href="/admin">Administration</Nav.Link>
                            <Nav.Link href="/newPrescription">New Prescription</Nav.Link>
                        </Nav>
                        <Button href="/Logout" variant="outline-danger">Logout</Button>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route path="/Home">
                        <Home />
                    </Route>
                    <Route path="/registerInsured">
                        <RegisterInsured />
                    </Route>
                    <Route path="/registerPhysician">
                        <RegisterPhysician />
                    </Route>
                    <Route path="/admin">
                        <Administration />
                    </Route>
                    <Route path="/newPrescription">
                        <NewPrescription />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Navigation;