const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");

module.exports = function (deployer) {
  let firstAirline = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
  deployer.deploy(FlightSuretyData).then(() => {
    return deployer.deploy(FlightSuretyApp).then(() => {
      let config = {
        localhost: {
          url: "http://localhost:8545",
          dataAddress: FlightSuretyData.address,
          appAddress: FlightSuretyApp.address,
        },
      };
    });
  });
};
