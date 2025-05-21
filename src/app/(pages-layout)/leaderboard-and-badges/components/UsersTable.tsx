import { useTranslations } from "next-intl";

import type { UserWithClosedDeals } from "@/services/leaderboard";

import UsersRow from "./UsersRow";

const UsersTable = ({ users }: { users: UserWithClosedDeals[] }) => {
	const t = useTranslations("leaderboard");

	return (
		<table className="w-full max-w-full overflow-x-auto">
			<thead className="text-foreground block w-full min-w-max py-2 text-sm font-medium capitalize">
				<tr className="text-foreground-secondary flex w-full min-w-fit items-center">
					<td className="ellipsis w-[150px] px-4 whitespace-nowrap">
						{t("rank")}
					</td>
					<td className="ellipsis w-[150px] flex-grow px-4 whitespace-nowrap">
						{t("name")}
					</td>
					<td className="ellipsis w-[150px] flex-grow px-4 whitespace-nowrap" />
					<td className="ellipsis w-[150px] flex-grow px-4 whitespace-nowrap" />
					<td className="ellipsis w-[150px] flex-grow px-4 whitespace-nowrap" />
					<td className="ellipsis w-[150px] flex-grow px-4 whitespace-nowrap" />
					<td className="ellipsis w-[150px] flex-grow px-4 whitespace-nowrap" />
				</tr>
			</thead>
			<tbody className="block w-full">
				{users?.map((user, i) => (
					<UsersRow key={user.user.id} user={user} index={i} />
				))}
			</tbody>
		</table>
	);
};

export default UsersTable;
