"use server";

import { cookies } from "next/headers";

export const updateSidebarState = async (state: "active" | "inactive") => {
  (await cookies()).set("sidebarState", state);
};
