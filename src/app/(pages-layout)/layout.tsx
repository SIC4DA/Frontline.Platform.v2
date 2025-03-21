export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
