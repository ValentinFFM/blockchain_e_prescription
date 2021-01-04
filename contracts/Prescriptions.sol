// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

// Import Smart Contract User to interact and call functions of it
import "./User.sol";

contract Prescriptions {

    // Variable that stores the address of the user who created the smart contract
    address public verifying_institution;

    User UserContract;
    uint prescription_id;

    constructor () public {
        verifying_institution = msg.sender;
        prescription_id = 0;
    }

    struct Prescription {
        address physician;
        address insured;
        address pharmacist;

        bool pharmacistEqualsInsured;

        string medicine_name;
        string medicine_amount;

        // bool charges_free;
        // bool charges_mandatory;
    }

    mapping(uint => Prescription) public prescription;
    mapping(address => uint[]) public prescriptionPhysisician;
    mapping(address => uint[]) public prescriptionInsured;
    mapping(address => uint[]) public prescriptionPharmacist;
    
    function establishConnectionToUserSmartContract(address smart_contract_key) public {
        require(msg.sender == verifying_institution, "Only the verify institution has the premission to connect prescription to user!");
        UserContract = User(smart_contract_key);
    }

    function newPrescription(Prescription memory prescription_) public{
        require(UserContract.checkVerification('physician', msg.sender) == true, "You don't have the premission to create a prescription!");
        require(UserContract.checkVerification('insured', prescription_.insured) == true, "This insured is not registered or verified!");

        prescription[prescription_id] = Prescription(prescription_.physician, prescription_.insured, prescription_.pharmacist, prescription_.pharmacistEqualsInsured, prescription_.medicine_name, prescription_.medicine_amount);
        prescriptionPhysisician[prescription_.physician].push(prescription_id);
        prescriptionInsured[prescription_.insured].push(prescription_id);
        prescription_id = prescription_id + 1;
    }

    function transferPrescriptionToPharmacist(Prescription memory prescription_, uint prescription_id_) public {
        require(msg.sender == prescription_.insured, "The prescription you try to transfer is not your prescription!");
        require(UserContract.checkVerification('insured', prescription_.insured) == true, "You don't have the premission to transfer a prescription!");
        require(UserContract.checkVerification('pharmacist', prescription_.pharmacist) == true, "This pharmacist is not registered or verified!");
    
        prescription[prescription_id_] = Prescription(prescription_.physician, prescription_.insured, prescription_.pharmacist, prescription_.pharmacistEqualsInsured, prescription_.medicine_name, prescription_.medicine_amount);
        prescriptionPharmacist[prescription_.pharmacist].push(prescription_id_);

        bool swap = false;
        uint prescriptionInsuredLength;
        prescriptionInsuredLength = prescriptionInsured[msg.sender].length;

        for(uint i=0; i < prescriptionInsuredLength; i++){
            if(prescription_id_ == prescriptionInsured[msg.sender][i]){
                prescriptionInsured[msg.sender][i] = prescriptionInsured[msg.sender][prescriptionInsuredLength-1];
                swap = true;
            }
        } 
        
        if(swap == true){
            prescriptionInsured[msg.sender].pop();
        }
    }

    function redeemPrescription(uint prescription_id_) public {
        bool swap = false;
        uint prescriptionPharmacistLength;
        prescriptionPharmacistLength = prescriptionPharmacist[msg.sender].length;

        for(uint i=0; i < prescriptionPharmacistLength; i++){
            if(prescription_id_ == prescriptionPharmacist[msg.sender][i]){
                prescriptionPharmacist[msg.sender][i] = prescriptionPharmacist[msg.sender][prescriptionPharmacistLength-1];
                prescriptionPharmacist[msg.sender].pop();
                swap = true;
            }
        } 

        if(swap == true){
            prescriptionPharmacist[msg.sender].pop();
        }
    }

    function getPrescription(uint prescription_id_) public returns (Prescription memory){
        return prescription[prescription_id_];
    }

    function getPhysisicianPrescriptionsIDs(address public_key) public returns (uint[] memory){
        return prescriptionPhysisician[public_key];
    }

    function getInsuredPrescriptionsIDs(address public_key) public returns (uint[] memory){
        return prescriptionInsured[public_key];
    }

    function getPharmacistPrescriptionsIDs(address public_key) public returns (uint[] memory){
        return prescriptionPharmacist[public_key];
    }
}
