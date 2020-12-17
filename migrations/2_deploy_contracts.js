var Prescription = artifacts.require("./Prescription.sol");
var User = artifacts.require("./User.sol");

module.exports = function(deployer) {
  deployer.deploy(Prescription);
  deployer.deploy(User);
};
