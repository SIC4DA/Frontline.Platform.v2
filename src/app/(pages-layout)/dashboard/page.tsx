import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      DashboardPage
      <Link className="text-primary underline" href="/api/sign-out">
        Sign Out
      </Link>
    </div>
  );
}
