import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="font-display text-2xl font-bold text-primary">হাটখাতা</span>
          <h1 className="font-display text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <Card className="p-6">{children}</Card>

        {footer}
      </div>
    </div>
  );
};
