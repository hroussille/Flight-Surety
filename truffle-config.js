const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic =
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    development: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/", 0, 50);
      },
      network_id: "*",
      gas: 4600000,
    },

    development_gui: {
      prodiver: function () {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/", 0, 59);
      },
      network_id: "*",
      gas: 4600000,
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
