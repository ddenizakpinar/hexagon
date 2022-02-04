import styles from "./Logo.module.scss";
import Link from "next/link";
import { Pages } from "@Utils/constants";

const Logo = () => {
  return (
    <Link href={Pages.EXPLORE}>
      <a className={styles.logo}>&#x2B22; Hexagon</a>
    </Link>
  );
};

export default Logo;
