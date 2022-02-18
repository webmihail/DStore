import CategoriesList from "components/categories/CategoriesList";
import Slider from "components/common/Slider";
import type { NextPage } from "next";
import AppLayout from "../components/common/AppLayout";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Slider />
      <CategoriesList />
    </AppLayout>
  );
};

export default Home;
