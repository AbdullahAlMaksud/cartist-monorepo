"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

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
import type { ShoppingList } from "../types/shopping-list.types";
import { createListFormSchema, type ListFormValues } from "../utils/validation-schemas";

interface ListFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list?: ShoppingList;
}

export const ListFormDialog = ({ open, onOpenChange, list }: ListFormDialogProps) => {
  const { t } = useTranslation();
  const createList = useShoppingListStore((state) => state.createList);
  const updateList = useShoppingListStore((state) => state.updateList);
  const isEditMode = Boolean(list);

  const form = useForm<ListFormValues>({
    resolver: zodResolver(createListFormSchema(t)),
    defaultValues: { title: list?.title ?? "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ title: list?.title ?? "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, list]);

  const onSubmit = async (values: ListFormValues) => {
    try {
      if (isEditMode && list) {
        await updateList(list.id, { title: values.title });
      } else {
        await createList({ title: values.title });
      }
      onOpenChange(false);
    } catch {
      toast.error(t("validation.required"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? t("lists.editTitle") : t("lists.createTitle")}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("listForm.titleLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder={t("listForm.titlePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t("common.cancel")}
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isEditMode ? t("listForm.submitEdit") : t("listForm.submitCreate")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
