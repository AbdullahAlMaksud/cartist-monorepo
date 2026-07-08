"use client";

import { ListChecks, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";

const NAV_LINKS = [
  { href: ROUTES.LISTS, labelKey: "nav.lists", icon: ListChecks },
  { href: ROUTES.SETTINGS, labelKey: "nav.settings", icon: Settings },
] as const;

export const Navbar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="sticky top-4 z-30 mx-auto flex h-14 w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-full border border-border/30 bg-transparent px-6 py-2 backdrop-blur-md">
      <Link href={ROUTES.LISTS} className="flex items-center gap-2 font-display text-lg font-bold text-primary relative z-10 shrink-0">
        <img src="/logo.png" alt="Cartist Logo" className="size-6 object-contain" />
        <span>{t("app.name")}</span>
      </Link>

      <nav className="flex items-center gap-1" aria-label="Primary">
        {NAV_LINKS.map(({ href, labelKey, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              <span className="hidden sm:inline">{t(labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 shrink-0">
        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full size-8" aria-label={user.name}>
                <User className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => void signOut()}>
                <LogOut /> {t("nav.signOut")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild size="sm" variant="outline" className="rounded-full h-8 px-4">
            <Link href={ROUTES.SIGN_IN}>{t("nav.signIn")}</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
