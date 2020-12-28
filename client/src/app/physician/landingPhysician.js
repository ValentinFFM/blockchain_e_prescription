import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

class LandingPhysician extends Component {
    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>E-Prescription</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/newPrescription">New Prescription</Nav.Link>
                    </Nav>
                    <Button href="/Logout" variant="outline-danger">Logout</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default LandingPhysician;