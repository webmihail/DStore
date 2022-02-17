import { Button, Col, Row } from "antd";
import NavLink from "components/common/NavLink";
import { RouteHrefs } from "../../../constants";
import { FC } from "react";
import styles from "./styles/subcategoriesList.module.scss";
import AppButton from "components/common/AppButton";
import { useAppSelector } from "hooks/useAppSelector";
import { Subcategory } from "types/categories";
import { getSubcategories } from "../../../utils/getSubcategories";

const SubcategoriesList: FC = (): JSX.Element => {
  const { categories } = useAppSelector((state) => state.categories);
  const subcategories: Subcategory[] = getSubcategories(categories);

  return (
    <>
      <h1 className={styles.title}>Наша продукция</h1>
      <Row className={styles.list}>
        {subcategories.map((subcategory, index) => (
          <Col
            key={index + subcategory.id}
            className={styles.listCard}
            xs={24}
            md={12}
            lg={12}
            xl={8}
          >
            <div className={styles.cardWrapper}>
              <img className={styles.cardImage} src={subcategory.image?.url} />
              <div className={styles.cardTitle}>
                <h3>{subcategory.parent}</h3>
                <h1>{subcategory.name}</h1>
                <NavLink href={`${RouteHrefs.CATEGORY}/${subcategory.id}`}>
                  <AppButton type="WHITE" style={styles.cardButton}>
                    Показать товары
                  </AppButton>
                </NavLink>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SubcategoriesList;
