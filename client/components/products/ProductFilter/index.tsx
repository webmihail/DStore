import { PlusCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import AppButton from "components/common/AppButton";
import styles from "./styles/productFilter.module.scss";

const ProductFilter = () => {
  return (
    <div className={styles.wrapper}>
      <AppButton className={styles.button}>
        <PlusCircleOutlined className={styles.buttonIcon} />
        Добавить продукт
      </AppButton>
      <Input className={styles.search} placeholder="Ведите название..." />
    </div>
  );
};

export default ProductFilter;
