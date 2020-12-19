// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract User {

    struct Insured {
        string surname;
        string name;
        string street;
        string street_number;
        uint post_code;
        string city;
        string birth_date;
    }

    mapping(string => Insured) public insureds;
    string[] public InsuredAccounts;

    function addNewUser(string memory surname_, string memory name_, string memory street_, string memory street_number_, uint post_code_, string memory city_, string memory birth_date_)  public{
        
        insureds[surname_] = Insured(surname_, name_, street_, street_number_, post_code_, city_, birth_date_);

        // Insured storage insured = insureds[surname_];

        // insured.surname = surname_;
        // insured.name = name_;
        // insured.street = street_;
        // insured.street_number = street_number_;
        // insured.post_code = post_code_;
        // insured.city = city_;
        // insured.birth_date = birth_date_;


        // InsuredAccounts.push(surname_);
    }

    function getUser(string memory surname_) public view returns (string memory, string memory, string memory, string memory) {
        return (insureds[surname_].surname, insureds[surname_].name, insureds[surname_].street, insureds[surname_].street_number);
    }
}