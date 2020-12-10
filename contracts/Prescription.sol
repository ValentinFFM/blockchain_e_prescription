// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Prescription {
  string insurance = "";

  // string insured_surname = "";
  // string insured_name = "";
  // string insured_street = "";
  // string insured_street_number = "";
  // uint insured_post_code = null;
  // string insured_city = "";

  function getInsurance() public view returns (string memory) {
    return insurance;
  }

  function setInsurance(string memory givenInsurance) public {
    insurance = givenInsurance;
  }
}
