import React, { Component } from "react";
import PrescriptionsContract from './../../contracts/Prescriptions.json'
import getWeb3 from "../getWeb3";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class PrescriptionList extends Component {

    state = {web3: null, standardAccount: null, prescriptionsContract: null, prescriptions: []}

    componentDidMount = async () => {
        const ethereum = await window.ethereum;
        const public_key = ethereum.selectedAddress

        try {
            // Get web3 instance and the accounts that are stored 
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const standardAccount = accounts[0]
      
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const PrescriptionContractNetwork = PrescriptionsContract.networks[networkId];
      
            const PrescriptionsContractInstance = new web3.eth.Contract(
              PrescriptionsContract.abi,
              PrescriptionContractNetwork && PrescriptionContractNetwork.address,
            );
      
            // Save data into the react state
            this.setState({ web3: web3, standardAccount: standardAccount, prescriptionsContract: PrescriptionsContractInstance });
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
        
        await this.getPrescriptions(public_key)
    }

    getPrescriptions = async (public_key) => {
        const { prescriptionsContract } = this.state;
        const response = await prescriptionsContract.methods.getPatientPrescriptions(public_key).call({ from: public_key, gas: 1000000 });
        console.log(response)
        this.setState({prescriptions: response});
    }


    render(){
        if(this.state.prescriptions.length === 0){
            return(
                <p>Aktuelle wurden Ihnen keine Rezept verordnet!</p>
            )
        } else {
            return this.state.prescriptions.map(function(prescription){
                return(
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title>{prescription.medicine_name} ({prescription.medicine_amount})</Card.Title>
                            <Card.Text></Card.Text>
                            <Button variant="dark">An Apotheke senden</Button>
                        </Card.Body>
                    </Card>
                )
            })
        }

        
    }

    
}
export default PrescriptionList;