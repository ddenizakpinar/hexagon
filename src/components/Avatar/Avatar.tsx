import { FC } from "react";
import classnames from "classnames";
import styles from "./Avatar.module.scss";

interface ButtonProps {
  hash: string;
  className?: string;
}

const Avatar: FC<ButtonProps> = ({ hash, className }) => {
  const getAvatarsSrc = (hash: string) => {
    return `https://avatars.dicebear.com/api/personas/${hash}.svg?background=%23000&radius=50`;
  };

  return <img className={classnames(styles.avatar, className)} width={36} height={36} src={getAvatarsSrc(hash)} alt={hash}/>;
};

export default Avatar;
