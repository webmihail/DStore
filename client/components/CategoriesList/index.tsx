import { Button, Col, Row } from "antd";
import NavLink from "components/NavLink";
import { RouteHrefs } from "../../constants";
import { FC } from "react";
import styles from "./styles/categoriesList.module.scss";

const categories = [
  {
    id:'423',
    image:
      "https://cdn.shopify.com/s/files/1/0557/1824/8604/products/theycallmelocksmith_5013_1000x.jpg?v=1620991032",
    parent: "Женская одежда",
    name: "Топы",
  },
  {
    id:'42353',
    image:
      "https://cdn.shopify.com/s/files/1/0557/1824/8604/products/theycallmelocksmith_5013_1000x.jpg?v=1620991032",
    parent: "Женская одежда",
    name: "Топы",
  },
  {
    id:'42325242524',
    image:
      "https://cdn.shopify.com/s/files/1/0557/1824/8604/products/theycallmelocksmith_5013_1000x.jpg?v=1620991032",
    parent: "Женская одежда",
    name: "Топы",
  },
];

const CategoriesList: FC = (): JSX.Element => {
  return (
    <>
      <h1 className={styles.title}>Наша продукция</h1>
      <Row className={styles.list}>
        {categories.map((category) => (
          <Col className={styles.listCard} xs={24} md={12} lg={12} xl={8}>
            <div className={styles.cardWrapper}>
              <img className={styles.cardImage} src={category.image} />
              <div className={styles.cardTitle}>
                <h3>{category.parent}</h3>
                <h1>{category.name}</h1>
                <NavLink href={`${RouteHrefs.CATEGORY}/${category.id}`}>
                  <Button type="text" className={styles.titleButton}>
                    Показать товары
                  </Button>
                </NavLink>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoriesList;
