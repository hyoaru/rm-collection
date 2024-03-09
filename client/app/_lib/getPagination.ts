import { ITEMS_PER_PAGE as itemsPerPage } from "@constants/shared/constants";

export default function getPagination({ page }: { page: number }) {
  const limit = itemsPerPage ? itemsPerPage : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + itemsPerPage - 1 : itemsPerPage - 1;

  return { from, to, itemsPerPage };
}
