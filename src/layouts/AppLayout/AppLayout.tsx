import { FC, ReactNode } from "react";
import Header from "@Components/Layout/Header";
import styles from "./AppLayout.module.scss";

export interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default AppLayout;
