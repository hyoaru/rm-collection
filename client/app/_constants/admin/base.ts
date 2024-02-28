// BASE
export const ADMIN_ROLES = ['admin_tier_1', 'admin_tier_2']
export const BASE_ADMIN_ROLES = ADMIN_ROLES

export const BASE_PATH = '/admin'
export const ADMIN_OPERATIONS_BASE_PATH = `${BASE_PATH}/operations`
export const ADMIN_TABLES_BASE_PATH = `${BASE_PATH}/tables`

export const NAVIGATION_OPERATIONS = {
  addSubAdmin: {
    name: 'Add sub-admin',
    pathName: `${ADMIN_OPERATIONS_BASE_PATH}/add-sub-admin`,
    adminRolesPermitted: ['admin_tier_1']
  },
  addProduct: {
    name: 'Add product',
    pathName: `${ADMIN_OPERATIONS_BASE_PATH}/add-product`,
    adminRolesPermitted: BASE_ADMIN_ROLES
  },
  addProductVariant: {
    name: 'Add product variant',
    pathName: `${ADMIN_OPERATIONS_BASE_PATH}/add-product-variant`,
    adminRolesPermitted: BASE_ADMIN_ROLES
  },
  editProduct: {
    name: 'Edit product',
    pathName: `${ADMIN_OPERATIONS_BASE_PATH}/edit-product`,
    adminRolesPermitted: BASE_ADMIN_ROLES
  },
  editProductVariant: {
    name: 'Edit product variant',
    pathName: `${ADMIN_OPERATIONS_BASE_PATH}/edit-product-variant`,
    adminRolesPermitted: BASE_ADMIN_ROLES
  },
}

export const NAVIGATION_TABLES = {
  orders: { 
    name: 'Orders', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/orders`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
  admins: { 
    name: 'Admins', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/admins`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
  users: { 
    name: 'Users', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/users`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
  products: { 
    name: 'Products', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/products`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
  productPostings: { 
    name: 'Product postings', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/product-postings`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
  productVariants: { 
    name: 'Product variants', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/product-variants`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
  adminLogs: { 
    name: 'Admin logs', 
    pathName: `${ADMIN_TABLES_BASE_PATH}/admin-logs`, 
    adminRolesPermitted: BASE_ADMIN_ROLES 
  },
}