"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown } from "lucide-react"

// App imports
import { Button } from "@components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area"
import { useToast } from "@components/ui/use-toast"
import revalidateAllData from "@services/shared/revalidateAllData"
import { PRODUCT_CATEGORIES as productCategories, MAX_FILE_SIZE_IN_MB } from "@constants/admin"
import ProductListCombobox from "@components/admin/operations/shared/ProductListCombobox"
import ProductVariantListCombobox from "@components/admin/operations/shared/ProductVariantListCombobox"
import getProductVariantImagesPublicUrl from "@services/admin/shared/getProductVariantImagesPublicUrl"
import useUpdateProductVariant from "@hooks/admin/operations/useUpdateProductVariant"

export default function EditProductVariantForm(props) {
  const { productList, productVariantList } = props

  const [productListComboboxOpen, setProductListComboboxOpen] = useState(false)
  const [productListComboboxValue, setProductListComboboxValue] = useState()
  const [selectedProduct, setSelectedProduct] = useState()
  const [productVariantListComboboxOpen, setProductVariantListComboboxOpen] = useState(false)
  const [productVariantListComboboxValue, setProductVariantListComboboxValue] = useState()
  const [selectedProductVariant, setSelectedProductVariant] = useState()

  const [imagesSrc, setImagesSrc] = useState()
  const { updateProductVariant, isLoading } = useUpdateProductVariant()
  const { toast } = useToast()

  const formSchema = z.object({
    name: z.string().trim().min(4).max(70),
    category: z.string().refine((value) => value?.length !== 0, `Category is required`),
    description: z.string().trim().min(10).max(800),
    quantity: z.coerce.number(),
    price: z.coerce.number(),
    material: z.string().trim().min(4).max(50),
    materialProperty: z.string().trim().min(2).max(50),
    images: z.any()
      .refine((files) => {
        if (files.length === 0) { return true }
        return Array.from(files)?.length <= 4
      }, `You can only select up to 4 images`)
      .refine((files) => {
        if (files.length === 0) { return true }
        return files[0]?.size <= MAX_FILE_SIZE_IN_MB
      }, `Max image size is 5MB.`),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      quantity: '',
      price: '',
      material: '',
      materialProperty: '',
      images: ''
    }
  })

  async function onSubmit(data) {
    await updateProductVariant({
      productId: selectedProduct.id,
      variantId: selectedProductVariant.id,
      material: data.material,
      materialProperty: data.materialProperty,
      quantity: data.quantity,
      price: data.price,
      images: data.images
    })
      .then(({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          toast({
            title: "Product has been updated successfully.",
            description: "Changes will take effect shortly."
          })

          emptyFormFields()
          setProductListComboboxValue(null)
          setProductVariantListComboboxValue(null)
        }

      })

    await revalidateAllData()
  }

  function emptyFormFields() {
    document.querySelector('#imagesInput').value = null
    setImagesSrc(null)

    form.reset({
      name: '',
      category: '',
      description: '',
      price: '',
      quantity: '',
      material: '',
      materialProperty: '',
      images: ''
    })
  }

  function onSelectedProductChange(product) {
    setSelectedProduct(product)
    emptyFormFields()
    setProductVariantListComboboxValue(null)
  }

  async function onSelectedProductVariantChange(productVariant) {
    setSelectedProductVariant(productVariant)
    document.querySelector('#imagesInput').value = null

    if (productVariant) {
      form.reset({
        name: selectedProduct.name,
        category: selectedProduct.category,
        description: selectedProduct.description,
        price: productVariant.price,
        quantity: productVariant.quantity,
        material: productVariant.material,
        materialProperty: productVariant.material_property,
        images: ''
      })

      const productVariantImagesPublicUrl = await getProductVariantImagesPublicUrl({
        productId: selectedProduct.id,
        variantId: productVariant.id
      })

      setImagesSrc(productVariantImagesPublicUrl)
    } else {
      emptyFormFields()
    }

  }

  function onImagesChange(imageFiles) {
    setImagesSrc(Array.from(imageFiles).map((imageFile) => URL.createObjectURL(imageFile)))
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">

            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4 gap-y-2">
                <div className="col-span-4 space-y-2">
                  <div className="flex border-b rounded-lg px-2 py-1">
                    <small className="text-center uppercase">Product</small>
                  </div>
                  <ProductListCombobox
                    productList={productList}
                    open={productListComboboxOpen}
                    setOpen={setProductListComboboxOpen}
                    value={productListComboboxValue}
                    setValue={setProductListComboboxValue}
                    onSelectedValueChange={onSelectedProductChange}
                  />
                </div>

                {productListComboboxValue && <>
                  <div className="col-span-4">
                    <ProductVariantListCombobox
                      productId={selectedProduct?.id}
                      productVariantList={productVariantList}
                      open={productVariantListComboboxOpen}
                      setOpen={setProductVariantListComboboxOpen}
                      value={productVariantListComboboxValue}
                      setValue={setProductVariantListComboboxValue}
                      onSelectedValueChange={onSelectedProductVariantChange}
                    />
                  </div>
                </>}
              </div>

              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 space-y-2">
                  <div className="flex border-b rounded-lg px-2 py-1">
                    <small className="text-center uppercase">Images</small>
                  </div>
                  {imagesSrc && <>
                    <ScrollArea className={'w-full whitespace-nowrap rounded-lg'}>
                      <div className="flex w-max space-x-4">
                        {imagesSrc.map((imageSrc, index) => (
                          <div className="overflow-hidden rounded-lg" key={`ProductImages-${index}`}>
                            <img src={imageSrc} className='h-[250px] w-[250px] object-cover rounded-lg' alt="" />
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation={'horizontal'} />
                    </ScrollArea>

                  </>}
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            id="imagesInput"
                            ref={field.ref}
                            onBlur={field.onBlur}
                            onChange={(e) => {
                              field.onChange(e.target.files)
                              onImagesChange(e.target.files)
                            }}
                            className={'cursor-pointer ease-in-out duration-300 hover:border-primary'}
                            accept={'.png, .jpg, .jpeg'}
                            disabled={!(productListComboboxValue && productVariantListComboboxValue)}
                            multiple
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 gap-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel className="text-muted-foreground">Product name</FormLabel>
                      <FormControl>
                        <Input placeholder="your-descriptive-product-name" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel className="text-muted-foreground">Product category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} disabled>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((productCategory) => (
                              <SelectItem value={productCategory.value} key={`ProductCategory-${productCategory.value}`}>
                                {productCategory.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="your-product-price"
                          {...field}
                          disabled={!(productListComboboxValue && productVariantListComboboxValue)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="your-product-quantity"
                          {...field}
                          disabled={!(productListComboboxValue && productVariantListComboboxValue)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel>Material used</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(e.g., Yellow Gold)"
                          {...field}
                          disabled={!(productListComboboxValue && productVariantListComboboxValue)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialProperty"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel>Material property</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(e.g., 18 karats)"
                          {...field}
                          disabled={!(productListComboboxValue && productVariantListComboboxValue)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className={'col-span-4'}>
                      <FormLabel className="text-muted-foreground">Product description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="your-descriptive-product-description" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

            </div>

            <Button
              type="submit"
              size={'lg'}
              className="mt-8 flex mx-auto w-full lg:w-1/2"
              disabled={isLoading || !(productListComboboxValue && productVariantListComboboxValue)}
            >
              Save changes
            </Button>
          </div>

        </form>
      </Form>
    </>
  )
}
