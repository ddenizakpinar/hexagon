import { FC } from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
