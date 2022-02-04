import { useEffect, useState } from "react";
import Head from "next/head";
import { fetchNFTs, NFT } from "src/lib/nft";
import styles from "./Explore.module.scss";
import useDefaultProvider from "@Hooks/useDefaultProvider";
import NftList from "@Components/NftList";
import Spinner from "@Components/Spinner";

const Explore = () => {
  const defaultProvider = useDefaultProvider();

  const [nfts, setNfts] = useState<NFT[]>();

  const fetch = async () => {
    if (defaultProvider) {
      const nfts = await fetchNFTs(defaultProvider);
      setNfts(nfts);
    }
  };

  useEffect(() => {
    fetch();
  }, [defaultProvider]);

  return (
    <div className={styles.explore}>
      <Head>
        <title>Explore | Hexagon</title>
      </Head>
      <div className={styles.header}>On Sale</div>
      {nfts ? nfts.length ? <NftList nfts={nfts} /> : <div>Empty</div> : <Spinner />}
    </div>
  );
};

export default Explore;
