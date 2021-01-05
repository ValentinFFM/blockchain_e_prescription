import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PrescriptionListInsured from './prescriptionListInsured';
import UserContract from './../../contracts/User.json';
import getWeb3 from "../getWeb3";
import { Redirect, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './../login';


class LandingInsured extends Component {

    state = {web3: null, standardAccount: null, userContract: null, account: null, userVerfied: null, initialize: false}

    componentDidMount = async () => {
        const ethereum = await window.ethereum;

        if(ethereum){
            const public_key = ethereum.selectedAddress;
            this.setState({account: public_key});

            ethereum.on('accountsChanged', (public_key) => {

                this.setState({account: public_key[0]});

                if(this.state.initialize === true){
                    this.checkVerification();
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
            this.checkVerification();
            
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    }

    checkVerification = async () => {
        const { userContract } = this.state;
        const verfied = await userContract.methods.checkVerification('insured', this.state.account).call({from: this.state.standardAccount, gas: 1000000})
        this.setState({userVerfied: verfied})
    }
    
    render(){

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
            return(
                <>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand>E-Rezept</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Button href="/Logout" variant="outline-danger">Logout</Button>
                        </Navbar.Collapse>
                    </Navbar>
    
                    <Container fluid className="mt-5">
                        <Row> 
                            <Col xs={0} sm={1} md={2} lg={3}></Col>
                            <Col>
                                <h1>Rezeptübersicht</h1>
                                <PrescriptionListInsured />
                            </Col>
                            <Col xs={0} sm={1} md={2} lg={3}></Col>
                        </Row>
                    </Container>
                </>
            );
        }
    }
}
export default LandingInsured;