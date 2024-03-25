export const PROFILE_BASE_PATH = 'profile'
export const ACCOUNT_BASE_PATH = `${PROFILE_BASE_PATH}/account`

export const NAVIGATIONS = [
  { name: 'Account information', pathName: `/${PROFILE_BASE_PATH}` },
  { name: 'Update information', pathName: `/${ACCOUNT_BASE_PATH}/update-information` },
  { name: 'Update email', pathName: `/${ACCOUNT_BASE_PATH}/update-email` },
]