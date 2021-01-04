import React, { Component } from "react";
import PrescriptionsContract from '../../contracts/Prescriptions.json';
import getWeb3 from "../getWeb3";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class PrescriptionListPhysician extends Component {

    state = {web3: null, standardAccount: null, prescriptionsContract: null, account: null, formData: {}, prescriptions: [], prescriptionIds: [], sendPrescription: null}

    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

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

    handleChange(event){
        // Reading out the value and the id of the triggered input
        const event_id = event.target.id
        const event_value = event.target.value
    
        // Setting the value into the user object of the state
        const { formData } = this.state;
        formData[event_id] = event_value
        this.setState({formData: formData})
    }
    

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
        console.log(prescriptionsArray)
    }

    render(){
        if(this.state.prescriptions.length === 0){
            return(
                <p>Sie haben noch keine Rezepte ausgestellt. Klicken Sie auf "Neues Rezept", um ihr erstes Rezept zu erstellen!</p>
            )
        } else {

            var items = []
            var counter = 0;

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


            return (
                <>
                    {items}
                </>
            )
        }
    }
}
export default PrescriptionListPhysician;