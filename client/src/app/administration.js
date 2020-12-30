import React, { Component } from "react";
import UserContract from "./../contracts/User.json";
import PrescriptionsContract from "./../contracts/Prescriptions.json" 
import getWeb3 from "./getWeb3";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class RegisterInsured extends Component {
    state = {user: {}, web3: null, accounts: null, user_contract: null, prescriptions_contract: null}

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        try {
            // Get web3 instance and the accounts that are stored 
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();

            const UserContractNetwork = UserContract.networks[networkId];
            const PrescriptionsContractNetwork = PrescriptionsContract.networks[networkId];

            const UserContractInstance = new web3.eth.Contract(
                UserContract.abi,
                UserContractNetwork && UserContractNetwork.address,
            );

            const PrescriptionsContractInstance = new web3.eth.Contract(
                PrescriptionsContract.abi,
                PrescriptionsContractNetwork && PrescriptionsContractNetwork.address,
            );

            // Save data into the react state
            this.setState({ web3, accounts, user_contract: UserContractInstance, prescriptions_contract: PrescriptionsContractInstance});
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

    getInsured = async () => {
        const { user, accounts, user_contract } = this.state;
        const insured_address_ = user.insured_address;
        const returnedValue = await user_contract.methods.getInsured(insured_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    verifyInsured = async () => {
        const { user, accounts, user_contract } = this.state;
        const insured_address_ = user.insured_address;
        const returnedValue = await user_contract.methods.verifyInsured(insured_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    getPhysician = async () => {
        const { user, accounts, user_contract } = this.state;
        const physician_address_ = user.physician_address;
        const returnedValue = await user_contract.methods.getPhysician(physician_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }
    
    verifyPhysician = async () => {
        const { user, accounts, user_contract } = this.state;
        const physician_address_ = user.physician_address;
        const returnedValue = await user_contract.methods.verifyPhysician(physician_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    getPharmacist = async () => {
        const { user, accounts, user_contract } = this.state;
        const pharmacist_address_ = user.pharmacist_address;
        const returnedValue = await user_contract.methods.getPhysician(pharmacist_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }
    
    verifyPharmacist = async () => {
        const { user, accounts, user_contract } = this.state;
        const pharmacist_address_ = user.pharmacist_address;
        const returnedValue = await user_contract.methods.verifyPharmacist(pharmacist_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    connectSmartContractUser = async () => {
        const { user, accounts, prescriptions_contract } = this.state;
        console.log(this.state)
        const smart_contract_key = user.user_smart_contract;
        await prescriptions_contract.methods.establishConnectionToUserSmartContract(smart_contract_key).send({ from: accounts[0], gas: 1000000 });
    }

    render() {
        // if (!this.state.web3) {
        //   return <div>Loading Web3, accounts, and contract...</div>;
        // }
        return (
          <Container fluid className="mt-5">
              <Row> 
                <Col xs={0} sm={0} md={1} lg={2}>
                </Col>

                <Col>
                    <div className="pb-3 pt-4">
                        Insured:
                    </div>

                    <Form>
                        <Form.Group controlId="insured_address">
                            <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Address"></Form.Control>
                        </Form.Group>

                        <Button variant="primary" block onClick={this.getInsured}>Get</Button>
                        <Button variant="success" block onClick={this.verifyInsured}>Verify</Button>
                    </Form>
                </Col>

                <Col>
                    <div className="pb-3 pt-4">
                        Physician:
                    </div>

                    <Form>
                        <Form.Group controlId="physician_address">
                            <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Address"></Form.Control>
                        </Form.Group>

                        <Button variant="primary" block onClick={this.getPhysician}>Get</Button>
                        <Button variant="success" block onClick={this.verifyPhysician}>Verify</Button>
                    </Form>
                </Col>

                <Col>
                    <div className="pb-3 pt-4">
                        Pharmacist:
                    </div>

                    <Form>
                        <Form.Group controlId="pharmacist_address">
                            <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Address"></Form.Control>
                        </Form.Group>

                        <Button variant="primary" block onClick={this.getPharmacist}>Get</Button>
                        <Button variant="success" block onClick={this.verifyPharmacist}>Verify</Button>
                    </Form>
                </Col>

                <Col xs={0} sm={0} md={1} lg={2}>
                </Col>
              </Row>
              <Row>
                <Col xs={0} sm={0} md={1} lg={2}>
                </Col>

                <Col>
                    <div className="pb-3 pt-4">
                        User Smart Contract:
                    </div>

                    <Form>
                        <Form.Group controlId="user_smart_contract">
                            <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Address"></Form.Control>
                        </Form.Group>

                        <Button variant="primary" block onClick={this.connectSmartContractUser}>Connect</Button>
                    </Form>
                </Col>

                <Col xs={0} sm={0} md={1} lg={2}>
                </Col>
              </Row>
          </Container>
        );
      }
}
export default RegisterInsured;