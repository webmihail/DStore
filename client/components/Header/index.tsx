import { ImagePaths, RouteHrefs } from "../../constants";
import { FC } from "react";
import AppDrawer from "../AppDrawer";
import { Placement } from "../AppDrawer/constants";
import styles from "./styles/header.module.scss";
import NavLink from "components/NavLink";
import { Button } from "antd";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";

const Header: FC = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <NavLink className={styles.headerLogo} href={RouteHrefs.HOME}>
        <img src={ImagePaths.UNIQ_YOU_MAIN_LOGO} alt="logo" />
      </NavLink>
      <AppDrawer placement={Placement.LEFT} closable={true}>
        <div></div>
      </AppDrawer>
      <div className={styles.headerRightNavBar}>
        <NavLink href={RouteHrefs.ORDERS}>
          <Button className={styles.headerButtonHistory}>
            История заказов
          </Button>
        </NavLink>
        <NavLink href={RouteHrefs.BASKET}>
          <ShoppingOutlined />
        </NavLink>
        <UserOutlined className={styles.headerButtonAuth} />
      </div>
    </header>
  );
};

export default Header;
