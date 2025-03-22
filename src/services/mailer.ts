import type { BetterAuthError } from "better-auth";
import { APIError } from "better-auth/api";
import type { SendMailOptions } from "nodemailer";

import env from "@/config/env";
import transporter from "@/config/mailer";
import { emailTemplates } from "@/constants/email-templates";

export type TemplateName = keyof typeof emailTemplates;
type TemplateOptions = Parameters<(typeof emailTemplates)[TemplateName]>[0];

export const sendEmail = async (
  templateName: TemplateName,
  templateOptions: TemplateOptions,
  options?: Omit<SendMailOptions, "from" | "to" | "subject" | "html" | "text">,
) => {
  // @ts-expect-error templateName is a valid key of emailTemplates
  const template = emailTemplates[templateName](templateOptions);

  try {
    const info = await transporter.sendMail({
      from: env.SMTP_FROM,
      ...template,
      ...options,
    });

    return info;
  } catch (e) {
    const error = e as BetterAuthError;
    throw new APIError("INTERNAL_SERVER_ERROR", {
      message: error.message,
    });
  }
};
