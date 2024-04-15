export const PROFILE_BASE_PATH = 'profile'
export const ACCOUNT_BASE_PATH = `${PROFILE_BASE_PATH}/account`
export const SHIPPING_ADDRESS_BOOK_BASE_PATH = `${PROFILE_BASE_PATH}/shipping-address-book`

export const NAVIGATION_ACCOUNT = [
  { name: 'Account information', pathName: `/${PROFILE_BASE_PATH}` },
  { name: 'Update information', pathName: `/${ACCOUNT_BASE_PATH}/update-information` },
  { name: 'Update email', pathName: `/${ACCOUNT_BASE_PATH}/update-email` },
]

export const NAVIGATION_SHIPPING_ADDRESS_BOOK = [
  { name: 'Address book', pathName: `/${SHIPPING_ADDRESS_BOOK_BASE_PATH}` },
  { name: 'Add address', pathName: `/${SHIPPING_ADDRESS_BOOK_BASE_PATH}/add-address` },
  { name: 'Update address', pathName: `/${SHIPPING_ADDRESS_BOOK_BASE_PATH}/update-address` },
]