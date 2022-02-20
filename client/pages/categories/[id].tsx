import { FC } from "react";
import AppLayout from "components/common/AppLayout";
import ProductsList from "components/products/ProductsList";

const Category: FC = (): JSX.Element => {
  return (
    <AppLayout>
      <ProductsList />
    </AppLayout>
  );
};

export default Category;
