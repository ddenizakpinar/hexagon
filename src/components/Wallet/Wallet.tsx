import "./Wallet.module.scss";
import { useWallet } from "use-wallet";
import Button from "@Components/Button";
import Avatar from "@Components/Avatar";
import styles from "./Wallet.module.scss";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { Pages } from "@Utils/constants";
import { useState } from "react";

enum ProfileStates {
  Wallet = "Wallet",
  Disconnect = "Disconnect",
}

enum WalletStatus {
  Connected = "connected",
  Disconnected = "disconnected",
}

const Wallet = () => {
  const [profileState, setProfileState] = useState(ProfileStates.Wallet);
  const wallet = useWallet();
  const router = useRouter();

  const onDisconnect = () => {
    wallet.reset();
    setProfileState(ProfileStates.Wallet);
  };

  const balance = `${Number(ethers.utils.formatUnits(wallet.balance, "ether")).toFixed(3)} MATIC`;

  return (
    <div className={styles.wallet}>
      {wallet.status === WalletStatus.Connected && wallet.account ? (
        <div className={styles.profile}>
          <div
            className={styles.content}
            onMouseEnter={() => setProfileState(ProfileStates.Disconnect)}
            onMouseLeave={() => setProfileState(ProfileStates.Wallet)}>
            {profileState === ProfileStates.Wallet ? (
              <>
                <Avatar className={styles.avatar} hash={wallet.account} />
                <div className={styles.balance}>{balance}</div>
              </>
            ) : (
              <div onClick={onDisconnect}>Disconnect</div>
            )}
          </div>
          <Button onClick={() => router.push(Pages.CREATE)}>Create</Button>
        </div>
      ) : (
        <>
          <Button onClick={() => wallet.connect("injected")}>Connect Wallet</Button>
        </>
      )}
    </div>
  );
};

export default Wallet;
