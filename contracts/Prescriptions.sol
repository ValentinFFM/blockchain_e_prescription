// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Prescriptions {

    struct Prescription {
        address physician;
        address patient;

        string medicine_name;
        string medicine_amount;

        // bool charges_free;
        // bool charges_mandatory;
    }
}
