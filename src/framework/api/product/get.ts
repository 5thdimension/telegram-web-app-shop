/* eslint-disable implicit-arrow-linebreak */
import { TypeListProducts } from "@framework/types";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string";

import Api from "../utils/api-config";

interface Props {
  name?: string;
  sortBy?: "product_name" | "";
  order?: "asc";
  limit?: number;
  page?: number;
  categoryId?: number;
}
const fetch = async ({ queryKey }: any) => {
  const [_key, categoryId, limit, name, order, page, sortBy] = queryKey;
  const { data } = await Api.get(
    `/products?${qs.stringify({
      categoryId,
      limit,
      name,
      order,
      page,
      sortBy
    })}`
  );
  return data as TypeListProducts;
};

export const useGetProducts = ({
  categoryId,
  limit = 10,
  name,
  order = "asc",
  page = 1,
  sortBy
}: Props) =>
  useQuery<TypeListProducts>(
    ["products", categoryId, limit, name, order, page, sortBy],
    fetch
  );
