import { Color } from "./colors";
import ImageEntity from "./images";
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
}