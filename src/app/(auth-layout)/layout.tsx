import { headers } from "next/headers";

import Footer from "./components/Footer";
import Header from "./components/Header";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const currentPathname = headersList.get("current-pathname");

  return (
    <main
      style={{
        // backgroundColor: "rgba(255, 255, 255, 0.30)",
        // backgroundBlendMode: "overlay",
        backgroundImage: "url('/images/auth-background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex min-h-screen flex-col items-center gap-10 p-5">
      <Header />
      {children}
      {currentPathname !== "/onboarding" && <Footer />}
    </main>
  );
}
