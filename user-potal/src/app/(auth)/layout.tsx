import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-[100dvh] bg-background">{children}</div>;
};

export default AuthLayout;
