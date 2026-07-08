import type { Metadata } from "next";

import { SignUpForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "সাইন আপ",
  alternates: { canonical: "/signup" },
};

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;
