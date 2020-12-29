import React, { Component } from "react";
import PrescriptionsContract from './../../contracts/Prescriptions.json'
import getWeb3 from "../getWeb3";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class NewPrescription extends Component {
  state = {web3: null, prescriptionsContract: null, account: null, formData: {}};

  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    const ethereum = await window.ethereum;
    const public_key = ethereum.selectedAddress
    this.setState({account: public_key})

    // if(ethereum){
    //   ethereum.on('accountsChanged', (public_key) => {
    //     console.log(public_key)
    //     this.setState({account: public_key[0]})
    //     console.log(this.state.account)
    //   });
    // }

    try {
      // Get web3 instance and the accounts that are stored 
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const standardAccount = accounts[0]

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const PrescriptionContractNetwork = PrescriptionsContract.networks[networkId];

      const PrescriptionsContractInstance = new web3.eth.Contract(
        PrescriptionsContract.abi,
        PrescriptionContractNetwork && PrescriptionContractNetwork.address,
      );

      // Save data into the react state
      this.setState({ web3: web3, standardAccount: standardAccount, prescriptionsContract: PrescriptionsContractInstance });
    } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
    }
  };

  handleChange(event){
    // Reading out the value and the id of the triggered input
    const event_id = event.target.id
    const event_value = event.target.value

    // Setting the value into the user object of the state
    const { formData } = this.state;
    formData[event_id] = event_value
    this.setState({formData: formData})
  }

  newPrescription = async () => {
    console.log("New Prescription")
    const { formData, prescriptionsContract } = this.state;

    const patient = formData.public_key_patient;
    const medicine_name = formData.medicine_name;
    const medicine_amount = formData.medicine_amount;

    const physician = this.state.account
    console.log(physician, patient, medicine_name, medicine_amount)
    await prescriptionsContract.methods.newPrescription({physician, patient, medicine_name, medicine_amount}).send({ from: this.state.account, gas: 1000000 });
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
