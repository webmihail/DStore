import ImageEntity from "./images";
import { Product } from "./products";
import { ProductType } from "./productTypes";

export interface Category {
  id: string;
  name: string;
  children: Category[];
  parent: Category;
  image: ImageEntity;
  products: Product[];
  productTypes: ProductType[];
}