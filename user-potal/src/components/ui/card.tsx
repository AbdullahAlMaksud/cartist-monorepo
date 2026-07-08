import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="card"
    className={cn(
      "bg-card text-card-foreground flex flex-col gap-4 rounded-xl border border-border shadow-sm",
      className
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-header" className={cn("flex flex-col gap-1.5 px-5 pt-5", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="card-title"
    className={cn("font-display text-base font-semibold leading-none", className)}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-content" className={cn("px-5", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-footer" className={cn("flex items-center px-5 pb-5", className)} {...props} />
);
