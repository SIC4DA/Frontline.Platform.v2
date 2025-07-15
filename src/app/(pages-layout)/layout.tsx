import dynamic from "next/dynamic";
import { cookies, headers } from "next/headers";

import ContentWrapper from "./components/ContentWrapper";

const MobileToolbar = dynamic(() => import("./components/MobileToolbar"));
const Sidebar = dynamic(() => import("./components/Sidebar"));

const invisibleSidebarPaths = ["account-setup", "deal"];

export const isSidebarVisible = (pathname = "") => {
  const pathnameCleaned = pathname.split("/")[1];
  return !invisibleSidebarPaths.includes(pathnameCleaned);
};

export default async function PagesLayout({ children }: { children: React.ReactNode }) {
  const isSidebarActive = (await cookies()).get("sidebarState")?.value === "active";
  const headersList = await headers();
  const currentPathname = headersList.get("current-pathname") ?? "";

  return (
    <main>
      {isSidebarVisible(currentPathname) && (
        <>
          <MobileToolbar />
          <Sidebar isSidebarActive={isSidebarActive} />
        </>
      )}
      <ContentWrapper isSidebarActive={isSidebarActive} isMarginVisible={isSidebarVisible(currentPathname)}>
        {children}
      </ContentWrapper>
    </main>
  );
}
