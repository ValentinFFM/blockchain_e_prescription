import React, { Component } from "react";
import PrescriptionsContract from './../../contracts/Prescriptions.json'
import getWeb3 from "../getWeb3";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class PrescriptionList extends Component {

    state = {web3: null, standardAccount: null, prescriptionsContract: null, account: null, prescriptions: [], prescriptionIds: []}

    componentDidMount = async () => {
        const ethereum = await window.ethereum;

        if(ethereum){
            const public_key = ethereum.selectedAddress;
            this.setState({account: public_key});

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
        
        await this.getPrescriptions()
    }

    getPrescriptions = async () => {
        var prescriptionsArray = [];
        const { account, standardAccount, prescriptionsContract } = this.state;
        const prescriptionIds_ = await prescriptionsContract.methods.getInsuredPrescriptionsIDs(account).call({ from: standardAccount, gas: 1000000 });

        for(var i = 0; i < prescriptionIds_.length; i++){
            var prescription = await prescriptionsContract.methods.getPrescription(prescriptionIds_[i]).call({ from: standardAccount, gas: 1000000 })
            prescriptionsArray.push(prescription)
        }
            
        this.setState({prescriptions: prescriptionsArray, prescriptionIds: prescriptionIds_});
        console.log(prescriptionsArray)
    }

    sendPrescription = async (event) => {
        console.log(event.target.id)
    }


    render(){
        if(this.state.prescriptions.length === 0){
            return(
                <p>Aktuelle wurden Ihnen keine Rezept verordnet!</p>
            )
        } else {

            var items = []
            var counter = 0;

            for(var prescription of this.state.prescriptions){
                var prescription_id = this.state.prescriptionIds[counter]
                items.push(
                    <Card className="mt-5">
                        <Card.Body>
                            <Card.Title>{prescription.medicine_name} ({prescription.medicine_amount})</Card.Title>
                            <Card.Text></Card.Text>
                            <Button id={prescription_id} onClick={this.sendPrescription} variant="dark">An Apotheke senden</Button>
                        </Card.Body>
                    </Card>
                )

                counter = counter + 1;
            }


            return (
                <>
                    {items}
                </>
            )
        }
    }
}
export default PrescriptionList;