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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";

import type { ShoppingListWithStats } from "../types/shopping-list.types";
import { ListCard } from "./list-card";
import { SortableListCard } from "./sortable-list-card";

interface ListGridProps {
  lists: ShoppingListWithStats[];
  onReorder: (orderedIds: string[]) => void;
  onEdit: (list: ShoppingListWithStats) => void;
  onDelete: (listId: string) => void;
  onTogglePin: (listId: string) => void;
  /** When true (sorting by something other than "manual"), drag handles are hidden. */
  sortDisabled?: boolean;
}

export const ListGrid = ({
  lists,
  onReorder,
  onEdit,
  onDelete,
  onTogglePin,
  sortDisabled = false,
}: ListGridProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = lists.findIndex((list) => list.id === active.id);
    const newIndex = lists.findIndex((list) => list.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = [...lists];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    onReorder(reordered.map((list) => list.id));
  };

  if (sortDisabled) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={lists.map((list) => list.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {lists.map((list) => (
              <SortableListCard
                key={list.id}
                list={list}
                onEdit={onEdit}
                onDelete={onDelete}
                onTogglePin={onTogglePin}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};
