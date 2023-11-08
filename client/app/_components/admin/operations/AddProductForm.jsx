"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// App imports
import { Button } from "@components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Textarea } from "@components/ui/textarea"
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area"
import { useState } from "react"

export default function AddProductForm() {
  const MAX_FILE_SIZE_IN_MB = 5 * 1000000
  const [thumbnailSrc, setThumbnailSrc] = useState()
  const [imagesSrc, setImagesSrc] = useState()

  const formSchema = z.object({
    name: z.string().trim().min(4).max(70),
    description: z.string().trim().min(10).max(800),
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
      description: '',
      material: '',
      materialProperty: '',
      thumbnail: '',
      images: ''
    }
  })

  async function onSubmit(data) {
    console.log(data)
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
          <div className="mb-4">
            <h2 className="text-3xl capitalize my-4 font-bold text-center sm:mt-0 md:text-left">Add new product</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="your-descriptive-product-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="what-material-is-used (e.g., Yellow Gold)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialProperty"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="property-of-material-used (e.g., 18 karats)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="your-descriptive-product-description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
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


          <Button type="submit" size={'lg'} className="mt-6 w-full">Submit</Button>
        </form>
      </Form>
    </>
  )
}
