"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useShoppingListStore } from "../store/shopping-list.store";
import type { ShoppingItem } from "../types/shopping-item.types";
import { createItemFormSchema, type ItemFormValues } from "../utils/validation-schemas";

interface ItemFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
  item?: ShoppingItem;
}

export const ItemFormDialog = ({ open, onOpenChange, listId, item }: ItemFormDialogProps) => {
  const { t } = useTranslation();
  const addItem = useShoppingListStore((state) => state.addItem);
  const updateItem = useShoppingListStore((state) => state.updateItem);
  const isEditMode = Boolean(item);

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(createItemFormSchema(t)),
    defaultValues: {
      name: item?.name ?? "",
      quantity: item?.quantity ?? "",
      price: item ? String(item.price) : "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: item?.name ?? "",
        quantity: item?.quantity ?? "",
        price: item ? String(item.price) : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  const onSubmit = async (values: ItemFormValues) => {
    const payload = { name: values.name, quantity: values.quantity, price: Number(values.price) };

    if (isEditMode && item) {
      await updateItem(item.id, payload);
    } else {
      await addItem({ listId, ...payload });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t("listDetails.editProduct") : t("listDetails.addProduct")}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("listDetails.productName")}</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder={t("listDetails.productNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("listDetails.quantity")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("listDetails.quantityPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("listDetails.price")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step="any"
                        placeholder={t("listDetails.pricePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("common.cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
