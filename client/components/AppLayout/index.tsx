import Head from "next/head";
import { FC } from "react";
import Header from "../Header";
import { AppLayoutOwnProps } from "./types";

const AppLayout: FC<AppLayoutOwnProps> = ({
  children,
  title,
  description,
  keywords,
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title || "UniqYou"}</title>
        <meta
          name="description"
          content={`UniqTM. CСоздан делать людей уникальными! ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={
            keywords ||
            "Одежда, мужская одежда, женская одежда, детская одежда, спортивные костюмы, сумки"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
