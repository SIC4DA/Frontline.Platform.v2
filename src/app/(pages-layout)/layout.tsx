import Sidebar from "./components/Sidebar";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="h-fit flex-grow">{children}</div>
    </main>
  );
}
