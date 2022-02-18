import { Category } from "types/categories";

export const getSubcategories = (categories: Category[]): Category[] => {
  const subcategories: Category[] = [];

  categories.forEach((category) => {
    category.children.forEach((child) => {
      subcategories.push({ ...child, parent: category.name });
    });
  });

  return subcategories;
};
