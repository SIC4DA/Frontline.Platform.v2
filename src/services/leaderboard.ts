"use server";

import { sql } from "drizzle-orm";

import { db } from "@/core/db";
import { deal, user } from "@/core/db/schema";
import { compareEmailsDomain } from "@/validations/email";

import { getMe } from "./user";

export type UserWithClosedDeals = Awaited<
	ReturnType<typeof getUsersWithClosedDeals>
>[0];

export const getUsersWithClosedDeals = async () => {
	const usersWithClosedDealsFn = db
		.select({
			closedDealsCount: sql<number>`COUNT(
        CASE
          WHEN ${deal.dealContributors}::jsonb @> '[{"stage": "Closing"}]'::jsonb
          THEN 1
        END
      )`.as("closedDealsCount"),
			conversionRate: sql<number>`CASE
        WHEN COUNT(*) = 0 THEN 0
        ELSE ROUND(
          SUM(
            CASE
              WHEN ${deal.dealContributors}::jsonb @> '[{"stage": "Closing"}]'::jsonb
              THEN 1 ELSE 0
            END
          )::decimal / COUNT(*) * 100, 2
        )
      END`.as("conversionRate"),
			totalContractValue: sql<number>`SUM((${deal.contractValue})::numeric)`.as(
				"totalContractValue",
			),
			dealsCount: sql<number>`COUNT(${deal.id})`.as("dealsCount"),
			deals: sql<
				{ id: string; companyLogo: string }[]
			>`json_agg(json_build_object('id', ${deal.id}, 'companyLogo', ${deal.companyLogo}))`.as(
				"deals",
			),
			user: {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				image: user.image,
				emailVerified: user.emailVerified,
			},
		})
		.from(deal)
		.innerJoin(user, sql`${deal.userId} = ${user.id}`)
		.where(
			sql`${deal.updatedAt} >= date_trunc('month', now()) AND ${deal.updatedAt} < date_trunc('month', now()) + interval '1 month'`,
		)
		.groupBy(
			user.id,
			user.name,
			user.username,
			user.image,
			user.emailVerified,
			user.email,
		)
		.orderBy(
			sql`
      COUNT(
        CASE
          WHEN ${deal.dealContributors}::jsonb @> '[{"stage": "Closing"}]'::jsonb
          THEN 1
        END
      ) DESC
    `,
		);

	const [userData, usersWithClosedDeals] = await Promise.all([
		getMe(),
		usersWithClosedDealsFn,
	]);

	const filteredUsers = usersWithClosedDeals.filter((deal) =>
		compareEmailsDomain(deal.user.email, userData.email),
	);

	return filteredUsers;
};
