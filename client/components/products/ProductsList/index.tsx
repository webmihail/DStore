import { Col, Row } from "antd";
import ProductCard from "components/products/ProductCard";
import { useActions } from "hooks/useActions";
import { useAppSelector } from "hooks/useAppSelector";
import { useInjectSaga } from "hooks/useInjectSaga";
import { NextRouter, useRouter } from "next/router";
import { FC, useEffect } from "react";
import { getCategorySaga } from "store/sagas/categories/getCategory";
import { getProductsInfo } from "utils/getProductsInfo";
import ProductFilter from "../ProductFilter";
import styles from './styles/productList.module.scss'

const ProductsList: FC = (): JSX.Element => {
  useInjectSaga("getCategorySaga", getCategorySaga);
  const router: NextRouter = useRouter();
  const { category } = useAppSelector((state) => state.category);
  const { getCategory } = useActions();
  const { id } = router.query;
  const productsInfo = category?.products && getProductsInfo(category.products);

  useEffect(() => {
    id && getCategory({ id: id as string, loading: true });
  }, [id]);

  return (
    <>
      <h2 className={styles.title}>{category?.name}</h2>
      <ProductFilter />
      <Row>
        {productsInfo?.map((productInfo) => (
          <Col key={productInfo.id} xs={24} md={12} lg={8} xl={6}>
            <ProductCard data={productInfo} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductsList;
