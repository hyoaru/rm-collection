export const ITEMS_PER_PAGE = 50

export function getPagination({ page }) {
  const itemsPerPage = ITEMS_PER_PAGE
  const limit = itemsPerPage ? +itemsPerPage : 3
  const from = page ? page * limit : 0
  const to = page ? from + itemsPerPage - 1 : itemsPerPage - 1

  return { from, to, itemsPerPage }
}