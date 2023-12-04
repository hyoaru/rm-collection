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
import { cn } from "@lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import useAddProductVariant from "@hooks/admin/operations/useAddProductVariant"
import { PRODUCT_CATEGORIES as productCategories, ADD_PRODUCT_VARIANT_FORM_SCHEMA as formSchema } from "@constants/admin/forms"
import ProductListCombobox from "@components/admin/operations/shared/ProductListCombobox"

export default function AddProductVariantForm(props) {
  const { productList } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [selectedProduct, setSelectedProduct] = useState()
  const [imagesSrc, setImagesSrc] = useState()
  const { addProductVariant, isLoading } = useAddProductVariant()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: "",
      description: '',
      quantity: 0,
      price: 0,
      discountRate: 0,
      material: '',
      materialProperty: '',
      images: ''
    }
  })

  function emptyFormFields() {
    document.querySelector('#imagesInput').value = null
    setImagesSrc(null)
    setValue(null)

    form.reset({
      name: '',
      category: '',
      description: '',
      price: 0,
      quantity: 0,
      discountRate: 0,
    })

  }

  async function onSubmit(data) {
    await addProductVariant({
      productId: selectedProduct.id,
      material: data.material,
      materialProperty: data.materialProperty,
      quantity: data.quantity,
      price: data.price,
      discountRate: data.discountRate,
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
            title: "Product variant has been added successfully.",
            description: "Your item is now ready to be showcased."
          })

          emptyFormFields()
        }

      })

    await revalidateAllData()
  }

  function onSelectedProductChange(product) {
    setSelectedProduct(product)
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        description: product.description,
        price: 0,
        quantity: 0,
        discountRate: 0,
      })
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

            <div className="">
              <div className="grid grid-cols-4 mb-4">
                <div className="col-span-4 space-y-2">
                  <div className="flex border-b rounded-lg px-2 py-1">
                    <small className="text-center uppercase">Product</small>
                  </div>
                  <ProductListCombobox
                    productList={productList}
                    open={open}
                    setOpen={setOpen}
                    value={value}
                    setValue={setValue}
                    onSelectedValueChange={onSelectedProductChange}
                  />
                </div>
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
                            disabled={!value}
                            multiple
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 gap-y-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={'col-span-6'}>
                      <FormLabel className={'text-muted-foreground'}>Product name</FormLabel>
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
                    <FormItem className={'col-span-6'}>
                      <FormLabel className={'text-muted-foreground'}>Product category</FormLabel>
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
                    <FormItem className={'col-span-4'}>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="your-product-price" {...field} disabled={!value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountRate"
                  render={({ field }) => (
                    <FormItem className={'col-span-4'}>
                      <FormLabel>{'Discount rate (%)'}</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="100" placeholder="(e.g., 25 for 25%)" {...field} disabled={!value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className={'col-span-4'}>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" placeholder="your-product-quantity" {...field} disabled={!value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem className={'col-span-6'}>
                      <FormLabel>Material used</FormLabel>
                      <FormControl>
                        <Input placeholder="(e.g., Yellow Gold)" {...field} disabled={!value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialProperty"
                  render={({ field }) => (
                    <FormItem className={'col-span-6'}>
                      <FormLabel>Material property</FormLabel>
                      <FormControl>
                        <Input placeholder="(e.g., 18 karats)" {...field} disabled={!value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className={'col-span-12'}>
                      <FormLabel className={'text-muted-foreground'}>Product description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="your-descriptive-product-description" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" size={'lg'} className="mt-8 flex mx-auto w-full lg:w-1/2" disabled={isLoading || !value}>Add product variant</Button>
          </div>

        </form>
      </Form>
    </>
  )
}
