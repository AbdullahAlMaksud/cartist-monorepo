import type { Metadata } from "next";

import { ShoppingListScreen } from "@/features/shopping-list";
import { APP_CONFIG } from "@/shared/constants/app";

export const metadata: Metadata = {
  title: "আপনার শপিং লিস্টসমূহ",
  description: APP_CONFIG.DESCRIPTION_BN,
  alternates: { canonical: "/lists" },
};

const ListsPage = () => <ShoppingListScreen />;

export default ListsPage;
