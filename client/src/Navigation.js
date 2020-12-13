import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Home from './home'
import Blockchain from './blockchain';

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
                            <Nav.Link href="/Home">Home</Nav.Link>
                            <Nav.Link href="/NewPrescription">New prescription</Nav.Link>
                        </Nav>
                        <Button href="/Logout" variant="outline-danger">Logout</Button>
                    </Navbar.Collapse>
                </Navbar>


                <Switch>
                    <Route path="/Home">
                        <Home />
                    </Route>
                    <Route path="/NewPrescription">
                        <Blockchain />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Navigation;