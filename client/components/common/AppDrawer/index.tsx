import { Drawer } from "antd";
import { FC, useState } from "react";
import { AppDrawerOwnProps } from "./types";
import { MenuOutlined } from "@ant-design/icons";
import AppButton from "../AppButton";

const AppDrawer: FC<AppDrawerOwnProps> = ({
  title,
  placement,
  closable,
  children,
}): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <MenuOutlined onClick={showDrawer} />
      <Drawer
        title={title}
        placement={placement}
        closable={closable}
        onClose={onClose}
        visible={visible}
        key={placement}
      >
        {children}
      </Drawer>
    </>
  );
};

export default AppDrawer;
