import { Col, Row } from "antd";
import { FC } from "react";
import styles from "./styles/categoriesList.module.scss";
import { useAppSelector } from "hooks/useAppSelector";
import { Category } from "types/categories";
import { getSubcategories } from "../../../utils/getSubcategories";
import CategoryCard from "../CategoryCard";
import Spinner from "components/common/Spinner";
import { SpinnerSizeType } from "components/common/Spinner/constants";

const CategoriesList: FC = (): JSX.Element => {
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const subcategories: Category[] = getSubcategories(categories);

  if (loading || error) {
    return <Spinner size={SpinnerSizeType.LARGE} />;
  }

  return (
    <>
      <h1 className={styles.title}>Наша продукция</h1>
      <Row>
        {subcategories.map((subcategory) => (
          <Col key={subcategory.id} xs={24} md={12} lg={12} xl={8}>
            <CategoryCard data={subcategory} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoriesList;
