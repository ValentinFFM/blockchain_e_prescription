import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Home from './Home'
import Blockchain from './Blockchain';

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
                <Navbar.Brand href="#home">E-Prescription-Service</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/Home">Home</Nav.Link>
                        <Nav.Link href="/Blockchain">Blockchain</Nav.Link>
                    </Nav>
                    <Button variant="outline-danger">Logout</Button>
                </Navbar.Collapse>
                </Navbar>


                <Switch>
                    <Route path="/Home">
                        <Home />
                    </Route>
                    <Route path="/Blockchain">
                        <Blockchain />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
export default Navigation;