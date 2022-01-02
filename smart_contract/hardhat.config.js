require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const {PRIVATE_KEY, API_URL} = process.env;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks:{
    ropsten:{
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
