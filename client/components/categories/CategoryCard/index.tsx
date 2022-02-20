import NavLink from "components/common/NavLink";
import { RouteHrefs } from "../../../constants";
import { FC } from "react";
import styles from "./styles/categoryCard.module.scss";
import AppButton from "components/common/AppButton";
import { CategoryCardOwnProps } from "./types";

const CategoryCard: FC<CategoryCardOwnProps> = ({ data }): JSX.Element => {
  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImage} src={data.image?.url} />
      <div className={styles.cardTitle}>
        <h3>{data.parent}</h3>
        <h1>{data.name}</h1>
        <NavLink href={`${RouteHrefs.CATEGORIES}/${data.id}`}>
          <AppButton type="WHITE" className={styles.cardButton}>
            Показать товары
          </AppButton>
        </NavLink>
      </div>
    </div>
  );
};

export default CategoryCard;
