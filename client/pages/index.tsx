import SubcategoriesList from "components/categories/SubcategoriesList";
import Slider from "components/common/Slider";
import type { NextPage } from "next";
import AppLayout from "../components/common/AppLayout";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Slider />
      <SubcategoriesList />
    </AppLayout>
  );
};

export default Home;
