import styles from "./Header.module.scss";
import Link from "next/link";
import Logo from "@Components/Layout/Logo";
import Wallet from "@Components/Wallet";
import { useWallet } from "use-wallet";
import { Pages } from "@Utils/constants";

const Header = () => {
  const wallet = useWallet();

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftContent}>
          <Logo />
          <div className={styles.links}>
            <Link href={Pages.EXPLORE}>
              <div className={styles.link}>Explore</div>
            </Link>
            {wallet.isConnected() && (
              <>
                <Link href={Pages.OWNED}>
                  <div className={styles.link}>Owned</div>
                </Link>
                <Link href={Pages.CREATED}>
                  <div className={styles.link}>Created</div>
                </Link>
              </>
            )}
          </div>
        </div>
        <Wallet />
      </div>
    </div>
  );
};

export default Header;
