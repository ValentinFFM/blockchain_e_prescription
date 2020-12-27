// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

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

    function establishConnectionToUserSmartContract(address smart_contract_key) public {
        require(msg.sender == verifying_institution, "Only the verify institution has the right to connect prescription to user!");
        UserContract = User(smart_contract_key);
    }

    function newPrescription(/*Prescription memory prescription_*/) public view returns (bool){
        require(UserContract.checkPhysicianVerification(msg.sender) == true, "You don't have the right to create a prescription!");
        return true;
    }
}
