"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { ShoppingListWithStats } from "../types/shopping-list.types";
import { ListCard } from "./list-card";

interface SortableListCardProps {
  list: ShoppingListWithStats;
  onEdit: (list: ShoppingListWithStats) => void;
  onDelete: (listId: string) => void;
  onTogglePin: (listId: string) => void;
}

export const SortableListCard = ({ list, onEdit, onDelete, onTogglePin }: SortableListCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: list.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ListCard
        list={list}
        onEdit={onEdit}
        onDelete={onDelete}
        onTogglePin={onTogglePin}
        dragHandleProps={{ ...attributes, ...listeners }}
        isDragging={isDragging}
      />
    </div>
  );
};
