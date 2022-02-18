import axios, { AxiosPromise, AxiosResponse } from "axios";
import settings from "settings";
import { Category } from "types/categories";

export const getCategoriesListApi = async (): Promise<Category[]> => {
  const { data }: AxiosResponse<Category[]> = await axios.get(
    `${settings.apiUrl}/categories`
  );

  return data;
};

export const getCategoryByIdApi = async (id: string): Promise<Category> => {
  const { data }: AxiosResponse<Category> = await axios.get(
    `${settings.apiUrl}/categories/${id}`
  );

  return data;
};
