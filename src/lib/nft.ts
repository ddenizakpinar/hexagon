import { ethers, ContractInterface, providers, Contract, Signer, BigNumber } from "ethers";
import { getMarketContract, getNftContract } from "./contracts";
import axios from "axios";
import { nftContractAddress } from "@Utils/constants";

interface RawNFT {
  tokenId: string;
  itemId: string;
  seller: string;
  owner: string;
  price: string;
}

interface MetaData {
  data: {
    image: string;
    name: string;
    description: string;
  };
}

export interface NFT extends RawNFT {
  image: string;
  name: string;
  description: string;
}

export const fetchNFTs = async (signerOrProvider: Signer | providers.Provider): Promise<NFT[]> => {
  const marketContractInstance = getMarketContract(signerOrProvider);
  const nftContractInstance = getNftContract(signerOrProvider);
  const rawNfts = await marketContractInstance.fetchNFTs();

  const nfts = await Promise.all(
    rawNfts.map(async (rawNft: RawNFT) => {
      const tokenUri = await nftContractInstance.tokenURI(rawNft.tokenId);

      const { data }: MetaData = await axios.get(tokenUri);

      let nft: NFT = {
        ...rawNft,
        ...data,
        price: ethers.utils.formatUnits(rawNft.price, "ether"),
      };
      return nft;
    }),
  );

  return nfts;
};

export const fetchNFT = async (signerOrProvider: Signer | providers.Provider, itemId: number): Promise<NFT> => {
  const marketContractInstance = getMarketContract(signerOrProvider);
  const nftContractInstance = getNftContract(signerOrProvider);

  const rawNft = await marketContractInstance.fetchNFT(itemId);
  const tokenUri = await nftContractInstance.tokenURI(rawNft.tokenId);

  const { data }: MetaData = await axios.get(tokenUri);

  let nft: NFT = {
    ...rawNft,
    ...data,
    price: ethers.utils.formatUnits(rawNft.price, "ether"),
  };

  return nft;
};

export const fetchOwned = async (signer: Signer): Promise<NFT[]> => {
  const marketContractInstance = getMarketContract(signer);
  const nftContractInstance = getNftContract(signer);
  const rawNfts = await marketContractInstance.fetchOwnedNFTs();

  const nfts = await Promise.all(
    rawNfts.map(async (rawNft: RawNFT) => {
      const tokenUri = await nftContractInstance.tokenURI(rawNft.tokenId);

      const { data }: MetaData = await axios.get(tokenUri);

      let nft: NFT = {
        ...rawNft,
        ...data,
        price: ethers.utils.formatUnits(rawNft.price, "ether"),
      };
      return nft;
    }),
  );

  return nfts;
};

export const fetchCreated = async (signer: Signer): Promise<NFT[]> => {
  const marketContractInstance = getMarketContract(signer);
  const nftContractInstance = getNftContract(signer);
  const rawNfts = await marketContractInstance.fetchCreatedNFTs();

  const nfts = await Promise.all(
    rawNfts.map(async (rawNft: RawNFT) => {
      const tokenUri = await nftContractInstance.tokenURI(rawNft.tokenId);

      const { data }: MetaData = await axios.get(tokenUri);

      let nft: NFT = {
        ...rawNft,
        ...data,
        price: ethers.utils.formatUnits(rawNft.price, "ether"),
      };
      return nft;
    }),
  );

  return nfts;
};

export const createNFT = async (signer: Signer, url: string): Promise<number> => {
  let nftContractInstance = getNftContract(signer);
  let transaction = await nftContractInstance.createToken(url);
  let tx = await transaction.wait();

  let event = tx.events[0];
  let value = event.args[2];

  let tokenId = value.toNumber();

  return tokenId;
};

export const listNFT = async (provider: any, tokenId: number, price: BigNumber) => {
  let marketContractInstance = getMarketContract(provider);
  let listingPrice = await marketContractInstance.getListingPrice();
  listingPrice = listingPrice.toString();

  let transaction = await marketContractInstance.createNFT(nftContractAddress, tokenId, price, {
    value: listingPrice,
  });
  await transaction.wait();
};

export const buyNFT = async (signer: Signer, nft: RawNFT) => {
  let marketContractInstance = getMarketContract(signer);

  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  const transaction = await marketContractInstance.createMarketSale(nftContractAddress, nft.itemId, {
    value: price,
  });

  await transaction.wait();
};
