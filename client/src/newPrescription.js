import React, { Component } from "react";
import UserContract from "./contracts/User.json";
import getWeb3 from "./getWeb3";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class NewPrescription extends Component {
  state = {value: "", web3: null, accounts: null, contract: null };

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value})
  }

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
                  <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Krankenkasse bzw. Kostenträger"></Form.Control>
                </Form.Group>
                
                <Button variant="success" block>Submit</Button>
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
