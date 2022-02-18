import { Product } from "types/products";
import { ProductInfo } from "types/productsInfo";

export const getProductsInfo = (products: Product[]): ProductInfo[] => {
  const productsInfo: ProductInfo[] = [];

  products.forEach((product) => {
    product.productsInfo.forEach((productInfo) => {
      productsInfo.push({
        ...productInfo,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          sale: product.sale,
        },
      });
    });
  });

  return productsInfo;
};
