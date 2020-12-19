import React, { Component } from "react";
import UserContract from "../../contracts/User.json";
import getWeb3 from "../getWeb3";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class RegisterPhysician extends Component {
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

    addNewUser = async () => {
        const { user, accounts, contract } = this.state;

        console.log(user)

        const business_number = user.business_number
        const physician_number = user.physician_number

        const job_title = user.physician_job_title
        const surname = user.physician_surname
        const name = user.physician_name
        const street = user.physician_street
        const street_number = user.physician_street_number
        const post_code = parseInt(user.physician_post_code)
        const city = user.physician_city
        const telephone_number = user.telephone_number
        
        await contract.methods.addNewPhysician(physician_number, {business_number, job_title, surname, name, street, street_number, post_code, city, telephone_number}).send({ from: accounts[0], gas: 1000000 });
      };


      getUser = async () => {
        const { user, accounts, contract } = this.state;

        const physician_number = user.user

        const returnedValue = await contract.methods.checkPhysicianExistance(physician_number).call({ from: accounts[0], gas: 1000000 });
        console.log(returnedValue)
      }

    render() {
        // if (!this.state.web3) {
        //   return <div>Loading Web3, accounts, and contract...</div>;
        // }
        return (
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

                    <div className="pb-5 pt-5"></div>

                    <Form.Group controlId="user">
                      <Form.Control value={this.state.value} onChange={this.handleChange} type="text" placeholder="Nutzer"></Form.Control>
                    </Form.Group>

                    <Button variant="success" block onClick={this.getUser}>Abfragen</Button>
                  </Form>
                </Col>
                <Col xs={0} sm={1} md={3} lg={4}>
                </Col>
              </Row>
          </Container>
        );
      }
}
export default RegisterPhysician;