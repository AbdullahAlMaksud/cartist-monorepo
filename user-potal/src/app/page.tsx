import { redirect } from "next/navigation";

import { ROUTES } from "@/shared/constants/routes";

const RootPage = () => {
  redirect(ROUTES.LISTS);
};

export default RootPage;
