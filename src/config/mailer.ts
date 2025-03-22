import nodemailer from "nodemailer";

import env from "@/config/env";

const transporter = nodemailer.createTransport({
  url: env.SMTP_URL,
  secure: true,
});

export default transporter;
