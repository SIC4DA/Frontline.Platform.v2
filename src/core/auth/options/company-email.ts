import { sendEmail } from "@/services/mailer";
import type { CompanyEmailOptions } from "company-email-better-auth";

export const companyEmailOptions: CompanyEmailOptions = {
  expiresIn: 60 * 60,
  allowedEmails: ["technozone019@gmail.com", "voka5050@gmail.com"],
  async sendEmailVerification({ email, url, token }) {
    await sendEmail("companyEmailVerification", { to: email, url, token });
  },
};
