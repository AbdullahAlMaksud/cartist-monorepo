"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";

import type { ShoppingItem, ShoppingItemStatus } from "../types/shopping-item.types";
import { SortableItemRow } from "./sortable-item-row";

interface ItemListProps {
  items: ShoppingItem[];
  onReorder: (orderedIds: string[]) => void;
  onChangeStatus: (itemId: string, status: ShoppingItemStatus) => void;
  onUpdate: (itemId: string, values: { name: string; quantity: string; price: number }) => Promise<void>;
  onDelete: (itemId: string) => void;
}

export const ItemList = ({ items, onReorder, onChangeStatus, onUpdate, onDelete }: ItemListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...items];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    onReorder(reordered.map((item) => item.id));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-1">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <SortableItemRow
                key={item.id}
                item={item}
                onChangeStatus={onChangeStatus}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};
