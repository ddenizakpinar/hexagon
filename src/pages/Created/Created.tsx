import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Created.module.scss";
import { fetchCreated, NFT } from "src/lib/nft";
import useSigner from "@Hooks/useSigner";
import NftList from "@Components/NftList";
import Spinner from "@Components/Spinner";

const Created = () => {
  const signer = useSigner();
  const [nfts, setNfts] = useState<NFT[]>();

  const fetch = async () => {
    if (signer) {
      const nfts = await fetchCreated(signer);
      setNfts(nfts);
    }
  };

  useEffect(() => {
    fetch();
  }, [signer]);

  return (
    <div className={styles.created}>
      <Head>
        <title>Created | Hexagon</title>
      </Head>
      <div className={styles.header}>Created</div>
      {nfts ? nfts.length ? <NftList nfts={nfts} /> : <div>Empty</div> : <Spinner />}
    </div>
  );
};

export default Created;
