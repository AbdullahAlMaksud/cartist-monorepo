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

interface DeleteListAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string | null;
}

export const DeleteListAlert = ({ open, onOpenChange, listId }: DeleteListAlertProps) => {
  const { t } = useTranslation();
  const removeList = useShoppingListStore((state) => state.removeList);

  const handleConfirm = async () => {
    if (listId) {
      await removeList(listId);
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("listDetails.deleteListConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("listDetails.deleteListConfirmDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>{t("common.delete")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
