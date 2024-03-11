import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

// App imports
import getQueryClient from "@services/shared/getQueryClient";
import { queryProductById } from "@constants/shared/queries";
import Breadcrumbs from "@components/collection/shared/Breadcrumbs";
import { getUserStateServer } from "@services/authentication/getUserStateServer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Badge } from "@components/ui/badge";

type ProductViewParams = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id: productId } }: ProductViewParams) {
  const queryClient = getQueryClient();
  const authenticatedUser = await getUserStateServer();
  const { data: product, error } = await queryClient.fetchQuery(queryProductById(productId));
  const productVariants = product?.product_variants?.filter((variant) => variant.is_displayed === true);

  if (!product || !productVariants?.[0] || error) {
    return notFound();
  }

  const breadcrumbs = [
    { label: "Collection", link: "/collection" },
    { label: product.category, link: `/collection/${product?.category}s` },
    { label: product.name, link: `/collection/product/${productId}` },
  ];

  return (
    <>
      <div className="px-2 hidden sm:block">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <div className="">
        <Tabs defaultValue={productVariants[0].id}>
          <div className="grid grid-cols-12 gap-5 sm:gap-10 md:mt-4 md:gap-12 lg:gap-14">
            <div className="col-span-12  sm:col-span-7 md:col-span-8">
              <div className="md:mb-16">
                {productVariants.map((productVariant) => (
                  <TabsContent
                    value={productVariant.id}
                    key={`TabContentImageList-${productVariant.id}`}
                    className="relative"
                  >
                    <div className="block absolute z-[2] bottom-0 left-0 right-0 sm:hidden">
                      <div className="w-full bg-gradient-to-t from-black h-[70px] opacity-30 rounded-br-xl rounded-bl-xl">
                        <div className="h-full flex w-full justify-center items-center"></div>
                      </div>
                    </div>
                    <div className="overflow-y-auto h-[300px] rounded-xl sm:h-full">
                      <div className={`flex flex-col sm:block sm:columns-1 `}>
                        {productVariant.images_public_url?.map((variantImagePublicUrl, index) => (
                          <Image
                            alt=""
                            className={"rounded-xl w-full"}
                            width={1000}
                            height={1000}
                            src={variantImagePublicUrl}
                            key={`TabContentImage-${productVariant.id}-${index}`}
                          />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
            <div className="col-span-12  sm:col-span-5 md:col-span-4">
              <div className="px-4 sm:px-0 sm:sticky sm:top-20">
                {productVariants.map((productVariant, index) => (
                  <TabsContent value={productVariant.id} key={`TabContent-${productVariant.id}-${index}`}>
                    <div className="flex justify-start mb-3 gap-2 sm:mb-6">
                      <Badge className={"capitalize"}>{product.category}</Badge>
                      <Badge className={""}>{`${productVariants.length} variant(s)`}</Badge>
                    </div>

                    <div className="space-y-2 md:space-y-5">
                      <div id="productHeader" className="text-start">
                        <h2 className="text-2xl font-bold mb-1 capitalize lg:text-3xl">{product.name}</h2>
                        <h4 className="text-sm opacity-50">{`${productVariant.id}`}</h4>
                        <h4 className="text-sm text-muted-foreground">
                          <span className="font-semibold">In stock: </span>
                          {productVariant.quantity.toLocaleString()}
                        </h4>
                      </div>

                      {productVariant.discount_rate > 0 && (
                        <>
                          <div className="">
                            <p className="">
                              <span className="font-semibold">Original price: </span>
                              {`₱ ${productVariant.price.toLocaleString()}`}
                            </p>
                            <p>
                              <span className="font-semibold">Discount: </span>
                              {productVariant.discount_rate}% off
                            </p>
                          </div>
                        </>
                      )}

                      <div id="productVariantSpecification" className="text-md">
                        <p>
                          <span className="opacity-50 ">Material: </span>
                          <span className="">{productVariant.material}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Material property: </span>
                          <span className="">{productVariant.material_property}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Size: </span>
                          <span className="">{productVariant.size ?? "--"}</span>
                        </p>
                        <p>
                          <span className="opacity-50 ">Weight: </span>
                          <span className="">{productVariant.weight ?? "--"}</span>
                        </p>
                      </div>

                      <div id="product.description">
                        <p className="whitespace-pre-wrap">{product.description}</p>
                      </div>
                    </div>

                    {productVariants.length > 1 && (
                      <>
                        <div className="my-6">
                          <div className="">
                            <TabsList className={"bg-background flex justify-start flex-wrap gap-1 w-full h-max px-0"}>
                              {productVariants.map((productVariant, index) => (
                                <TabsTrigger
                                  key={`TabTrigger-${productVariant.id}`}
                                  value={productVariant.id}
                                  className={
                                    "px-3 rounded-lg transition-all ease-in-out duration-500 border border-secondary hover:bg-secondary data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:border-primary"
                                  }
                                >
                                  {productVariant.material}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                          </div>
                        </div>
                      </>
                    )}

                    {authenticatedUser && (
                      <>
                        <div className="mt-8 border-t py-4 space-y-4">
                          {/* <ProductViewActions
                            userState={{ userStateAuth, userStateGeneral }}
                            product={product}
                            productVariant={productVariant}
                          /> */}
                        </div>
                      </>
                    )}
                  </TabsContent>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
