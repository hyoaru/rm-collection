export const ACCOUNT_BASE_PATH = '/account'

export const NAVIGATIONS = [
  { name: 'Account information', pathName: ACCOUNT_BASE_PATH },
  { name: 'Update information', pathName: `${ACCOUNT_BASE_PATH}/update-info` },
  { name: 'Change password', pathName: `${ACCOUNT_BASE_PATH}/change-password` },
  { name: 'Change email', pathName: `${ACCOUNT_BASE_PATH}/change-email` },
]