"use client";

import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

// App imports
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { ADD_PRODUCT_FORM_SCHEMA as formSchema } from "@constants/admin/forms";
import { PRODUCT_CATEGORIES as productCategories } from "@constants/base/constants";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { useToast } from "@components/ui/use-toast";
import { useAddProduct } from "@hooks/admin/operations/useAddProduct";

export default function AddProductForm() {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>();
  const [imagesSrc, setImagesSrc] = useState<string[] | null>();
  const { toast } = useToast();

  const addProductWithVariantMutation = useAddProduct()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      quantity: 0,
      price: 0,
      discountRate: 0,
      material: "",
      materialProperty: "",
      size: "",
      thumbnail: "",
      images: "",
    },
  });

  const onSubmit = useCallback(async (data: z.infer<typeof formSchema>) => {
    await addProductWithVariantMutation
      .mutateAsync({
        product: {
          name: data.name,
          description: data.description,
          category: data.category,
          thumbnail: data.thumbnail,
        },
        productVariant: {
          material: data.material,
          materialProperty: data.materialProperty,
          quantity: data.quantity,
          price: data.price,
          discountRate: data.discountRate,
          size: data.size,
          images: data.images,
        },
      })
      .then(({ error }) => {
        if (error) {
          toast({
            variant: "destructive",
            title: "An error has occured.",
            description: "Please try again later.",
          });
        } else {
          toast({
            title: "Product has been added successfully.",
            description: "Your item is now ready to be showcased.",
          });

          form.reset();
          resetImageFields();
        }
      });
  }, []);

  const resetImageFields = useCallback(() => {
    (document.querySelector("#thumbnailInput") as HTMLInputElement).value = "";
    (document.querySelector("#imagesInput") as HTMLInputElement).value = "";
    setThumbnailSrc(null);
    setImagesSrc(null);
  }, [])

  const onThumbnailChange = useCallback((imageFile: File | undefined) => {
    if (!imageFile) return;
    setThumbnailSrc(URL.createObjectURL(imageFile));
  }, [])

  const onImagesChange = useCallback((imageFiles: FileList | null) => {
    if (!imageFiles) return;
    setImagesSrc(Array.from(imageFiles).map((imageFile) => URL.createObjectURL(imageFile)));
  }, [])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 space-y-2">
                <div className="flex border-b rounded-lg px-2 py-1">
                  <small className="text-center uppercase">Thumbnail</small>
                </div>
                {thumbnailSrc && (
                  <>
                    <Image
                      src={thumbnailSrc}
                      width={350}
                      height={250}
                      className="h-[250px] w-full max-w-[350px] object-cover rounded-lg mx-auto"
                      alt=""
                    />
                  </>
                )}
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
                            field.onChange(e.target.files);
                            onThumbnailChange(e.target.files?.[0]);
                          }}
                          ref={field.ref}
                          className={"cursor-pointer ease-in-out duration-300 hover:border-primary"}
                          accept={".jpeg, .jpg, .png"}
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
                {imagesSrc && (
                  <>
                    <ScrollArea className={"w-full whitespace-nowrap rounded-lg"}>
                      <div className="flex w-max space-x-4">
                        {imagesSrc.map((imageSrc, index) => (
                          <div className="overflow-hidden rounded-lg" key={`ProductImages-${index}`}>
                            <Image
                              src={imageSrc}
                              width={350}
                              height={250}
                              className="h-[250px] w-[250px] object-cover rounded-lg"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation={"horizontal"} />
                    </ScrollArea>
                  </>
                )}

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
                            field.onChange(e.target.files);
                            onImagesChange(e.target.files);
                          }}
                          className={"cursor-pointer ease-in-out duration-300 hover:border-primary"}
                          accept={".png, .jpg, .jpeg"}
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
              <div className="grid grid-cols-12 gap-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className={"col-span-12 md:col-span-6"}>
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
                    <FormItem className={"col-span-12 md:col-span-6"}>
                      <FormLabel>Product category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCategories.map((productCategory) => (
                              <SelectItem
                                value={productCategory.value}
                                key={`ProductCategory-${productCategory.value}`}
                              >
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
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
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
                  name="discountRate"
                  render={({ field }) => (
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
                      <FormLabel>{"Discount rate (%)"}</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="100" placeholder="(e.g., 25 for 25%)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
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
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
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
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
                      <FormLabel>Material property</FormLabel>
                      <FormControl>
                        <Input placeholder="(e.g., 18 karats)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="size"
                  render={({ field }) => (
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder="(e.g., 20mm)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className={"col-span-12"}>
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

            <Button
              type="submit"
              size={"lg"}
              className="mt-8 flex mx-auto w-full lg:w-1/2"
              disabled={addProductWithVariantMutation.isPending}
            >
              Add product
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
