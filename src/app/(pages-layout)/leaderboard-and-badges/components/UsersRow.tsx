import Blitz from "@public/icons/Blitz";
import DollarSign from "@public/icons/DollarSign";
import { HandCoins, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { UserWithClosedDeals } from "@/services/leaderboard";
import { formatLargeNumber } from "@/utils/helper";

import LatestDeals from "./LatestDeals";

const UsersRow = ({
	user,
	index,
}: { user: UserWithClosedDeals; index: number }) => {
	const t = useTranslations("leaderboard");

	return (
		<tr className="mb-4 flex w-full min-w-fit items-center rounded-2xl bg-[#F6F6F6] py-4 text-sm last:mb-0">
			<td className="ellipsis w-[150px] px-4 pl-8 text-2xl font-medium text-[#5C5C5C]">
				{index + 1}
			</td>
			<td className="ellipsis w-[150px] flex-grow px-4">
				<div className="flex items-center gap-3">
					<Image
						src={user.user.image ?? "/images/danny.jpg"}
						alt={user.user.name}
						width={40}
						height={40}
						className="size-10 rounded-lg"
					/>
					<div>
						<p>{user.user.name}</p>
						<span className="bg-gradient-to-r from-[#5C5C5C] to-[#C2C2C2] bg-clip-text text-xs text-transparent">
							@{user.user.username}
						</span>
					</div>
				</div>
			</td>
			<td className="ellipsis text-foreground w-[150px] flex-grow px-4">
				<LatestDeals deals={user.deals} />
			</td>
			<td className="ellipsis text-foreground w-[150px] flex-grow px-4">
				<div className="flex items-center gap-3">
					<HandCoins className="size-7 stroke-[1.5px] text-[#5C5C5C]" />
					<div>
						<p className="text-[#5C5C5C] uppercase">
							{formatLargeNumber(user.totalContractValue * 0.1).value}
							{t(`${formatLargeNumber(user.totalContractValue * 0.1).format}`)}
						</p>
						<span className="text-xs font-medium text-[#92999D]">
							{t("commissionEarned")}
						</span>
					</div>
				</div>
			</td>
			<td className="ellipsis text-foreground w-[150px] flex-grow px-4">
				<div className="flex items-center gap-3">
					<Handshake className="size-7 stroke-[1.5px] text-[#5C5C5C]" />
					<div>
						<p className="text-[#5C5C5C]">{user.conversionRate}%</p>
						<span className="text-xs font-medium text-[#92999D]">
							{t("conversionRate")}
						</span>
					</div>
				</div>
			</td>
			<td className="ellipsis text-foreground w-[150px] flex-grow px-4">
				<div className="flex items-center gap-3">
					<Blitz />
					<div>
						<p className="text-[#5C5C5C]">{user.dealsCount}</p>
						<span className="text-xs font-medium text-[#92999D]">
							{t("newDeals")}
						</span>
					</div>
				</div>
			</td>
			<td className="ellipsis text-foreground w-[150px] flex-grow px-4">
				<div className="flex items-center gap-3">
					<DollarSign />
					<div>
						<p className="text-[#5C5C5C] uppercase">
							{formatLargeNumber(user.totalContractValue).value}
							{t(`${formatLargeNumber(user.totalContractValue).format}`)}
						</p>
						<span className="text-xs font-medium text-[#92999D]">
							{t("generatedRevenue")}
						</span>
					</div>
				</div>
			</td>
		</tr>
	);
};

export default UsersRow;
