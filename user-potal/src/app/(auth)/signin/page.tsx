import type { Metadata } from "next";

import { SignInForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "সাইন ইন",
  alternates: { canonical: "/signin" },
};

const SignInPage = () => <SignInForm />;

export default SignInPage;
