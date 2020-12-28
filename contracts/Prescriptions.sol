// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "./User.sol";

contract Prescriptions {
    address public verifying_institution;
    User UserContract;

    constructor () public {
        verifying_institution = msg.sender;
    }

    struct Prescription {
        address physician;
        address patient;

        string medicine_name;
        string medicine_amount;

        // bool charges_free;
        // bool charges_mandatory;
    }

    mapping(address => Prescription[]) public prescriptions_physician;
    mapping(address => Prescription[]) public prescriptions_patient;
    
    function establishConnectionToUserSmartContract(address smart_contract_key) public {
        require(msg.sender == verifying_institution, "Only the verify institution has the right to connect prescription to user!");
        UserContract = User(smart_contract_key);
    }

    function newPrescription(Prescription memory prescription_) public{
        require(UserContract.checkVerification('physician', msg.sender) == true, "You don't have the right to create a prescription!");
        require(UserContract.checkVerification('insured', prescription_.patient) == true, "This patient is not registered or verified!");
        prescriptions_physician[msg.sender].push(Prescription(prescription_.physician, prescription_.patient, prescription_.medicine_name, prescription_.medicine_amount));
    }

    function getPrescriptions(address public_key) public view returns (Prescription[] memory){
        return prescriptions_physician[public_key];
    }
}
