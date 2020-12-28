import React, {Component} from 'react';
import UserContract from "../../contracts/User.json";
import getWeb3 from "../getWeb3";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Redirect, BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Navigation from "./../navigation";

class Login extends Component {
    
    state = {user: {}, web3: null, accounts: null, user_contract: null, missingInput: false, unknownUser: false, login_accepted: false}

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

            const UserContractInstance = new web3.eth.Contract(
                UserContract.abi,
                UserContractNetwork && UserContractNetwork.address,
            );

            // Save data into the react state
            this.setState({ web3, accounts, user_contract: UserContractInstance });
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

    login= async () => {
        //Reset all alerts that are shown

        this.setState({missingInput: false, unknownUser: false})
        console.log("Reset", this.state.missingInput, this.state.unknownUser)

        // Reading out the data from the form
        const { user } = this.state;
        const role = user.role;
        const public_key = user.public_key;
        const private_key = user.private_key;

        // Checking if all inputs are filled and returning an alert, if not
        if(role !== undefined && role !== "" && public_key !== undefined && public_key !== "" && private_key !== undefined && private_key !== ""){

            // Checking if an user exists with the public key and if its verified
            if(this.checkVerification(role, public_key) === true){
                this.setState({login_accepted: true})
            } else {
                this.setState({missingInput: false, unknownUser: true})
                console.log("After verification", this.state.missingInput, this.state.unknownUser)
            }

        } else {
            this.setState({missingInput: true, unknownUser: false})
            console.log("After missing input", this.state.missingInput, this.state.unknownUser)
        }
    }

    // Checks out if the user with the public_key exists in the mapping of the role in the smart contract
    checkVerification = async (role, public_key) => {
        const {accounts, user_contract } = this.state;
        var verified = undefined;

        if(role === "Patient"){
            try{
                verified = await user_contract.methods.checkInsuredVerification(public_key).call({from: accounts[0], gas: 1000000});
            } catch {
                verified = false;
            }
        } else if (role === "Arzt"){
            try{
                verified =  await user_contract.methods.checkPhysicianVerification(public_key).call({from: accounts[0], gas: 1000000});
            } catch {
                verified = false;
            }
        } else if (role === "Apotheker"){
            verified = false;
        } else {
            verified = false;
        }

        return verified
    }
    
    // Renders page content
    render(){

        if(this.state.login_accepted === false){
            return(
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand>E-Prescription</Navbar.Brand>
                    </Navbar>
    
                    <Container fluid className="mt-5">
                        <Row> 
                            <Col xs={0} sm={1} md={3} lg={4}></Col>
    
                            <Col>
                                <h2 className="mt-5">Login</h2>
    
                                <Form className="mt-3">
                                    <Form.Group controlId="role">
                                        <Form.Control as="select" value={this.state.value} onChange={this.handleChange}>
                                            <option>Login als...</option>
                                            <option>Versicherte</option>
                                            <option>Arzt</option>
                                            <option>Apotheker</option>
                                        </Form.Control>
                                    </Form.Group>
    
                                    <Form.Group controlId="public_key">
                                        <Form.Control type="text" placeholder="Public key" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
    
                                    <Form.Group controlId="private_key">
                                        <Form.Control type="password" placeholder="Private Key" value={this.state.value} onChange={this.handleChange}></Form.Control>
                                    </Form.Group>
    
                                    <Button variant="success" className="mb-3" onClick={this.login} block>Login</Button>

                                    <Link to="/registerInsured">Als Versicherter registrieren</Link><br></br>
                                    <Link to="/registerPhysician">Als Arzt registrieren</Link>
    
                                    <Alert show={this.state.unknownUser} variant="danger" className="mt-3">
                                        Es existiert kein Account mit diesem Public Key oder der Account wurde noch nicht verifiziert!
                                    </Alert>
                                    <Alert show={this.state.missingInput} variant="danger" className="mt-3">
                                        Bitte füllen Sie alle Eingabefelder aus!
                                    </Alert>
                                </Form>
                            </Col>
    
                            <Col xs={0} sm={1} md={3} lg={4}></Col>
                        </Row>
                    </Container>
                </div>            
            )
        } else {
            return(
                <div>
                    
                    <Router>
                        <Redirect to='/home'/>
                        <Switch>
                            <Route path="/home">
                                <Navigation/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )
        }
    }
}
export default Login