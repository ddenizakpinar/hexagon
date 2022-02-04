import { ethers, ContractInterface, providers, Contract, Signer } from "ethers";

import nft from "./contracts/NFT.json";
import market from "./contracts/NFTMarket.json";
import { nftMarketContractAddress, nftContractAddress } from "@Utils/constants";

interface MarketContractInstance extends Contract {
  fetchNFTs: () => Promise<[]>;
}
interface NftContractInstance extends Contract {
  tokenURI: (tokenId: string) => Promise<string>;
}

const getDeployedContract = (
  address: string,
  abi: ContractInterface,
  signerOrProvider: Signer | providers.Provider,
) => {
  const contract = new ethers.Contract(address, abi, signerOrProvider);
  return contract;
};

export const getMarketContract = (signerOrProvider: Signer | providers.Provider) => {
  return getDeployedContract(nftMarketContractAddress, market.abi, signerOrProvider) as MarketContractInstance;
};

export const getNftContract = (signerOrProvider: Signer | providers.Provider) => {
  return getDeployedContract(nftContractAddress, nft.abi, signerOrProvider) as NftContractInstance;
};
