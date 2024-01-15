export const ORDERS_BASE_PATH = '/orders'

export const NAVIGATIONS = [
  { name: 'All orders', pathName: ORDERS_BASE_PATH },
  { name: 'Pending orders', pathName: `${ORDERS_BASE_PATH}/status/pending` },
  { name: 'Cancelled orders', pathName: `${ORDERS_BASE_PATH}/status/cancelled` },
  { name: 'Completed orders', pathName: `${ORDERS_BASE_PATH}/status/completed` },
]