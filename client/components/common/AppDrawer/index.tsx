import { Drawer } from "antd";
import { FC } from "react";
import { AppDrawerOwnProps } from "./types";
import { MenuOutlined } from "@ant-design/icons";
import { useAppSelector } from "hooks/useAppSelector";
import { useActions } from "hooks/useActions";

const AppDrawer: FC<AppDrawerOwnProps> = ({
  title,
  placement,
  closable,
  children,
}): JSX.Element => {
  const { visible } = useAppSelector((state) => state.drawer);
  const { setVisible } = useActions();

  return (
    <>
      <MenuOutlined onClick={() => setVisible(true)} />
      <Drawer
        title={title}
        placement={placement}
        closable={closable}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement}
      >
        {children}
      </Drawer>
    </>
  );
};

export default AppDrawer;
