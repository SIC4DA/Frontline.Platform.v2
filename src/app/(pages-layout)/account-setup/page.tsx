import Header from "@/app/(auth-layout)/components/Header";

import AccountSetupForm from "./components/AccountSetupForm";

export default function AccountSetup() {
  return (
    <main
      style={{
        backgroundImage: "url('/images/auth-background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex min-h-screen flex-col items-center gap-10 p-5">
      <Header />
      <section className="flex w-full max-w-[585px] flex-grow flex-col items-center justify-center">
        <AccountSetupForm />
      </section>
    </main>
  );
}
