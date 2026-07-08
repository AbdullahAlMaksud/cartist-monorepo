import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ListCardSkeleton = () => (
  <Card className="gap-6 py-5">
    <div className="flex items-center justify-between px-5">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="size-8 rounded-full" />
    </div>
    <div className="flex items-end justify-between px-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  </Card>
);

export const ListGridSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <ListCardSkeleton key={index} />
    ))}
  </div>
);
