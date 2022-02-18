import { FC } from "react";
import { Carousel } from "antd";
import styles from "./styles/slider.module.scss";

const images = [
  {
    url: "https://www.gentlemansgazette.com/wp-content/uploads/2015/11/Chelsea-Boots-2100x800.jpg",
  },
  {
    url: "https://www.gentlemansgazette.com/wp-content/uploads/2015/11/Chelsea-Boots-2100x800.jpg",
  },
  {
    url: "https://www.gentlemansgazette.com/wp-content/uploads/2015/11/Chelsea-Boots-2100x800.jpg",
  },
];

const Slider: FC = (): JSX.Element => {
  return (
    <Carousel className={styles.slider} autoplay>
      {images.map((image, index) => (
        <img
          className={styles.content}
          key={index + image.url}
          src={image.url}
          alt="slide"
        />
      ))}
    </Carousel>
  );
};

export default Slider;
