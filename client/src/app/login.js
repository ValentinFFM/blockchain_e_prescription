import React, {Component} from 'react';
import UserContract from "../contracts/User.json";
import getWeb3 from "./getWeb3";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RegisterInsured from './insured/registerInsured';
import RegisterPhysician from './physician/registerPhysician';
import LandingInsured from './insured/landingInsured';
import LandingPhysician from './physician/landingPhysician';

class NewLogin extends Component {

    state = { web3: null, standardAccount: null, userContract: null, account: null, formData: {}, missingInput: false, unknownUser: false, unverifiedUser: false, status: 'default' }

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
            const Accounts = await web3.eth.getAccounts();
            const standardAccount = Accounts[0]

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

    login= async () => {
        //Reset all alerts that are shown
        this.setState({missingInput: false, unknownUser: false})

        // Reading out the data from the form
        const { formData } = this.state;
        const role = formData.role;
        const public_key = this.state.account;

        


        // Checking if all inputs are filled and returning an alert, if not
        if(role !== undefined && role !== "" && public_key !== undefined && public_key !== ""){
            const existence = await this.checkExistence(role, public_key)

            if(existence === true){
                const verified = await this.checkVerification(role, public_key) 

                // Checking if an user exists with the public key and if its verified
                if(verified === true){

                    if(role === "Versicherte"){
                        this.setState({missingInput: false, unknownUser: true, unverifiedUser: false, status: "login_insured"})
                    } else if (role === "Arzt"){
                        this.setState({missingInput: false, unknownUser: true, unverifiedUser: false, status: "login_physician" })
                    }
                } else {
                    this.setState({missingInput: false, unknownUser: false, unverifiedUser: true})
                }
            } else {

                if(role === "Versicherte"){
                    this.setState({missingInput: false, unknownUser: true, unverifiedUser: false, status: "registration_insured"})
                } else if (role === "Arzt"){
                    this.setState({missingInput: false, unknownUser: true, unverifiedUser: false, status: "registration_physician" })
                }
            }

        } else {
            this.setState({missingInput: true, unknownUser: false, unverifiedUser: false})
        }
    }

    checkExistence = async (role, public_key) => {
        console.log("Check Existence", role, public_key)

        const {standardAccount, userContract } = this.state;
        var existenceInsured = false;
        var existencePhysician = false;
        var existence = undefined;


        if(role === "Versicherte"){
            try{
                existenceInsured = await userContract.methods.checkExistence('insured', public_key).call({from: standardAccount, gas: 1000000});
            } catch {
                existenceInsured = false;
            }
        } else if (role === "Arzt"){
            try{
                existencePhysician =  await userContract.methods.checkExistence('physician', public_key).call({from: standardAccount, gas: 1000000});
            } catch {
                existencePhysician = false;
            }
        } 

        if(existenceInsured === true || existencePhysician === true){
            existence = true
        } else {
            existence = false
        }

        return existence
    }

    // Checks out if the user with the public_key exists in the mapping of the role in the smart contract
    checkVerification = async (role, public_key) => {
        const {standardAccount, userContract } = this.state;
        var verified = undefined;

        if(role === "Versicherte"){
            try{
                console.log("Versicherte")
                verified = await userContract.methods.checkVerification('insured', public_key).call({from: standardAccount, gas: 1000000});
            } catch {
                verified = false;
            }
        } else if (role === "Arzt"){
            try{
                verified =  await userContract.methods.checkVerification('physician', public_key).call({from: standardAccount, gas: 1000000});
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

        if(window.ethereum.isMetaMask){
            if(this.state.status === 'default'){
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
        
                                        <Button variant="success" className="mb-3" onClick={this.login} block>Login</Button>
        
                                        <Alert show={this.state.unverifiedUser} variant="danger" className="mt-3">
                                            Dieser Account wurde noch nicht verifiziert oder Sie versuchen sich mit einer falschen Rolle anzumelden!
                                        </Alert>
                                        <Alert show={this.state.missingInput} variant="danger" className="mt-3">
                                            Bitte wählen Sie Ihre Rolle aus!
                                        </Alert>
                                    </Form>
                                </Col>
        
                                <Col xs={0} sm={1} md={3} lg={4}></Col>
                            </Row>
                        </Container>
                    </div>            
                )
            } else if (this.state.status === 'login_insured'){
                return(
                    <div>
                        <Router forceRefresh={true}>
                            <Redirect push to='/insured'/>
                            <Switch>
                                <Route path="/insured">
                                    <LandingInsured/>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                )
            } else if (this.state.status === 'login_physician'){
                return(
                    <div>
                        <Router forceRefresh={true}>
                            <Redirect push to='/physician'/>
                            <Switch>
                                <Route path="/physician">
                                    <LandingPhysician/>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                )
            } else if (this.state.status === 'registration_insured'){
                return(
                    <div>
                        <Router forceRefresh={true}>
                            <Redirect push to='/registerInsured'/>
                            <Switch>
                                <Route path="/registerInsured">
                                    <RegisterInsured/>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                )
            } else if (this.state.status === 'registration_physician'){
                return(
                    <div>
                        <Router forceRefresh={true}>
                            <Redirect push to='/registerPhysician'/>
                            <Switch>
                                <Route path="/registerPhysician">
                                    <RegisterPhysician/>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                )
            }
        } else {
            return (
                <>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand>E-Prescription</Navbar.Brand>
                    </Navbar>
        
                    <Container fluid className="mt-5">
                        <Row> 
                            <Col xs={0} sm={1} md={3} lg={4}></Col>
                            <Col>
                                <h3>MetaMask nicht installiert oder nicht geöffnet!</h3>
                                <p>
                                    Es scheint als hätten Sie MetaMask noch nicht installiert oder die Browser Erweiterung noch nicht geöffnet!
                                </p>
                            </Col>
                            <Col xs={0} sm={1} md={3} lg={4}></Col>
                        </Row>
                    </Container>
                </>
            )
        }     
    } 
}
export default NewLogin