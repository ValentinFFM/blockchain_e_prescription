import React, { Component } from "react";
import PrescriptionContract from "./contracts/Prescription.json";
import getWeb3 from "./getWeb3";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class NewPrescription extends Component {

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <Container fluid className="mt-5">
          <Row> 
            <Col sm={2}>
            </Col>
            <Col className="">
              <Form>
                <Form.Group controlId="insurance">
                  <Form.Control type="text" placeholder="Krankenkasse bzw. Kostenträger"></Form.Control>
                </Form.Group>
                
                <Button variant="success" block onClick={this.newPrescription}>Submit</Button>
              </Form>
            </Col>
            <Col sm={2}>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default NewPrescription;
