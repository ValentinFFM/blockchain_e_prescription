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


class RegisterPhysician extends Component {
    state = {web3: null, standardAccount: null, userContract: null, account: null, formData: {}, registration_accepted: false}

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        const ethereum = await window.ethereum;
        

        if(ethereum){
            ethereum.on('accountsChanged', (public_key) => {
                console.log(public_key)
                this.setState({account: public_key[0]})
                console.log(this.state.account)
              });
        }


        try {
            // Get web3 instance and the accounts that are stored 
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const standardAccount = accounts[0]

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const UserContractNetwork = UserContract.networks[networkId];

            const UserContractInstance = new web3.eth.Contract(
                UserContract.abi,
                UserContractNetwork && UserContractNetwork.address,
            );

            // Save data into the react state
            this.setState({ web3: web3, standardAccount: standardAccount, userContract: UserContractInstance });
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
        
        await userContract.methods.addNewPhysician({job_title, surname, name, physician_number, street, street_number, post_code, city, telephone_number, business_number}).send({ from: this.state.account, gas: 1000000 });
        this.setState({registration_accepted: true})
    };

    render() {
        if(this.state.registration_accepted === false){
            return (
                <>
                    <Navbar bg="dark" variant="dark" expand="lg">
                            <Navbar.Brand>E-Prescription</Navbar.Brand>
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
                            </Form>
                            </Col>
                            <Col xs={0} sm={1} md={3} lg={4}>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        } else {
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
        }
      }
}
export default RegisterPhysician;