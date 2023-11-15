// BASE
export const ADMIN_ROLES = ['admin_tier_1', 'admin_tier_2']
export const BASE_ADMIN_ROLES = ADMIN_ROLES

export const BASE_PATH = '/admin'
export const ADMIN_OPERATIONS_BASE_PATH = `${BASE_PATH}/operations`
export const ADMIN_TABLES_BASE_PATH = `${BASE_PATH}/tables`

export const NAVIGATION_OPERATIONS = {
  addSubAdmin: { name: 'Add sub-admin', pathName: `${ADMIN_OPERATIONS_BASE_PATH}/add-sub-admin`, adminRolesPermitted: ['admin_tier_1'] },
  addProduct: { name: 'Add product', pathName: `${ADMIN_OPERATIONS_BASE_PATH}/add-product`, adminRolesPermitted: ['admin_tier_1'] },
  addProductVariant: { name: 'Add product variant', pathName: `${ADMIN_OPERATIONS_BASE_PATH}/add-product-variant`, adminRolesPermitted: ['admin_tier_1'] },
  editProduct: { name: 'Edit product', pathName: `${ADMIN_OPERATIONS_BASE_PATH}/edit-product`, adminRolesPermitted: [...BASE_ADMIN_ROLES] },
}

export const NAVIGATION_TABLES = {
  admins: { name: 'Admins', pathName: `${ADMIN_TABLES_BASE_PATH}/admins`, adminRolesPermitted: [...BASE_ADMIN_ROLES] },
  users: { name: 'Users', pathName: `${ADMIN_TABLES_BASE_PATH}/users`, adminRolesPermitted: [...BASE_ADMIN_ROLES] },
  products: { name: 'Products', pathName: `${ADMIN_TABLES_BASE_PATH}/products`, adminRolesPermitted: [...BASE_ADMIN_ROLES] },
  productPostings: { name: 'Product postings', pathName: `${ADMIN_TABLES_BASE_PATH}/product-postings`, adminRolesPermitted: [...BASE_ADMIN_ROLES] },
  productVariants: { name: 'Product variants', pathName: `${ADMIN_TABLES_BASE_PATH}/product-variants`, adminRolesPermitted: [...BASE_ADMIN_ROLES] },
}

// FORMS
export const MAX_FILE_SIZE_IN_MB = 5 * 1000000

export const PRODUCT_CATEGORIES = [
  { name: 'Earrings', value: 'earrings' },
  { name: 'Necklaces', value: 'necklaces' },
  { name: 'Bracelets', value: 'bracelets' },
  { name: 'Rings', value: 'rings' },
]
