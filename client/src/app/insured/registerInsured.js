import React, { Component } from "react";
import UserContract from "../../contracts/User.json";
import getWeb3 from "../getWeb3";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Login from './../login'
import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'


class RegisterInsured extends Component {
    state = {web3: null, standardAccount: null, userContract: null, account: null, formData: {} , missingInput: false, registration_accepted: false}

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
        console.log('Add new user', this.state.account)
        this.setState({missingInput: false})
        const { userContract, formData } = this.state;

        const surname = formData.insured_surname
        const name = formData.insured_name
        const street = formData.insured_street
        const street_number = formData.insured_street_number
        const post_code = parseInt(formData.insured_post_code)
        const city = formData.insured_city
        const birth_date = formData.insured_birth_date

        const insurance = formData.insurance 
        const insurance_number = formData.insurance_number
        const insured_number = formData.insured_number
        const insured_status = formData.insured_status

        if(surname !== "" 
            && surname !== undefined 
            && name !== "" 
            && name !== undefined 
            && street !== ""
            && street !== undefined
            && street_number !== "" 
            && street_number !== undefined 
            && post_code !== "" 
            && post_code !== undefined 
            && city !== ""
            && city !== undefined
            && birth_date !== ""
            && birth_date !== undefined 
            && insurance !== ""
            && insurance !== undefined
            && insurance_number !== ""
            && insurance_number !== undefined 
            && insured_number !== ""
            && insured_number !== undefined
            && insured_status !== ""
            && insured_status !== undefined
        ){
            await userContract.methods.addNewInsured({surname, name, street, street_number, post_code, city, birth_date, insurance, insurance_number, insured_number, insured_status}).send({ from: this.state.account, gas: 1000000 });
            this.setState({registration_accepted: true})

        } else {
            this.setState({missingInput: true})
        }
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
                            <Col>
                            <Form>
                                
                                <div className="pb-3 pt-4">
                                    Allgemeine Angaben:
                                </div>
    
                                <Row>
                                    <Col className="pr-1">
                                    <Form.Group controlId="insured_surname">
                                        <Form.Control type="text" placeholder="Vorname" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                    <Col className="pl-1">
                                    <Form.Group controlId="insured_name">
                                        <Form.Control type="text" placeholder="Name" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <Col className="pr-1" sm={9}>
                                        <Form.Group controlId="insured_street">
                                            <Form.Control type="text" placeholder="Straße" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-1" sm={3}>
                                        <Form.Group controlId="insured_street_number">
                                            <Form.Control type="text" placeholder="Hausnummer" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <Col className="pr-1" sm={4}>
                                        <Form.Group controlId="insured_post_code">
                                            <Form.Control type="number" placeholder="Postleitzahl" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-1" sm={8}>
                                        <Form.Group controlId="insured_city">
                                            <Form.Control type="text" placeholder="Stadt" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Form.Group controlId="insured_birth_date">
                                    <Form.Control type="text" placeholder="Geburtstag" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                </Form.Group>
    
                                <div className="pb-3 pt-4">
                                    Angaben zur Krankenversicherung:
                                </div>
    
                                <Form.Group controlId="insurance">
                                <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Krankenkasse bzw. Kostenträger"></Form.Control>
                                </Form.Group>
    
                                <Row>
                                    <Col className="pr-1" sm={4}>
                                    <Form.Group controlId="insurance_number">
                                        <Form.Control type="number" placeholder="Kassen-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                    <Col className="px-1" sm={4}>
                                    <Form.Group controlId="insured_number">
                                        <Form.Control type="number" placeholder="Versicherten-Nr." value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                    <Col className="pl-1" sm={4}>
                                    <Form.Group controlId="insured_status">
                                        <Form.Control type="number" placeholder="Status" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
                                    </Col>
                                </Row>
    
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
export default RegisterInsured;