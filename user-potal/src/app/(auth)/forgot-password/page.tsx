import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "পাসওয়ার্ড রিসেট",
  alternates: { canonical: "/forgot-password" },
};

const ForgotPasswordPage = () => <ForgotPasswordForm />;

export default ForgotPasswordPage;
