"use client";

import { useTranslation } from "react-i18next";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useShoppingListStore } from "../store/shopping-list.store";

interface DeleteItemAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string | null;
}

export const DeleteItemAlert = ({ open, onOpenChange, itemId }: DeleteItemAlertProps) => {
  const { t } = useTranslation();
  const removeItem = useShoppingListStore((state) => state.removeItem);

  const handleConfirm = async () => {
    if (itemId) {
      await removeItem(itemId);
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("listDetails.deleteConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("listDetails.deleteConfirmDescription")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{t("common.delete")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
