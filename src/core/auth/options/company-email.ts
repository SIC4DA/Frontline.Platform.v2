import env from "@/config/env";
import { TEST_CONSTANTS } from "@/constants/test";
import { sendEmail } from "@/services/mailer";

import type { CompanyEmailOptions } from "../plugins/company-email/types";

export const companyEmailOptions: CompanyEmailOptions = {
  expiresIn: 60 * 60,
  allowedEmails: [
    "technozone019@gmail.com",
    "voka5050@gmail.com",
    "abdelsalammohamed31@outlook.com",
    "dhyon06@gmail.com",
  ],
  registerTokenExpiry: 60 * 60,
  ...(env.NODE_ENV === "test" && { generateToken: async () => TEST_CONSTANTS.TOKEN }),
  sendCompanyEmailVerification: async ({ email, url, token }) => {
    if (env.NODE_ENV === "test") return;
    await sendEmail("companyEmailVerification", { to: email, url, token });
  },
};
