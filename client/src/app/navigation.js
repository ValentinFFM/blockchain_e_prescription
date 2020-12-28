import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Login from './accountManagement/login'
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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>E-Prescription</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/admin">Administration</Nav.Link>
                        <Nav.Link href="/newPrescription">New Prescription</Nav.Link>
                    </Nav>
                    <Button href="/Logout" variant="outline-danger">Logout</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Navigation;