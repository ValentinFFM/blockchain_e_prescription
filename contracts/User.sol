// SPDX-License-Identifier: MIT

// Defining the solidity version that is used and allowing experimental functions to allow using structs as datatype within the function call
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

contract User {

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
    }

    // Defining datatype physician to store all necessary data related to the physician
    struct Physician {
        uint business_number;

        string job_title;
        string surname;
        string name;

        string street;
        string street_number;
        uint post_code;
        string city;

        string telephone_number; 
    }

    // Insured Number mapped on the related insured object with all data of the insured
    mapping(address => Insured) public insureds;

    // Physician Number mapped on the related physician object with all data of the physician
    mapping(uint => Physician) public physicians;

    // Function to add a new Insured
    function addNewInsured(Insured memory insured_)  public{
        insureds[msg.sender] = Insured(insured_.surname, insured_.name, insured_.street, insured_.street_number, insured_.post_code, insured_.city, insured_.birth_date, insured_.insurance, insured_.insurance_number, insured_.insured_number, insured_.insured_status);
    }

    // Function to add a new Physician
    function addNewPhysician(uint physician_number_, Physician memory physician_) public{
        physicians[physician_number_] = Physician(physician_.business_number, physician_.job_title, physician_.surname, physician_.name, physician_.street, physician_.street_number, physician_.post_code, physician_.city, physician_.telephone_number);
    }

    // Function returns true, if insured with the insured_number_ exists
    function checkInsuredExistance(address public_key) public view returns(bool){
        if(insureds[public_key].insurance_number > 0){
            return true;
        } else {
            return false;
        }
    }

    // Function returns true, if insured with the physician_number_ exists
    function checkPhysicianExistance(uint physician_number_) public view returns(bool){
        if(physicians[physician_number_].business_number > 0){
            return true;
        } else {
            return false;
        }
    }
}