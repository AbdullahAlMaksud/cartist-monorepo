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
import { createSignUpSchema, type SignUpFormValues } from "../utils/validation-schemas";
import { AuthCard } from "./auth-card";

export const SignUpForm = () => {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(createSignUpSchema(t)),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await signUp(values);
      router.push(ROUTES.LISTS);
    } catch {
      toast.error(t("validation.required"));
    }
  };

  return (
    <AuthCard
      title={t("auth.signUp.title")}
      subtitle={t("auth.signUp.subtitle")}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.signUp.haveAccount")}{" "}
          <Link href={ROUTES.SIGN_IN} className="font-medium text-primary hover:underline">
            {t("auth.signUp.signInInstead")}
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.fields.name")}</FormLabel>
                <FormControl>
                  <Input autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>{t("auth.fields.password")}</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.fields.confirmPassword")}</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2 w-full" disabled={form.formState.isSubmitting}>
            {t("auth.signUp.submit")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">{t("auth.notice")}</p>
        </form>
      </Form>
    </AuthCard>
  );
};
