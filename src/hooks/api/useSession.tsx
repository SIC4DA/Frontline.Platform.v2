import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import type { Session } from "@/lib/auth.types";
import type { User } from "@/types/user";

type SessionData = {
	data: { user: User; session: Session } | null;
	error: {
		message?: string;
		status: number;
		statusText: string;
	} | null;
};

export const useSession = () => {
	const [data, setData] = useState<SessionData | null>();

	useEffect(() => {
		const fetchData = async () => {
			const data = (await authClient.getSession()) as SessionData;
			setData(data);
		};
		fetchData();
	}, []);

	return {
		data: data?.data,
		error: data?.error,
		isLoading: !data,
	};
};
