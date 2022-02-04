import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/types";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.MUMBAI_ID}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.MUMBAI_ID}`,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
};

export default config;
