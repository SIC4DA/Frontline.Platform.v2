import { defineConfig } from "cypress";
import "dotenv/config";
import { eq } from "drizzle-orm";

import env from "@/config/env";

import { db } from "./src/core/db";
import { user, verification } from "./src/core/db/schema";

export default defineConfig({
  e2e: {
    baseUrl: env.NEXT_BASE_URL,
    setupNodeEvents(on) {
      on("task", {
        removeRegisteredUser: async (email: string): Promise<null> => {
          await Promise.all([
            db.delete(user).where(eq(user.email, email)),
            db.delete(verification).where(eq(verification.value, email)),
          ]);

          return null;
        },
        resetDb: async (): Promise<null> => {
          await Promise.all([db.delete(verification), db.delete(user)]);

          return null;
        },
      });
    },
  },
});

