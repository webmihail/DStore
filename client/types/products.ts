import { Brand } from "./brands";
import { ProductInfo } from "./productsInfo";
import { ProductType } from "./productTypes";
import { Sale } from "./sales";
import { Comment } from "./comments";
import { Rating } from "./ratings";

export interface Product {
  id: string;
  name: string;
  price: number;
  productType: ProductType;
  brand: Brand;
  sale: Sale;
  productsInfo: ProductInfo[];
  comments: Comment[];
  ratings: Rating[];
}
