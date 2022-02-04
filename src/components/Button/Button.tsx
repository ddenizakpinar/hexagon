import classNames from "classnames";
import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button {...props} className={classNames(styles.button, className)}>
      {children}
    </button>
  );
};

export default Button;
