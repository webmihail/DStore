import React, { PropsWithChildren } from "react";
import { Form } from "antd";
import classnames from "classnames";
import styles from "./styles/inputFieldTitle.module.scss";
import { InputFieldProps } from "./types";

const InputFieldTitle = ({
  title,
  required = true,
  errorMessage,
  className,
  children,
}: PropsWithChildren<InputFieldProps>) => {
  return (
    <div className={classnames([styles.inputWrapper, className])}>
      <div className={styles.inputInfo}>
        {required && <span className={styles.asterisk}>*</span>}{" "}
        <span>{title}</span>
      </div>
      <Form.Item
        className={errorMessage ? styles.errorMassage : ""}
        validateStatus={errorMessage ? "error" : undefined}
        help={errorMessage}
      >
        {children}
      </Form.Item>
    </div>
  );
};

export default InputFieldTitle;
