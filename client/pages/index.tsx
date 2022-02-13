import CategoriesList from "components/categories/CategoriesList";
import Slider from "components/common/Slider";
import { useActions } from "hooks/useActions";
import { useInjectSaga } from "hooks/useInjectSaga";
import type { NextPage } from "next";
import { useEffect } from "react";
import { getAllCategoriesSaga } from "store/sagas/categories/getaAllCategories";
import AppLayout from "../components/common/AppLayout";

const Home: NextPage = () => {
  const { getAllCategories } = useActions();
  useInjectSaga("getAllCategoriesSaga", getAllCategoriesSaga);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <AppLayout>
      <Slider />
      <CategoriesList />
    </AppLayout>
  );
};

export default Home;
