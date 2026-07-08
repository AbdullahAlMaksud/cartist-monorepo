"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { ShoppingItem, ShoppingItemStatus } from "../types/shopping-item.types";
import { ItemRow } from "./item-row";

interface SortableItemRowProps {
  item: ShoppingItem;
  onChangeStatus: (itemId: string, status: ShoppingItemStatus) => void;
  onUpdate: (itemId: string, values: { name: string; quantity: string; price: number }) => Promise<void>;
  onDelete: (itemId: string) => void;
}

export const SortableItemRow = ({ item, onChangeStatus, onUpdate, onDelete }: SortableItemRowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ItemRow
        item={item}
        onChangeStatus={onChangeStatus}
        onUpdate={onUpdate}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
        isDragging={isDragging}
      />
    </div>
  );
};
