import NftCard from "@Components/NftCard";
import Head from "next/head";
import useDefaultProvider from "@Hooks/useDefaultProvider";
import { fetchNFT, NFT } from "@Lib/nft";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Details.module.scss";
import Spinner from "@Components/Spinner";

const Details = () => {
  const [nft, setNft] = useState<NFT>();
  const defaultProvider = useDefaultProvider();
  const router = useRouter();
  const { Details } = router.query;

  const fetch = async () => {
    if (defaultProvider && Details) {
      const nft = await fetchNFT(defaultProvider, Number(Details));
      setNft(nft);
    }
  };

  useEffect(() => {
    fetch();
  }, [defaultProvider, Details]);

  return (
    <div className={styles.details}>
      <Head>
        <title>Details | Hexagon</title>
      </Head>
      {nft ? <NftCard nft={nft} fullScreen /> : <Spinner />}
    </div>
  );
};

export default Details;
