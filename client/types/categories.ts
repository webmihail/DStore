import ImageEntity from "./images";
import { Product } from "./products";
import { ProductType } from "./productTypes";

export interface Category {
  id: string;
  name: string;
  children: Subcategory[];
  image: ImageEntity;
}

export interface Subcategory {
  id: string;
  name: string;
  image: ImageEntity;
  products: Product[];
  productTypes: ProductType[];
  parent: string;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: boolean;
}

export interface CategoryState {
  category: Subcategory | Category | null;
  loading: boolean;
  error: boolean;
}

export interface CategoriesLoadAction {
  type: string;
  payload: CategoriesState;
}

export interface CategoryAction {
  type: string;
  payload: CategoryState;
}

export interface CategoryLoadAction {
  type: string;
  payload: string;
}
