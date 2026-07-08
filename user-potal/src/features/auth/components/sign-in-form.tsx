"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/shared/constants/routes";

import { useAuth } from "../hooks/use-auth";
import { createSignInSchema, type SignInFormValues } from "../utils/validation-schemas";
import { AuthCard } from "./auth-card";

export const SignInForm = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(createSignInSchema(t)),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      router.push(ROUTES.LISTS);
    } catch {
      toast.error(t("validation.required"));
    }
  };

  return (
    <AuthCard
      title={t("auth.signIn.title")}
      subtitle={t("auth.signIn.subtitle")}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.signIn.noAccount")}{" "}
          <Link href={ROUTES.SIGN_UP} className="font-medium text-primary hover:underline">
            {t("auth.signIn.createAccount")}
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.fields.email")}</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>{t("auth.fields.password")}</FormLabel>
                  <Link
                    href={ROUTES.FORGOT_PASSWORD}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {t("auth.signIn.forgotPassword")}
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2 w-full" disabled={form.formState.isSubmitting}>
            {t("auth.signIn.submit")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">{t("auth.notice")}</p>
        </form>
      </Form>
    </AuthCard>
  );
};
