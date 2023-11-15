"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
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
import { useEffect, useState } from "react"
import useAddProduct from "@hooks/admin/operations/useAddProduct"
import { useToast } from "@components/ui/use-toast"
import useUpdateProduct from "@hooks/admin/operations/useUpdateProduct"
import revalidateAllData from "@services/shared/revalidateAllData"
import getProductThumbnailPublicUrl from "@services/admin/shared/getProductThumbnailPublicUrl"
import { cn } from "@lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"

export default function EditProductForm(props) {
  const { productList } = props
  const MAX_FILE_SIZE_IN_MB = 5 * 1000000

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState()
  const [selectedProduct, setSelectedProduct] = useState()
  const [thumbnailSrc, setThumbnailSrc] = useState()
  const { updateProduct, isLoading } = useUpdateProduct()
  const { toast } = useToast()

  const productCategories = [
    { name: 'Earrings', value: 'earrings' },
    { name: 'Necklaces', value: 'necklaces' },
    { name: 'Bracelets', value: 'bracelets' },
    { name: 'Rings', value: 'rings' },
  ]

  const formSchema = z.object({
    name: z.string().trim().min(4).max(70),
    category: z.string().refine((value) => value?.length !== 0, `Category is required`),
    description: z.string().trim().min(10).max(800),
    thumbnail: z.any()
      .refine((files) => {
        if (files.length === 0) { return true }
        return files[0]?.size <= MAX_FILE_SIZE_IN_MB
      }, `Max image size is 5MB.`),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      category: "",
      description: '',
      thumbnail: '',
    }
  })

  function onSelectedProductChange(product) {
    document.querySelector('#thumbnailInput').value = null
    setSelectedProduct(product)

    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        description: product.description,
      })

      const thumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id })
      setThumbnailSrc(thumbnailPublicUrl)
    } else {
      setThumbnailSrc(null)
    }
  }

  async function onSubmit(data) {
    if (value) {
      await updateProduct({
        id: selectedProduct.id,
        name: data.name,
        category: data.category,
        description: data.description,
        thumbnail: data.thumbnail

      }).then(async ({ data, error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later."
          })
        } else {
          toast({
            title: "Product has been updated successfully.",
            description: "Your item is now ready to be showcased."
          })

          await revalidateAllData()
          setValue(null)
          setThumbnailSrc(null)
          form.reset()
          document.querySelector('#thumbnailInput').value = null
        }
      })
    }
  }

  function onThumbnailChange(imageFile) {
    setThumbnailSrc(URL.createObjectURL(imageFile))
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h2 className="text-3xl capitalize my-5 font-bold text-center sm:mt-0 md:text-left">Edit product</h2>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-2">
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

              <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-2">
                <div className="flex border-b rounded-lg px-2 py-1">
                  <small className="text-center uppercase">Product</small>
                </div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? productList?.data.find((product) => product.name === value)?.name
                        : "Select product..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[325px] sm:w-[200px] lg:w-[400px] xl:w-[650px] p-1">
                    <Command>
                      <CommandInput placeholder="Search product..." />
                      <CommandEmpty>No product found.</CommandEmpty>
                      <CommandGroup>
                        {productList.data.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={product.name}
                            onSelect={(currentValue) => {
                              onSelectedProductChange(currentValue === value ? null : product)
                              setValue(currentValue === value ? null : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === product.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {product.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="">
                  {value && <>
                    <div className="grid grid-cols-12 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className={'col-span-6'}>
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
                          <FormItem className={'col-span-6'}>
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
                        name="description"
                        render={({ field }) => (
                          <FormItem className={'col-span-12'}>
                            <FormLabel>Product description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="your-descriptive-product-description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>}
                </div>
              </div>
            </div>

            <Button type="submit" size={'lg'} className="mt-8 w-full" disabled={isLoading}>Save changes</Button>
          </div>

        </form>
      </Form>
    </>
  )
}
