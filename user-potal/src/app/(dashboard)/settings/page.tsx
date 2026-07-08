import type { Metadata } from "next";

import { SettingsScreen } from "@/features/settings";
import { APP_CONFIG } from "@/shared/constants/app";

export const metadata: Metadata = {
  title: "সেটিংস",
  description: `থিম ও ভাষা কাস্টমাইজ করুন — ${APP_CONFIG.NAME_BN}`,
  alternates: { canonical: "/settings" },
};

const SettingsPage = () => <SettingsScreen />;

export default SettingsPage;
