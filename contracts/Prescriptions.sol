// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Prescriptions {
    address public verifying_institution;
    address public smart_contract_user;

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

    function setAddressOfSmartContractUser(address smart_contract_key) public {
        require(msg.sender == verifying_institution, "Only the verify institution has the right to connect prescription to user!");
        smart_contract_user = smart_contract_key;
    }
}
