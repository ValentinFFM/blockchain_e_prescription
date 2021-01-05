import React, { Component } from "react";
import UserContract from "../../contracts/User.json";
import getWeb3 from "../getWeb3";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './../login';
import Alert from 'react-bootstrap/Alert';


class RegisterPhysician extends Component {
    state = {web3: null, standardAccount: null, userContract: null, account: null, formData: {}, missingInput: false, registration_accepted: false, userExistance: null, initialize: false}

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
                this.setState({account: public_key[0]});
                if(this.state.initialize === true){
                    this.checkExistence();
                }
            });
        }


        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const standardAccount = accounts[0]
            const networkId = await web3.eth.net.getId();
            const UserContractNetwork = UserContract.networks[networkId];

            const UserContractInstance = new web3.eth.Contract(
                UserContract.abi,
                UserContractNetwork && UserContractNetwork.address,
            );

            this.setState({ web3: web3, standardAccount: standardAccount, userContract: UserContractInstance, initialize: true });
            this.checkExistence();
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    };

    checkExistence = async () => {
        const { userContract } = this.state;
        const existence_insured = await userContract.methods.checkExistence('insured', this.state.account).call({from: this.state.standardAccount, gas: 1000000})
        const existence_physician = await userContract.methods.checkExistence('physician', this.state.account).call({from: this.state.standardAccount, gas: 1000000})
        const existence_pharmacist = await userContract.methods.checkExistence('pharmacist', this.state.account).call({from: this.state.standardAccount, gas: 1000000})
        const existence_verifying_inst = await userContract.methods.checkExistence('verifying_institution', this.state.account).call({from: this.state.standardAccount, gas: 1000000})

        if(existence_insured === true || existence_physician === true || existence_pharmacist === true || existence_verifying_inst === true){
            this.setState({userExistance: true})
        } else {
            this.setState({userExistance: false})
        }
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

    addNewUser = async () => {
        const { userContract, formData } = this.state;

        const job_title = formData.physician_job_title;
        const surname = formData.physician_surname;
        const name = formData.physician_name;
        const physician_number = formData.physician_number;

        const street = formData.physician_street;
        const street_number = formData.physician_street_number;
        const post_code = parseInt(formData.physician_post_code);
        const city = formData.physician_city;
        const telephone_number = formData.telephone_number;
        const business_number = formData.business_number;

        if(job_title !== "" 
            && job_title !== undefined 
            && surname !== "" 
            && surname !== undefined 
            && name !== ""
            && name !== undefined
            && physician_number !== "" 
            && physician_number !== undefined 
            && street !== "" 
            && street !== undefined 
            && street_number !== ""
            && street_number !== undefined
            && post_code !== ""
            && post_code !== undefined 
            && city !== ""
            && city !== undefined
            && telephone_number !== ""
            && telephone_number !== undefined 
            && business_number !== ""
            && business_number !== undefined
        ) {
            await userContract.methods.addNewPhysician({job_title, surname, name, physician_number, street, street_number, post_code, city, telephone_number, business_number}).send({ from: this.state.account, gas: 1000000 });
            this.setState({registration_accepted: true})
        } else {
            this.setState({missingInput: true})
        }
        
    };

    render() {
        if(this.state.userExistance === true || this.state.registration_accepted === true){
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
                    </Navbar>
                    <Container fluid className="mt-5">
                        <Row> 
                            <Col xs={0} sm={1} md={3} lg={4}>
                            </Col>
                            <Col className="">
                            <Form>

                                <div className="pb-3 pt-4">
                                    Angaben zum Arzt:
                                </div>
                                
                                <Form.Group controlId="physician_job_title">
                                    <Form.Control type="text" placeholder="Berufsbezeichnung" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                </Form.Group>

                                <Row>
                                    <Col className="pr-1">
                                    <Form.Group controlId="physician_surname">
                                        <Form.Control type="text" placeholder="Vorname" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                    <Col className="pl-1">
                                    <Form.Group controlId="physician_name">
                                        <Form.Control type="text" placeholder="Name" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="physician_number">
                                    <Form.Control type="number" placeholder="Arzt-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                                </Form.Group>

                                <div className="pb-3 pt-4">
                                    Angaben zur Betriebsstätte:
                                </div>

                                <Row>
                                    <Col className="pr-1" sm={9}>
                                        <Form.Group controlId="physician_street">
                                            <Form.Control type="text" placeholder="Straße" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-1" sm={3}>
                                        <Form.Group controlId="physician_street_number">
                                            <Form.Control type="text" placeholder="Hausnummer" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="pr-1" sm={4}>
                                        <Form.Group controlId="physician_post_code">
                                            <Form.Control type="number" placeholder="Postleitzahl" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-1" sm={8}>
                                        <Form.Group controlId="physician_city">
                                            <Form.Control type="text" placeholder="Stadt" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="telephone_number">
                                    <Form.Control type="text" placeholder="Telefon-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="business_number">
                                    <Form.Control type="number" placeholder="Betriebsstätten-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                                </Form.Group>
                                    
                                <div className="pb-3"></div>

                                <Button variant="success" block onClick={this.addNewUser}>Registrieren</Button>

                                <Alert show={this.state.missingInput} variant="danger" className="mt-3">
                                    Bitte füllen Sie alle Eingabefelder aus!
                                </Alert>
                            </Form>
                            </Col>
                            <Col xs={0} sm={1} md={3} lg={4}>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        
        }
      }
}
export default RegisterPhysician;