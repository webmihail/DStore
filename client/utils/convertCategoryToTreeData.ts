import { TreeData } from "components/common/AppTree/types";
import { Category } from "types/categories";

export const convertCategoryToTreeData = (
  categories: Category[]
): TreeData[] => {
  const tree: TreeData[] = categories.map((category) => {
    return {
      key: category.id,
      title: category.name,
      children: category.children.map((subcategory) => {
        return {
          key: subcategory.id,
          title: subcategory.name,
        };
      }),
    };
  });

  return tree;
};
