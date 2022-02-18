import { FC } from "react";
import { ProductCardOwnProps } from "./types";
import styles from "./styles/productCard.module.scss";
import NavLink from "components/common/NavLink";
import { RouteHrefs } from "../../../constants";

const ProductCard: FC<ProductCardOwnProps> = ({ data }): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <NavLink href={`${RouteHrefs.PRODUCTS}/${data.id}`}>
        <div className={styles.cardContent}>
          <img className={styles.cardFirstImage} src={data.images[0].url} />
          <img className={styles.cardSecondImage} src={data.images[1].url} />
        </div>
        <div className={styles.cardTitle}>
          <h3 className={styles.cardTitleName}>
            {data.product.name} {data.color?.name}
          </h3>
          <span className={styles.cardTitlePrice}>{data.product.price} &#8372;</span>
        </div>
      </NavLink>
    </div>
  );
};

export default ProductCard;
