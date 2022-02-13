import { Category, Subcategory } from "types/categories";

export const getSubcategories = (categories: Category[]): Subcategory[] => {
  const subcategories: Subcategory[] = [];

  categories.forEach((category) => {
    category.children.forEach((child) => {
      subcategories.push({ ...child, parent: category.name });
    });
  });

  return subcategories;
};
