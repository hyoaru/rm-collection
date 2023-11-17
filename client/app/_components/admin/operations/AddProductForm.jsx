"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// App imports
import { Button } from "@components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area"
import { useState } from "react"
import useAddProduct from "@hooks/admin/operations/useAddProduct"
import { useToast } from "@components/ui/use-toast"
import revalidateAllData from "@services/shared/revalidateAllData"
import { PRODUCT_CATEGORIES as productCategories, MAX_FILE_SIZE_IN_MB } from "@constants/admin"
import FormHeader from "@components/admin/shared/FormHeader"

export default function AddProductForm() {
  const [thumbnailSrc, setThumbnailSrc] = useState()
  const [imagesSrc, setImagesSrc] = useState()
  const { addProduct, isLoading } = useAddProduct()
  const { toast } = useToast()

  const formSchema = z.object({
    name: z.string().trim().min(4).max(70),
    category: z.string().refine((value) => value?.length !== 0, `Category is required`),
    description: z.string().trim().min(10).max(800),
    quantity: z.coerce.number(),
    price: z.coerce.number(),
    material: z.string().trim().min(4).max(50),
    materialProperty: z.string().trim().min(2).max(50),
    thumbnail: z.any()
      .refine((files) => files?.length !== 0, `Thumbnail is required`)
      .refine((files) => files[0]?.size <= MAX_FILE_SIZE_IN_MB, `Max image size is 5MB.`),
    images: z.any()
      .refine((files) => Array.from(files)?.length !== 0, `Images is required`)
      .refine((files) => Array.from(files)?.length <= 4, `You can only select up to 4 images`)
      .refine((files) => Array.from(files)?.every((file) => file?.size <= MAX_FILE_SIZE_IN_MB), `Max image size is 5MB`),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: "",
      description: '',
      quantity: 0,
      price: 0,
      material: '',
      materialProperty: '',
      thumbnail: '',
      images: ''
    }
  })

  async function onSubmit(data) {
    await addProduct({
      name: data.name,
      category: data.category,
      description: data.description,
      material: data.material,
      materialProperty: data.materialProperty,
      quantity: data.quantity,
      price: data.price,
      thumbnail: data.thumbnail,
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
            title: "Product has been added successfully.",
            description: "Your item is now ready to be showcased."
          })

          form.reset()
          document.querySelector('#thumbnailInput').value = null
          document.querySelector('#imagesInput').value = null
          setThumbnailSrc(null)
          setImagesSrc(null)
        }

      })

    await revalidateAllData()
  }

  function onThumbnailChange(imageFile) {
    setThumbnailSrc(URL.createObjectURL(imageFile))
  }

  function onImagesChange(imageFiles) {
    setImagesSrc(Array.from(imageFiles).map((imageFile) => URL.createObjectURL(imageFile)))
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <FormHeader
              category={'Operation'} 
              title={'Add new product'}
              description={'Provide details about the product and other pertinent information.'}
            />

            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 space-y-2">
                <div className="flex border-b rounded-lg px-2 py-1">
                  <small className="text-center uppercase">Thumbnail</small>
                </div>
                {thumbnailSrc && <>
                  <img
                    src={thumbnailSrc}
                    className='h-[250px] w-full max-w-[350px] object-cover rounded-lg mx-auto'
                    alt=""
                  />
                </>}
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          id="thumbnailInput"
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            field.onChange(e.target.files)
                            onThumbnailChange(e.target.files[0])
                          }}
                          ref={field.ref}
                          className={'cursor-pointer ease-in-out duration-300 hover:border-primary'}
                          accept={'.jpeg, .jpg, .png'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-8 xl:col-span-9 space-y-2">
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
                          multiple
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="">
              <div className="grid grid-cols-4 gap-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={'col-span-2'}>
                      <FormLabel>Product name</FormLabel>
                      <FormControl>
                        <Input placeholder="your-descriptive-product-name" {...field} />
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
                      <FormLabel>Product category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
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
                        <Input type="number" min="0" placeholder="your-product-price" {...field} />
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
                        <Input type="number" min="0" placeholder="your-product-quantity" {...field} />
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
                        <Input placeholder="(e.g., Yellow Gold)" {...field} />
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
                        <Input placeholder="(e.g., 18 karats)" {...field} />
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
                      <FormLabel>Product description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="your-descriptive-product-description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" size={'lg'} className="mt-8 flex mx-auto w-full lg:w-1/2"  disabled={isLoading}>Add product</Button>
          </div>

        </form>
      </Form>
    </>
  )
}
