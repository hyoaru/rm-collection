"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image, { StaticImageData } from "next/image";

// App imports
import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useCallback, useState } from "react";
import { useToast } from "@components/ui/use-toast";
import ProductListCombobox from "@components/admin/operations/shared/ProductListCombobox";
import { Tables } from "@constants/base/database-types";
import { useUpdateProduct } from "@hooks/admin/operations/useUpdateProduct";
import getProductThumbnailPublicUrl from "@services/shared/getProductThumbnailPublicUrl";

import {
  PRODUCT_CATEGORIES as productCategories,
  EDIT_PRODUCT_FORM_SCHEMA as formSchema,
} from "@constants/admin/forms";

export default function EditProductForm() {
  const [selectedProduct, setSelectedProduct] = useState<Tables<"products"> | null>();
  const [thumbnailSrc, setThumbnailSrc] = useState<StaticImageData | string | null>();
  const updateProductMutation = useUpdateProduct(formSchema);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      thumbnail: "",
    },
  });

  const emptyFormFields = useCallback(() => {
    (document.querySelector("#thumbnailInput") as HTMLInputElement).value = "";
    setThumbnailSrc(null);
    setSelectedProduct(null);

    form.reset({
      name: "",
      category: "",
      description: "",
    });
  }, []);

  const onSelectedProductChange = useCallback(async (product: Tables<"products"> | null) => {
    (document.querySelector("#thumbnailInput") as HTMLInputElement).value = "";
    setSelectedProduct(product);

    if (product) {
      form.reset({
        name: product.name,
        category: product.category,
        description: product.description,
      });

      const thumbnailPublicUrl = getProductThumbnailPublicUrl({ productId: product.id });
      setThumbnailSrc(thumbnailPublicUrl);
    } else {
      emptyFormFields();
    }
  }, [])

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      if (!selectedProduct) return;

      await updateProductMutation
        .mutateAsync({
          id: selectedProduct.id,
          name: data.name,
          description: data.description,
          category: data.category,
          thumbnail: data.thumbnail,
        })
        .then(async ({ error }) => {
          if (error) {
            toast({
              variant: "destructive",
              title: "An error has occured.",
              description: "Please try again later.",
            });
          } else {
            if (data.thumbnail) {
              toast({
                title: "Product has been updated successfully.",
                description: "Image changes will take effect after a while.",
              });
            } else {
              toast({
                title: "Product has been updated successfully.",
                description: "Changes will take effect shortly.",
              });
            }
            emptyFormFields();
          }
        });
    },
    [selectedProduct]
  );

  const onThumbnailChange = useCallback((imageFile: File | undefined) => {
    if (!imageFile) return;
    setThumbnailSrc(imageFile ? URL.createObjectURL(imageFile) : null);
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-2">
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
                          disabled={!selectedProduct}
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

                <ProductListCombobox onSelectedValueChange={onSelectedProductChange} />

                <div className="">
                  <div className="grid grid-cols-12 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className={"col-span-6"}>
                          <FormLabel>Product name</FormLabel>
                          <FormControl>
                            <Input placeholder="your-descriptive-product-name" {...field} disabled={!selectedProduct} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className={"col-span-6"}>
                          <FormLabel>Product category</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProduct}>
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
                      name="description"
                      render={({ field }) => (
                        <FormItem className={"col-span-12"}>
                          <FormLabel>Product description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="your-descriptive-product-description"
                              {...field}
                              disabled={!selectedProduct}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size={"lg"}
              className="mt-8 flex mx-auto w-full lg:w-1/2"
              disabled={updateProductMutation.isPending || !selectedProduct}
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}