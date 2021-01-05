import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// React-Bootstrap imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

// Smart Contract imports
import UserContract from "./../contracts/User.json";
import PrescriptionsContract from "./../contracts/Prescriptions.json";

// Component imports
import Login from './login';



class RegisterInsured extends Component {
    state = {formData: {}, web3: null, accounts: null, userContract: null, prescriptions_contract: null, userVerfied: null, initialize: false}

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {

        const ethereum = await window.ethereum;

        if(ethereum){
            const public_key = ethereum.selectedAddress;
            this.setState({account: public_key});

            ethereum.on('accountsChanged', (public_key) => {
                console.log('accountsChanged')
                this.setState({account: public_key[0]});
                if(this.state.initialize === true){
                    this.checkVerification();
                }
            });
        }

        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
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

            this.setState({ web3, accounts, userContract: UserContractInstance, prescriptions_contract: PrescriptionsContractInstance, initialize: true});
            this.checkVerification();
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    };

    checkVerification = async () => {
        console.log('checkVerification')
        const { userContract } = this.state;
        const verfied = await userContract.methods.checkVerification('verifying_institution', this.state.account).call({from: this.state.standardAccount, gas: 1000000})
        this.setState({userVerfied: verfied})
    }

    handleChange(event){
        // Reading out the value and the id of the triggered input
        const event_id = event.target.id
        const event_value = event.target.value

        // Setting the value into the user object of the state
        const { formData } = this.state;
        formData[event_id] = event_value
        this.setState({formData: formData})
    }

    getInsured = async () => {
        const { formData, accounts, userContract } = this.state;
        const insured_address_ = formData.insured_address;
        const returnedValue = await userContract.methods.getInsured(insured_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    verifyInsured = async () => {
        const { formData, accounts, userContract } = this.state;
        const insured_address_ = formData.insured_address;
        const returnedValue = await userContract.methods.verifyInsured(insured_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    getPhysician = async () => {
        const { formData, accounts, userContract } = this.state;
        const physician_address_ = formData.physician_address;
        const returnedValue = await userContract.methods.getPhysician(physician_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }
    
    verifyPhysician = async () => {
        const { formData, accounts, userContract } = this.state;
        const physician_address_ = formData.physician_address;
        const returnedValue = await userContract.methods.verifyPhysician(physician_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    getPharmacist = async () => {
        const { formData, accounts, userContract } = this.state;
        const pharmacist_address_ = formData.pharmacist_address;
        const returnedValue = await userContract.methods.getPhysician(pharmacist_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }
    
    verifyPharmacist = async () => {
        const { formData, accounts, userContract } = this.state;
        const pharmacist_address_ = formData.pharmacist_address;
        const returnedValue = await userContract.methods.verifyPharmacist(pharmacist_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    connectSmartContractUser = async () => {
        const { formData, accounts, prescriptions_contract } = this.state;
        console.log(this.state)
        const smart_contract_key = formData.user_smart_contract;
        await prescriptions_contract.methods.establishConnectionToUserSmartContract(smart_contract_key).send({ from: accounts[0], gas: 1000000 });
    }

    render() {
        if(this.state.userVerfied === false){
            return(
                <div>
                    <Router forceRefresh={true}>
                        <Redirect push to='/login'/>
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )
        } else {
            return (
                <>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand>E-Rezept</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Button href="/Logout" variant="outline-danger">Logout</Button>
                        </Navbar.Collapse>
                    </Navbar>

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
                </>
            );
        }
      }
}
export default RegisterInsured;