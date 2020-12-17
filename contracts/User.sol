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

    Insured[] registeredInsured;

    function addNewUser(string memory surname_, string memory name_, string memory street_, string memory street_number_, uint post_code_, string memory city_, string memory birth_date_)  public{

        Insured memory insured_ = Insured(
            {
                surname: surname_,
                name: name_,
                street: street_,
                street_number: street_number_,
                post_code: post_code_,
                city: city_,
                birth_date : birth_date_
            }
        );

        registeredInsured.push(insured_);
    }

    function checkUser() public returns (bool available) {

        for user 

    }

}