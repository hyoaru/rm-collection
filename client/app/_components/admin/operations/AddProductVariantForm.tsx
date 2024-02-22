"use client";

import { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as z from "zod";

// App imports
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { useToast } from "@components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import ProductListCombobox from "@components/admin/operations/shared/ProductListCombobox";
import { Tables } from "@constants/base/database-types";
import useAddProductVariant from "@hooks/admin/operations/useAddProductVariant";

import {
  PRODUCT_CATEGORIES as productCategories,
  ADD_PRODUCT_VARIANT_FORM_SCHEMA as formSchema,
} from "@constants/admin/forms";

export default function AddProductVariantForm() {
  const [selectedProduct, setSelectedProduct] = useState<Tables<"products"> | null>();
  const [productListComboboxValue, setProductListComboboxValue] = useState<string | null>()
  const [imagesSrc, setImagesSrc] = useState<string[] | null>();
  const addProductVariantMutation = useAddProductVariant();
  const { toast } = useToast();

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
      images: "",
    },
  });

  const emptyFormFields = useCallback(() => {
    (document.querySelector("#imagesInput") as HTMLInputElement).value = "";
    setImagesSrc(null);
    setSelectedProduct(null)
    setProductListComboboxValue(null)

    form.reset({
      name: "",
      category: "",
      description: "",
      price: 0,
      quantity: 0,
      discountRate: 0,
    });
  }, []);

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!selectedProduct) return;

      await addProductVariantMutation
        .mutateAsync({
          product: { id: selectedProduct.id },
          productVariant: {
            material: data.material,
            materialProperty: data.materialProperty,
            size: data.size,
            quantity: data.quantity,
            price: data.price,
            discountRate: data.discountRate,
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
              title: "Product variant has been added successfully.",
              description: "Your item is now ready to be showcased.",
            });
            emptyFormFields();
          }
        });
    },
    [selectedProduct]
  );

  const onSelectedProductChange = useCallback((product: Tables<"products"> | null) => {
    setSelectedProduct(product);
    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        description: product.description,
        price: 0,
        quantity: 0,
        discountRate: 0,
      });
    } else {
      emptyFormFields();
    }
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
            <div className="">
              <div className="grid grid-cols-4 mb-4">
                <div className="col-span-4 space-y-2">
                  <div className="flex border-b rounded-lg px-2 py-1">
                    <small className="text-center uppercase">Product</small>
                  </div>

                  <ProductListCombobox 
                    onSelectedValueChange={onSelectedProductChange} 
                    value={productListComboboxValue}
                    setValue={setProductListComboboxValue}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-12 space-y-2">
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
                                className="h-[250px] w-[250px] object-cover rounded-lg"
                                width={350}
                                height={250}
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
                            disabled={!selectedProduct}
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
                    <FormItem className={"col-span-12 md:col-span-6"}>
                      <FormLabel className={"text-muted-foreground"}>Product name</FormLabel>
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
                    <FormItem className={"col-span-12 md:col-span-6"}>
                      <FormLabel className={"text-muted-foreground"}>Product category</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value} disabled>
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
                        <Input
                          type="number"
                          min="0"
                          placeholder="your-product-price"
                          {...field}
                          disabled={!selectedProduct}
                        />
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
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="(e.g., 25 for 25%)"
                          {...field}
                          disabled={!selectedProduct}
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
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="your-product-quantity"
                          {...field}
                          disabled={!selectedProduct}
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
                    <FormItem className={"col-span-12 sm:col-span-6 lg:col-span-4"}>
                      <FormLabel>Material used</FormLabel>
                      <FormControl>
                        <Input placeholder="(e.g., Yellow Gold)" {...field} disabled={!selectedProduct} />
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
                        <Input placeholder="(e.g., 18 karats)" {...field} disabled={!selectedProduct} />
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
                        <Input placeholder="(e.g., 20mm)" {...field} disabled={!selectedProduct} />
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
                      <FormLabel className={"text-muted-foreground"}>Product description</FormLabel>
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
              size={"lg"}
              className="mt-8 flex mx-auto w-full lg:w-1/2"
              disabled={addProductVariantMutation.isPending || !selectedProduct}
            >
              Add product variant
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
