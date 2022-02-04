import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Owned.module.scss";
import { fetchOwned, NFT } from "src/lib/nft";
import useSigner from "@Hooks/useSigner";
import NftList from "@Components/NftList";
import Spinner from "@Components/Spinner";

const Owned = () => {
  const signer = useSigner();
  const [nfts, setNfts] = useState<NFT[]>();

  const fetch = async () => {
    if (signer) {
      const nfts = await fetchOwned(signer);
      setNfts(nfts);
    }
  };

  useEffect(() => {
    fetch();
  }, [signer]);

  return (
    <div className={styles.owned}>
      <Head>
        <title>Owned | Hexagon</title>
      </Head>
      <div className={styles.header}>Owned</div>
      {nfts ? nfts.length ? <NftList nfts={nfts} /> : <div>Empty</div> : <Spinner />}
    </div>
  );
};

export default Owned;
