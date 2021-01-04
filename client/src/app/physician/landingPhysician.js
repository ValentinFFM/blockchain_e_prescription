import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import PrescriptionListPhysician from './prescriptionListPhysician'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class LandingPhysician extends Component {
    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand>E-Rezept</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/newPrescription">Neues Rezept</Nav.Link>
                        </Nav>
                        <Button href="/Logout" variant="outline-danger">Logout</Button>
                    </Navbar.Collapse>
                </Navbar>

                <Container fluid className="mt-5">
                    <Row> 
                        <Col xs={0} sm={1} md={2} lg={3}></Col>
                        <Col>
                            <h1>Aktuelle Rezepte</h1>
                            <PrescriptionListPhysician />
                        </Col>
                        <Col xs={0} sm={1} md={2} lg={3}></Col>
                    </Row>
                </Container>
            </>
        );
    }
}
export default LandingPhysician;