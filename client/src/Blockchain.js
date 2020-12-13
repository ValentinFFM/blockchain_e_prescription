import React, { Component } from "react";
import PrescriptionContract from "./contracts/Prescription.json";
import getWeb3 from "./getWeb3";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class Blockchain extends Component {
  state = {value: "", web3: null, accounts: null, contract: null };

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("Web3: ", web3)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("Accounts: ", accounts)

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PrescriptionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PrescriptionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log("Instance: ", instance)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange(event){
    this.setState({value:event.target.value})
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log("State: ", this.state)

    await contract.methods.setInsurance(this.state.value).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getInsurance().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Container fluid className="mt-5">
          <Row> 
            <Col sm={2}>
            </Col>
            <Col className="">
              <Form>
                <Form.Group controlId="insurance">
                  <Form.Control type="text" placeholder="Krankenkasse bzw. Kostenträger" value={this.state.value} onChange={this.handleChange}></Form.Control>
                </Form.Group>

                
                <Container>
                  <Row>
                    <Col className="p-0 pr-1">
                      <Form.Group controlId="insured_surname">
                        <Form.Control type="text" placeholder="Vorname des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pl-1">
                      <Form.Group controlId="insured_name">
                        <Form.Control type="text" placeholder="Name des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0 pr-1" sm={9}>
                      <Form.Group controlId="insured_street">
                        <Form.Control type="text" placeholder="Straße des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pr-1" sm={3}>
                      <Form.Group controlId="insured_street_number">
                        <Form.Control type="text" placeholder="Hausnummer des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="insured_post_code">
                        <Form.Control type="number" placeholder="Postleitzahl des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pr-1" sm={8}>
                      <Form.Group controlId="insured_city">
                        <Form.Control type="text" placeholder="Stadt des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="insured_birth_date">
                    <Form.Control type="text" placeholder="Geburtstag des Versicherten" value={this.state.value} onChange={this.handleChange}></Form.Control>
                  </Form.Group>
                    

                  <Row>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="insurance_number">
                        <Form.Control type="number" placeholder="Kassen-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="insured_number">
                        <Form.Control type="number" placeholder="Versicherten-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="status">
                        <Form.Control type="number" placeholder="Status" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="institution_number">
                        <Form.Control type="number" placeholder="Betriebsstätten-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="physician_number">
                        <Form.Control type="number" placeholder="Arzt-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="p-0 pr-1" sm={4}>
                      <Form.Group controlId="date">
                        <Form.Control type="number" placeholder="Datum" value={this.state.value} onChange={this.handleChange}></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                </Container>


                <Form.Group controlId="charges">
                  <Form.Control as="select">
                    <option>Gebührenfrei</option>
                    <option>Gebührenpflichtig</option>
                    <option>noctu</option>
                  </Form.Control>
                </Form.Group>

                {['checkbox'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check inline label="Unfall" type={type} id={`inline-${type}-1`} />
                    <Form.Check inline label="Arbeitsunfall" type={type} id={`inline-${type}-2`} />
                  </div>
                ))}
                  
                <Button variant="success" block onClick={this.runExample}>Submit</Button>
              </Form>
              <br></br>
              <div>The stored value is: {this.state.storageValue}</div>
            </Col>
            <Col sm={2}>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default Blockchain;
