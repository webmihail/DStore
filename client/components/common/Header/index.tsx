import { ImagePaths, RouteHrefs } from "../../../constants";
import { FC } from "react";
import AppDrawer from "../AppDrawer";
import { Placement } from "../AppDrawer/constants";
import styles from "./styles/header.module.scss";
import NavLink from "components/common/NavLink";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import AppButton from "components/common/AppButton";
import AppTree from "../AppTree";
import { useAppSelector } from "hooks/useAppSelector";
import { convertCategoryToTreeData } from "utils/convertCategoryToTreeData";

const Header: FC = (): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);
  const treeData = convertCategoryToTreeData(categories)
  
  return (
    <header className={styles.header}>
      <NavLink style={styles.headerLogo} href={RouteHrefs.HOME}>
        <img src={ImagePaths.UNIQQ_MAIN_LOGO} alt="logo" />
      </NavLink>
      <AppDrawer placement={Placement.LEFT} closable={true}>
        <AppTree title="Магазин" data={treeData} />
      </AppDrawer>
      <div className={styles.headerRightNavBar}>
        <NavLink href={RouteHrefs.ORDERS}>
          <AppButton style={styles.headerButtonHistory}>
            История заказов
          </AppButton>
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
