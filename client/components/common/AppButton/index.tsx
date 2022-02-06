import { FC } from "react";
import styles from "./styles/appButton.module.scss";
import { AppButtonOwnProps } from "./types";

const AppButton: FC<AppButtonOwnProps> = ({
  children,
  type,
  style,
}): JSX.Element => {
  const getStyle = () => {
    switch (type) {
      case 'WHITE':
        return styles.buttonWhite;
      case 'GOLD':
        return styles.buttonGold;
      default:
        return styles.button;
    }
  };

  return <button className={`${getStyle()} ${style}`}>{children}</button>;
};

export default AppButton;
