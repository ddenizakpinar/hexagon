import NftCard from "@Components/NftCard";
import { NFT } from "@Lib/nft";
import { FC } from "react";
import styles from "./NftList.module.scss";

interface NftListProps {
  nfts: NFT[];
}

const NftList: FC<NftListProps> = ({ nfts }) => {
  return (
    <div className={styles.nftList}>
      <div className={styles.content}>
        {nfts.map((nft) => (
          <NftCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NftList;
