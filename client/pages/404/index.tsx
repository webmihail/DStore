import { ImagePaths, RouteHrefs } from "../../constants";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "./styles/notFound.module.scss";
import { Button } from "antd";
import NavLink from "components/NavLink";

const NotFoundPage: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Page 404</title>
      </Head>
      <img
        className={styles.logo}
        src={ImagePaths.UNIQ_YOU_NOT_FOUND_LOGO}
        alt="Not found page logo"
      />
      <h2>404 | Такой страницы не существует!</h2>
      <NavLink className={styles.button} href={RouteHrefs.HOME}>
        <Button>Вернуться на главную страницу</Button>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
