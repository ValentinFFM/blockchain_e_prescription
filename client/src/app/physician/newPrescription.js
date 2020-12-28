import React, { Component } from "react";
import PrescriptionsContract from './../../contracts/Prescriptions.json'
import getWeb3 from "../getWeb3";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class NewPrescription extends Component {
  state = {user: {}, web3: null, accounts: null, prescriptions_contract: null };

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    try {
        // Get web3 instance and the accounts that are stored 
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();

        console.log(await web3.eth.accounts)

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        const PrescriptionsContractNetwork = PrescriptionsContract.networks[networkId];

        const PrescriptionsContractInstance = new web3.eth.Contract(
            PrescriptionsContract.abi,
            PrescriptionsContractNetwork && PrescriptionsContractNetwork.address,
        );

        // Save data into the react state
        this.setState({ web3, accounts, prescriptions_contract: PrescriptionsContractInstance});
    } catch (error) {
        alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
    }
  };

  handleChange(event){
    // Reading out the value and the id of the triggered input
    const event_id = event.target.id
    const event_value = event.target.value

    // Setting the value into the user object of the state
    const { user } = this.state;
    user[event_id] = event_value
    this.setState({user: user})
  }

  newPrescription = async () => {
    const { user, prescriptions_contract } = this.state;

    const physician = user.public_key_physician;
    const patient = user.public_key_patient;

    const medicine_name = user.medicine_name;
    const medicine_amount = user.medicine_amount;

    console.log(physician, patient, medicine_amount, medicine_name)

    await prescriptions_contract.methods.newPrescription({physician, patient, medicine_name, medicine_amount}).send({ from: physician, gas: 1000000 });
  }

  getPrescriptions = async () => {
    const { user, prescriptions_contract } = this.state;

    const physician = user.public_key_physician;

    const response = await prescriptions_contract.methods.getPrescriptions(physician).call({ from: physician, gas: 1000000 });
    console.log(response)
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

                <Form.Group controlId="public_key_physician">
                  <Form.Control type="text" placeholder="public_key_physician" value={this.state.value} onChange={this.handleChange}></Form.Control>
                </Form.Group>

                <Form.Group controlId="public_key_patient">
                  <Form.Control type="text" placeholder="public_key_patient" value={this.state.value} onChange={this.handleChange}></Form.Control>
                </Form.Group>

                <div className="pb-3 pt-4">
                    Rezept:
                </div>

                <Form.Group controlId="medicine_name">
                  <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Name des Medikaments"></Form.Control>
                </Form.Group>

                <Form.Group controlId="medicine_amount">
                  <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Menge des Medikaments"></Form.Control>
                </Form.Group>
                
                <Button variant="success" block onClick={this.newPrescription}>Neues Rezept erstellen</Button>

                <Button variant="success" block onClick={this.getPrescriptions}>Get Rezept</Button>
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
