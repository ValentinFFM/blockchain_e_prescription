// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Prescription {
  string insurance = "";

  function getInsurance() public view returns (string memory) {
    return insurance;
  }

  function setInsurance(string memory givenInsurance) public {
    insurance = givenInsurance;
  }
}
