// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "./User.sol";

contract Prescriptions {
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
        prescriptionInsured[prescription_.insured].push(prescription_id);
        prescription_id = prescription_id + 1;
    }

    function transferPrescriptionToPharmacist(Prescription memory prescription_, uint prescription_id_) public {
        // require(prescriptionInsured[msg.sender].length <= prescription_id_, "There's no prescription under that number");
        // require(UserContract.checkVerification('physician', prescription_.pharmacist) == true, "This pharmacist is not registered or verified!");

        prescription[prescription_id_] = Prescription(prescription_.physician, prescription_.insured, prescription_.pharmacist, prescription_.pharmacistEqualsInsured, prescription_.medicine_name, prescription_.medicine_amount);
        prescriptionPharmacist[prescription_.pharmacist].push(prescription_id_);
        // delete prescriptionInsured[msg.sender][prescription_id_];
    }

    function getPrescription(uint prescription_id_) public returns (Prescription memory){
        return prescription[prescription_id_];
    }

    function getInsuredPrescriptionsIDs(address public_key) public returns (uint[] memory){
        return prescriptionInsured[public_key];
    }

    function getPharmacistPrescriptionsIDs(address public_key) public returns (uint[] memory){
        return prescriptionPharmacist[public_key];
    }
}
