import React from "react";
import { Select } from "antd";
import styles from "./styles/selectField.module.scss";
import InputFieldTitle from "../InputFieldTitle";
import { SelectFieldProps } from "./types";

const SelectField = ({
  title,
  required,
  className,
  errorMessage,
  options,
  ...props
}: SelectFieldProps) => {
  return (
    <InputFieldTitle
      required={required}
      title={title || ""}
      errorMessage={errorMessage}
      className={className}
    >
      <Select {...props} className={styles.select}>
        {options
          ? options.map((option: any) => (
              <Select.Option
                key={option.value}
                value={option.value}
                title={option.title}
              >
                {props.showValue
                  ? `${option.value} ${option.name}`
                  : option.name}
              </Select.Option>
            ))
          : null}
      </Select>
    </InputFieldTitle>
  );
};

export default SelectField;
