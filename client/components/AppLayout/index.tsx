import Head from "next/head";
import { FC } from "react";
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
        <title>{title || "UniqTM"}</title>
        <meta
          name="description"
          content={`UniqTM. Створений робити людей унікальними! ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Одяг, чоловічий одяг, жіночій одяг"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
