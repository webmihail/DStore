import { Color } from "./colors";
import ImageEntity from "./images";
import { Product } from "./products";
import { Sale } from "./sales";
import { Size } from "./sizes";

export interface ProductInfo {
  id: string;
  title: string;
  description: string;
  code: string;
  inStock: boolean;
  count: number;
  images: ImageEntity[];
  size: Size;
  color: Color;
  product: {
    id: string;
    name: string;
    price: number;
    sale: Sale;
  }
}