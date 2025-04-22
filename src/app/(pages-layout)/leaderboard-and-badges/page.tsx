import { getTopUserWithClosedDeals } from "@/services/leaderboard";

export default async function LeaderboardPage() {
  const result = await getTopUserWithClosedDeals();
  console.dir(result, { depth: null });

  return <div>LeaderboardPage</div>;
}
