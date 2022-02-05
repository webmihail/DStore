import CategoriesList from "components/CategoriesList";
import Slider from "components/Slider";
import type { NextPage } from "next";
import AppLayout from "../components/AppLayout";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Slider />
      <CategoriesList />
    </AppLayout>
  );
};

export default Home;
