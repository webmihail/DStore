import { ImagePaths, RouteHrefs } from "../../../constants";
import { FC, useEffect } from "react";
import AppDrawer from "../AppDrawer";
import { Placement } from "../AppDrawer/constants";
import styles from "./styles/header.module.scss";
import NavLink from "components/common/NavLink";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import AppButton from "components/common/AppButton";
import AppTree from "../AppTree";
import { useAppSelector } from "hooks/useAppSelector";
import { convertCategoryToTreeData } from "utils/convertCategoryToTreeData";
import { useActions } from "hooks/useActions";
import { getAllCategoriesSaga } from "store/sagas/categories/getaAllCategories";
import { useInjectSaga } from "hooks/useInjectSaga";

const Header: FC = (): JSX.Element => {
  const { getAllCategories } = useActions();
  const { categories } = useAppSelector((state) => state.categories);
  const treeData = convertCategoryToTreeData(categories);

  useInjectSaga("getAllCategoriesSaga", getAllCategoriesSaga);

  useEffect(() => {
    getAllCategories({ loading: true });
  }, []);

  return (
    <header className={styles.header}>
      <NavLink style={styles.headerLogo} href={RouteHrefs.HOME}>
        <img src={ImagePaths.UNIQQ_MAIN_LOGO} alt="logo" />
      </NavLink>
      <AppDrawer placement={Placement.LEFT} closable={true}>
        <AppTree title="Магазин" data={treeData} />
        <NavLink href={RouteHrefs.CATEGORIES_MANAGER}>
          <AppButton style={styles.drawerCategoryButton}>
            Открыть менеджер категорий
          </AppButton>
        </NavLink>
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
