import { FC } from "react";
import { buyNFT, NFT } from "@Lib/nft";
import styles from "./NftCard.module.scss";
import { shortenAddress } from "@Utils/helpers";
import useSigner from "@Hooks/useSigner";
import { useWallet } from "use-wallet";
import Avatar from "@Components/Avatar";
import { useRouter } from "next/router";
import { Pages } from "@Utils/constants";
import Button from "@Components/Button";
import classNames from "classnames";

interface NftCardProps {
  nft: NFT;
  fullScreen?: boolean;
  className?: string;
}

const NftCard: FC<NftCardProps> = ({ nft, className, fullScreen }) => {
  const wallet = useWallet();
  const signer = useSigner();
  const router = useRouter();

  const buy = async (e: any, nft: NFT) => {
    e.stopPropagation();

    if (signer) {
      buyNFT(signer, nft);
    }
  };

  return (
    <div
      className={classNames(styles.nftCard, className, fullScreen && styles.fullScreen)}
      onClick={() => {
        nft.itemId && router.push(`${Pages.DETAILS}/${nft.itemId}`);
      }}>
      <div className={styles.seller}>
        <Avatar hash={nft.seller} /> <div className={styles.text}>{shortenAddress(nft.seller)}</div>
      </div>
      <img className={styles.image} src={nft.image || "/placeholder.png"} alt={nft.name} />
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.name}>{nft.name}</div>
          <div className={styles.price}>{`${nft.price} MATIC`}</div>
        </div>
        {wallet.isConnected() && nft.seller !== wallet.account && (
          <Button className={styles.buy} onClick={(e) => buy(e, nft)}>
            BUY
          </Button>
        )}
      </div>
    </div>
  );
};

export default NftCard;
