import addProduct from "@services/admin/operations/addProduct";
import addProductVariant from "@services/admin/operations/addProductVariant";
import addProductThumbnail from "@services/admin/operations/addProductThumbnail";
import addProductVariantImages from "@services/admin/operations/addProductVariantImages";

type AddProductWithVariantParams = {
  product: {
    name: string
    description: string
    category: string
    thumbnail: FileList
  }
  productVariant: {
    material: string
    materialProperty: string
    quantity: number
    price: number
    discountRate: number
    size: string | null
    images: FileList
  }
}

type Response = {
  data: any
  error: any
}

export default async function addProductWithVariant({ product, productVariant }: AddProductWithVariantParams) {
  let response: Response = { data: null, error: null }

  // Add product and thumbnail
  await addProduct({
    name: product.name,
    description: product.description,
    category: product.category
  })
    .then(async ({ data: addProductData, error: addProductError }) => {
      if (addProductError || !addProductData) {
        return response = { data: addProductData, error: addProductError }
      }

      const { data, error } = await addProductThumbnail({
        thumbnail: product.thumbnail,
        productId: addProductData.id
      })

      response = { data: addProductData, error: error }
    })

  if (response.error) {
    return response
  }

  // Add product variant and images
  await addProductVariant({
    product: { id: response.data.id },
    productVariant: {
      material: productVariant.material,
      materialProperty: productVariant.materialProperty,
      size: productVariant.size,
      quantity: productVariant.quantity,
      price: productVariant.price,
      discountRate: productVariant.discountRate
    }
  })
    .then(async ({ data: addProductVariantData, error: addProductVariantError }) => {
      if (addProductVariantError || !addProductVariantData) {
        return response = { data: addProductVariantData, error: addProductVariantError }
      }

      const { data, error } = await addProductVariantImages({
        images: productVariant.images,
        product: { id: addProductVariantData.product_id },
        productVariant: { id: addProductVariantData.id }
      })

      response = { data: addProductVariantData, error }
    })

  return response
}