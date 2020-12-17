import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Register from './register'

import {
    Link,
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

class Login extends Component {

    checkLogin(){
        console.log(document.getElementById('public_key').value)
        console.log(document.getElementById('private_key').value)
    }

    render(){
        return(
            <div>
                <Router forceRefresh={true}>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand>E-Prescription</Navbar.Brand>
                    </Navbar>

                    <Container fluid className="mt-5">
                        <Row> 
                            <Col xs={0} sm={1} md={3} lg={4}>
                            </Col>
                            <Col className="">
                                <Form>
                                    <Form.Group controlId="public_key">
                                        <Form.Control type="text" placeholder="Public key"></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="private_key">
                                        <Form.Control type="password" placeholder="Private key"></Form.Control>
                                    </Form.Group>

                                    <Button variant="success" onClick={this.checkLogin} block>Login</Button>
                                </Form>
                            </Col>
                            <Col xs={0} sm={1} md={3} lg={4}>
                            </Col>
                        </Row>
                    </Container>
                    

                </Router>
            </div>            
        )
    }
}
export default Login