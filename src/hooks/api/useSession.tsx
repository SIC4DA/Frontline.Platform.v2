import { authClient } from "@/lib/auth-client";
import type { Session, User } from "@/lib/auth.types";
import { useEffect, useState } from "react";

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
