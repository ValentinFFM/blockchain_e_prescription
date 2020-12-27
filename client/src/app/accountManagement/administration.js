import React, { Component } from "react";
import UserContract from "../../contracts/User.json";
import getWeb3 from "../getWeb3";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class RegisterInsured extends Component {
    state = {user: {}, web3: null, accounts: null, contract: null}

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
            const deployedNetwork = UserContract.networks[networkId];
            const instance = new web3.eth.Contract(
                UserContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Save data into the react state
            this.setState({ web3, accounts, contract: instance });
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
        const { user, accounts, contract } = this.state;
        const insured_address_ = user.insured_address;
        const returnedValue = await contract.methods.getInsured(insured_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    verifyInsured = async () => {
        const { user, accounts, contract } = this.state;
        const insured_address_ = user.insured_address;
        const returnedValue = await contract.methods.verifyInsured(insured_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }

    getUser = async () => {
        const { user, accounts, contract } = this.state;
        const physician_address_ = user.physician_address;
        const returnedValue = await contract.methods.getInsured(physician_address_).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
    }
    
    verifyUser = async () => {
        const { user, accounts, contract } = this.state;
        const physician_address_ = user.physician_address;
        const returnedValue = await contract.methods.verifyInsured(physician_address_).send({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue);
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

                        <Button variant="primary" block onClick={this.getPhysisican}>Get</Button>
                        <Button variant="success" block onClick={this.verifyPhysisican}>Verify</Button>
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