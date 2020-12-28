// SPDX-License-Identifier: MIT

// Defining the solidity version that is used and allowing experimental functions to allow using structs as datatype within the function call
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract User {
    address public verifying_institution;

    constructor () public {
        verifying_institution = msg.sender;
    }

    // Defining datatype insured to store all necessary data related to the insured
    struct Insured {
        string surname;
        string name;
        string street;
        string street_number;
        uint post_code;
        string city;

        string birth_date;

        string insurance;
        uint insurance_number;
        uint insured_number;
        uint insured_status;

        bool verified;
    }

    // Defining datatype physician to store all necessary data related to the physician
    struct Physician {
        string job_title;
        string surname;
        string name;
        uint physician_number;

        string street;
        string street_number;
        uint post_code;
        string city;
        string telephone_number; 
        uint business_number;

        bool verified;
    }

    // Insured Number mapped on the related insured object with all data of the insured
    mapping(address => Insured) public insureds;

    // Physician Number mapped on the related physician object with all data of the physician
    mapping(address => Physician) public physicians;

    // Function to add a new Insured
    function addNewInsured(Insured memory insured_)  public{
        insureds[msg.sender] = Insured(insured_.surname, insured_.name, insured_.street, insured_.street_number, insured_.post_code, insured_.city, insured_.birth_date, insured_.insurance, insured_.insurance_number, insured_.insured_number, insured_.insured_status, false);
    }

    // From the address of the veryifying_institution every insured can be verified
    function verifyInsured(address public_key) public returns (bool){
        require(msg.sender == verifying_institution, "Only the verify institution has the right to verify insured!");
        require(insureds[public_key].insured_number > 0, "No insured exists under this address!");
        insureds[public_key].verified = true;
    }

    // Function returns true, if insured with the insured_number_ exists
    function getInsured(address public_key) public view returns(Insured memory){
        if(insureds[public_key].insured_number > 0){
            return insureds[public_key];
        } 
    }

    // Function to add a new Physician
    function addNewPhysician(Physician memory physician_) public{
        physicians[msg.sender] = Physician(physician_.job_title, physician_.surname, physician_.name, physician_.physician_number, physician_.street, physician_.street_number, physician_.post_code, physician_.city, physician_.telephone_number, physician_.business_number, false);
    }

    // From the address of the veryifying_institution every insured can be verified
    function verifyPhysician(address public_key) public returns (bool){
        require(msg.sender == verifying_institution, "Only the verify institution has the right to verify physician!");
        require(physicians[public_key].physician_number > 0, "No physician exists under this address!");
        physicians[public_key].verified = true;
    }

    // Function returns true, if insured with the physician_number_ exists
    function getPhysician(address public_key) public view returns(Physician memory){
        if(physicians[public_key].physician_number > 0){
            return physicians[public_key];
        } 
    }

    // Checks if an insured exists under the given public_key and if he is verified
    function checkVerification(string memory role, address public_key) public view returns (bool){
        if(keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked('insured'))){
            if(insureds[public_key].insured_number > 0 && insureds[public_key].verified == true){
                return true;
            } else {
                return false;
            }
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked('physician'))){
            if(physicians[public_key].physician_number > 0 && physicians[public_key].verified == true){
                return true;
            } else {
                return false;
            }
        }
    }

    function checkExistance(string memory role, address public_key) public view returns (bool){
        if(keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked('insured'))){
            if(insureds[public_key].insured_number >0){
                return true;
            } else {
                return false;
            }
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked('physician'))){
            if(physicians[public_key].physician_number >0){
                return true;
            } else {
                return false;
            }
        }
    }
}