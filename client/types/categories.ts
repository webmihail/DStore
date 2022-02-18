import ImageEntity from "./images";
import { Product } from "./products";
import { ProductType } from "./productTypes";

export interface Category {
  id: string;
  name: string;
  children: Category[];
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
  category: Category | null;
  loading: boolean;
  error: boolean;
}

export interface CategoriesSuccessAction {
  type: string;
  payload: CategoriesState;
}

export interface CategorySuccessAction {
  type: string;
  payload: CategoryState;
}

export interface CategoriesLoadAction {
  type: string;
  payload: {
    loading: boolean;
  };
}

export interface CategoryLoadAction {
  type: string;
  payload: {
    id: string;
    loading: boolean;
  };
}

export interface ErrorAction {
  type: string;
  payload: {
    error: boolean;
  };
}
