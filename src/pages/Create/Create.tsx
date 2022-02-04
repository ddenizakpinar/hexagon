import { ChangeEvent, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { createNFT, listNFT } from "@Lib/nft";
import useSigner from "@Hooks/useSigner";
import { Pages } from "@Utils/constants";
import styles from "./Create.module.scss";
import Button from "@Components/Button";
import NftCard from "@Components/NftCard";
import { useWallet } from "use-wallet";

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

const Create = () => {
  const signer = useSigner();
  const wallet = useWallet();

  const [fileProgress, setFileProgress] = useState<number>(0);
  const [fileUrl, setFileUrl] = useState("");
  const [formInput, updateFormInput] = useState({ name: "Bored Ape", price: "0", description: "" });
  const router = useRouter();

  const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    try {
      const { path } = await client.add(file, {
        progress: (progress) => {
          setFileProgress((progress / file.size) * 100);
        },
      });
      const url = `https://ipfs.infura.io/ipfs/${path}`;
      setFileUrl(url);
    } catch (error) {}
  };

  const createMarket = async () => {
    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const { path } = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${path}`;
      createSale(url);
    } catch (error) {}
  };

  const createSale = async (url: string) => {
    if (signer) {
      const tokenId = await createNFT(signer, url);
      const price = ethers.utils.parseUnits(formInput.price, "ether");
      await listNFT(signer, tokenId, price);
      router.push(Pages.EXPLORE);
    }
  };

  const { name, description, price } = formInput;

  return (
    <div className={styles.create}>
      <Head>
        <title>Create | Hexagon</title>
      </Head>
      <div className={styles.header}>Create & Sale NFT</div>
      <div className={styles.createForm}>
        <div className={styles.inputs}>
          <div className={styles.inputField}>
            <div className={styles.label}>Name</div>
            <input
              placeholder="Bored Ape"
              className={styles.input}
              onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
            />
          </div>
          <div className={styles.inputField}>
            <div className={styles.label}>Description</div>
            <input
              className={styles.input}
              onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
            />
          </div>
          <div className={styles.inputField}>
            <div className={styles.label}>Price</div>
            <input
              className={styles.input}
              onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
            />
          </div>

          <input id="file-input" type="file" name="Asset" className={styles.hide} onChange={onFileSelect} />
          {!fileUrl && (
            <>
              <Button onClick={() => document.getElementById("file-input")?.click()}>Upload Image</Button>
              <div className={styles.fileProgress}>
                <div style={{ width: `${fileProgress}%` }} className={styles.progressBar}></div>
              </div>
            </>
          )}
          <Button className={styles.createButton} onClick={createMarket}>
            Create
          </Button>
        </div>
        <NftCard
          className={styles.nftCard}
          nft={{
            seller: wallet.account || "",
            itemId: "",
            owner: "",
            tokenId: "",
            image: fileUrl,
            name,
            price,
            description,
          }}
        />
      </div>
    </div>
  );
};

export default Create;
