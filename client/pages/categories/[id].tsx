import AppLayout from "components/common/AppLayout";
import { useActions } from "hooks/useActions";
import { useInjectSaga } from "hooks/useInjectSaga";
import { NextRouter, useRouter } from "next/router";
import { FC, useEffect } from "react";
import { getCategorySaga } from "store/sagas/categories/getCategory";

const Category: FC = (): JSX.Element => {
  useInjectSaga("getCategorySaga", getCategorySaga);
  const router: NextRouter = useRouter();
  const { getCategory } = useActions();
  const { id } = router.query;

  useEffect(() => {
    id && getCategory(id as string);
  }, [id]);

  return (
    <AppLayout>
      <div>{id}</div>
    </AppLayout>
  );
};

export default Category;
