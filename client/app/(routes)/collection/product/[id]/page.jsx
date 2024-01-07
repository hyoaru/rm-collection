import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

// App imports
import getProductById from '@services/collection/getProductById'
import Breadcrumbs from '@components/shared/Breadcrumbs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import Separator from '@components/shared/Separator'
import { Badge } from '@components/ui/badge'
import getRandomProducts from '@services/collection/getRandomProducts'
import SuggestionProductCard from '@components/collection/SuggestionProductCard'
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area'
import ProductViewActions from '@components/collection/ProductViewActions'
import { getUserStateServer } from '@services/authentication/getUserStateServer'

export default async function Page({ params }) {
  const { id: productId } = params
  const { userStateAuth, userStateGeneral } = await getUserStateServer()
  const { data: product, error } = await getProductById({ productId: productId })
  const { data: randomProducts, error: randomProductsError } = await getRandomProducts()
  const productVariants = product?.product_variants?.filter((productVariant) => productVariant.is_displayed === true)

  const breadcrumbs = [
    { label: "Collection", link: "/" },
    { label: product?.category, link: `/collection/${product?.category}` },
    { label: product?.name, link: `/collection/product/${productId}` }
  ]

  if (!productVariants?.[0] || error) {
    return notFound()
  }

  return (
    <>
      <div className="hidden mx-auto px-4 mb-8 sm:block md:container">
        <div className="px-2">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className="md:container mx-auto px-4 mb-8">
        <Tabs defaultValue={productVariants[0].id}>
          <div className="grid grid-cols-12 mt-4 gap-5 sm:gap-10 md:gap-12 lg:gap-14">
            <div className="col-span-12 order-last sm:order-first sm:col-span-7 md:col-span-8">
              {productVariants.map((productVariant) => {
                return productVariant.images_public_url.map((variantImagePublicUrl, index) => (
                  <TabsContent
                    value={productVariant.id}
                    key={`TabContentImage-${productVariant.id}-${index}`}
                  >
                    <div className={`columns-1`}>
                      <Image
                        alt=''
                        className={'rounded-tl-xl rounded-br-xl w-full'}
                        width={1000}
                        height={1000}
                        src={variantImagePublicUrl}
                      />
                    </div>
                  </TabsContent>
                ))
              })}
            </div>
            <div className="col-span-12 order-first sm:order-last sm:col-span-5 md:col-span-4">
              <div className="sm:sticky sm:top-20">
                {productVariants.length > 1 && <>
                  <div className="mb-4">
                    <Separator>
                      <div className="flex items-center">
                        <TabsList className={'bg-background'}>
                          {productVariants.map((productVariant, index) => (
                            <TabsTrigger
                              key={`TabTrigger-${productVariant.id}`}
                              value={productVariant.id}
                              className={'px-5 transition-all ease-in-out duration-500 hover:bg-secondary data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground'}
                            >
                              {index}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                    </Separator>
                  </div>
                </>}

                {productVariants.map((productVariant, index) => (
                  <TabsContent value={productVariant.id} key={`TabContent-${productVariant.id}-${index}`}>
                    <div className="flex justify-center sm:justify-start mb-8 gap-2">
                      <Badge className={'capitalize'}>{product.category}</Badge>
                      <Badge className={''}>{`${productVariants.length} variant(s)`}</Badge>
                    </div>

                    <div className="space-y-5">
                      <div id="productHeader" className='text-center sm:text-start'>
                        <h2 className="text-3xl font-bold mb-1">{product.name}</h2>
                        <h4 className="text-sm text-muted-foreground">{`${productVariant.id}`}</h4>
                        <h4 className="text-sm text-muted-foreground">
                          <span className='font-semibold'>In stock: </span>
                          {productVariant.quantity.toLocaleString()}
                        </h4>
                      </div>

                      {productVariant.discount_rate > 0 && <>
                        <div className="">
                          <p className="">
                            <span className='font-semibold'>Original price: </span>
                            {`₱ ${productVariant.price.toLocaleString()}`}
                          </p>
                          <p>
                            <span className='font-semibold'>Discount: </span>
                            {productVariant.discount_rate}% off
                          </p>
                        </div>
                      </>}

                      <div id='productVariantSpecification' className="text-md">
                        <p>
                          <span className='text-muted-foreground'>Material: </span>
                          {productVariant.material}
                        </p>
                        <p>
                          <span className='text-muted-foreground'>Material property: </span>
                          {productVariant.material_property}
                        </p>
                      </div>

                      <div id="product.description">
                        <p>{product.description}</p>
                      </div>
                    </div>

                    {(userStateAuth && userStateGeneral) && <>
                      <div className="mt-8 border-t py-4 space-y-4">
                        <ProductViewActions
                          userState={{ userStateAuth, userStateGeneral }}
                          product={product}
                          productVariant={productVariant}
                        />
                      </div>
                    </>}
                  </TabsContent>
                ))}
              </div>
            </div>
          </div>
        </Tabs>

        {randomProducts?.[0] && <div className="">
          <Separator>
            <h3 className="text-center my-16 text-lg text-muted-foreground">Other jewelries you might like</h3>
          </Separator>

          <ScrollArea className={'whitespace-nowrap rounded-lg mb-10'}>
            <div className="flex w-full space-x-4 pb-2 justify-center">
              {randomProducts.map((randomProduct, index) => (
                <div className="overflow-hidden w-max rounded-lg" key={`RandomProduct-${randomProduct.id}`}>
                  <SuggestionProductCard product={randomProduct} />
                </div>
              ))}
            </div>
            <ScrollBar orientation={'horizontal'} />
          </ScrollArea>
        </div>}
      </div>
    </>
  )
}
