/**
 * @author Valentin Mueller <https://github.com/ValentinFFM>
 */

import React, { Component } from "react";
import getWeb3 from "../getWeb3";

// React-Bootstrap imports
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Smart Contract imports
import PrescriptionsContract from '../../contracts/Prescriptions.json';



class PrescriptionListPhysician extends Component {
    state = {web3: null, standardAccount: null, prescriptionsContract: null, account: null, formData: {}, prescriptions: [], prescriptionIds: [], sendPrescription: null}

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {

        // Reads out the selected account from the user in MetaMask and stores it in the react state
        const ethereum = await window.ethereum;
        const public_key = ethereum.selectedAddress;
        this.setState({account: public_key});

        // If user changes his account, then the verification to access the page is checked and afterwards the new account is stored in the react state
        ethereum.on('accountsChanged', (public_key) => {
            console.log(public_key)
            this.setState({account: public_key[0]})
            console.log(this.state.account)
        });
        
        // Establishing the connection to the blockchain and the smart contracts
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const standardAccount = accounts[0]
            const networkId = await web3.eth.net.getId();
            const PrescriptionContractNetwork = PrescriptionsContract.networks[networkId];
      
            const PrescriptionsContractInstance = new web3.eth.Contract(
              PrescriptionsContract.abi,
              PrescriptionContractNetwork && PrescriptionContractNetwork.address,
            );

            this.setState({ web3: web3, standardAccount: standardAccount, prescriptionsContract: PrescriptionsContractInstance });
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
        
        await this.getPrescriptions()
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
    
    // Returns all prescriptions that were filled out by the physician. 
    getPrescriptions = async () => {
        var prescriptionsArray = [];
        const { account, standardAccount, prescriptionsContract, formData } = this.state;
        const prescriptionIds_ = await prescriptionsContract.methods.getPhysisicianPrescriptionsIDs(account).call({ from: standardAccount, gas: 1000000 });

        for(var i = 0; i < prescriptionIds_.length; i++){
            var prescription = await prescriptionsContract.methods.getPrescription(prescriptionIds_[i]).call({ from: standardAccount, gas: 1000000 });
        
            formData['physician_' + prescriptionIds_[i]] = prescription.physician;
            formData['insured_' + prescriptionIds_[i]] = prescription.insured;
            formData['medicine_name_' + prescriptionIds_[i]] = prescription.medicine_name;
            formData['medicine_amount_' + prescriptionIds_[i]] = prescription.medicine_amount;
            
            prescriptionsArray.push(prescription)
        }
            
        this.setState({prescriptions: prescriptionsArray, prescriptionIds: prescriptionIds_, formData: formData});
    }

    render(){
        // If the physician has no prescription in his list, then a message is shown. Otherwise the prescriptions are shown.
        if(this.state.prescriptions.length === 0){
            return(
                <p>Sie haben noch keine Rezepte ausgestellt. Klicken Sie auf "Neues Rezept", um ihr erstes Rezept zu erstellen!</p>
            )
        } else {
            var items = []
            var counter = 0;

            // Iterates through the prescriptions and created for every prescription a card.
            for(var prescription of this.state.prescriptions){
                items.push(
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title>{prescription.medicine_name} ({prescription.medicine_amount})</Card.Title>
                            <Card.Text></Card.Text>
                            <Row>
                                <Col>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                )
                counter = counter + 1;
            }

            // The array with all prescription cards is returned.
            return (
                <>
                    {items}
                </>
            )
        }
    }
}
export default PrescriptionListPhysician;