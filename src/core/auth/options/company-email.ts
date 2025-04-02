import type { CompanyEmailOptions } from "../plugins/company-email/types";

import { sendEmail } from "@/services/mailer";

export const companyEmailOptions: CompanyEmailOptions = {
  expiresIn: 60 * 60,
  allowedEmails: [
    "technozone019@gmail.com",
    "voka5050@gmail.com",
    "abdelsalammohamed31@outlook.com",
  ],
  registerTokenExpiry: 60 * 60,
  sendCompanyEmailVerification: async ({ email, url, token }) => {
    await sendEmail("companyEmailVerification", { to: email, url, token });
  },
};
