import { Spin } from "antd";
import { FC } from "react";
import styles from "./styles/spinner.module.scss";
import { SpinnerOwnProps } from "./types";

const Spinner: FC<SpinnerOwnProps> = ({ size }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Spin size={size} />
    </div>
  );
};

export default Spinner;
