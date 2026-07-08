"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/shared/constants/routes";

import { useAuth } from "../hooks/use-auth";
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../utils/validation-schemas";
import { AuthCard } from "./auth-card";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const { forgotPassword } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(createForgotPasswordSchema(t)),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    await forgotPassword(values);
    setIsSubmitted(true);
  };

  return (
    <AuthCard
      title={t("auth.forgotPassword.title")}
      subtitle={t("auth.forgotPassword.subtitle")}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          <Link href={ROUTES.SIGN_IN} className="font-medium text-primary hover:underline">
            {t("auth.forgotPassword.backToSignIn")}
          </Link>
        </p>
      }
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <MailCheck className="size-6" />
          </div>
          <h2 className="font-display font-semibold">{t("auth.forgotPassword.successTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("auth.forgotPassword.successMessage")}</p>
        </div>
      ) : (
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

            <Button type="submit" className="mt-2 w-full" disabled={form.formState.isSubmitting}>
              {t("auth.forgotPassword.submit")}
            </Button>
          </form>
        </Form>
      )}
    </AuthCard>
  );
};
