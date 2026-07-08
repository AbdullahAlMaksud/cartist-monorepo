import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="skeleton" className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
);
