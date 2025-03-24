import { auth } from "@/lib/auth";
import { UnauthorizedError } from "@api/error/unauthorized";
import Elysia from "elysia";

export const betterAuthMiddleware = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ request: { headers } }) {
        const session = await auth.api.getSession({ headers });

        if (!session) {
          throw new UnauthorizedError("You don't have access");
        }

        return session;
      },
    },
  });
