import { cookies, headers } from "next/headers";

import MobileToolbar from "./components/MobileToolbar";
import Sidebar from "./components/Sidebar";

export default async function PagesLayout({ children }: { children: React.ReactNode }) {
  const isSidebarActive = (await cookies()).get("sidebarState")?.value === "active";
  const headersList = await headers();
  const currentPathname = headersList.get("current-pathname");

  const updateSidebarState = async (state: "active" | "inactive") => {
    "use server";

    (await cookies()).set("sidebarState", state);
  };

  return (
    <main className="flex">
      {currentPathname !== "/account-setup" && (
        <>
          <MobileToolbar />
          <Sidebar isSidebarActive={isSidebarActive} updateSidebarState={updateSidebarState} />
        </>
      )}
      <div className="h-fit flex-grow">{children}</div>
    </main>
  );
}
