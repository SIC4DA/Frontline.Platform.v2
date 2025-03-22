import { REGEX } from "@/constants/regex";
import { t } from "elysia";

enum VerificationOtpType {
  EmailVerification = "email-verification",
  ForgetPassword = "forget-password",
  SignIn = "sign-in",
}

export const signUpEmailValidation = t.Object({
  name: t.String({ error: "Name is required" }),
  firstName: t.String({ error: "First name is required" }),
  lastName: t.String({ error: "Last name is required" }),
  email: t.String({
    error: "Email is required",
    pattern: REGEX.EMAIL_REGEX,
  }),
  password: t.String({ error: "Password is required", minLength: 6 }),
  company: t.String({ error: "Company is required" }),
  department: t.String({ error: "Department is required" }),
  jobTitle: t.String({ error: "Job title is required" }),
  companyUrl: t.String({
    error: "Company URL is required",
    pattern: REGEX.URL_REGEX,
  }),
  country: t.String({ error: "Country is required" }),
});

export const signInEmailValidation = t.Object({
  email: t.String({
    error: "Email is required",
  }),
  password: t.String({
    error: "Password is required",
    minLength: 6,
    pattern: REGEX.PASSWORD_REGEX,
  }),
});

export const sendVerificationOtpValidation = t.Object({
  email: t.String({
    error: "Email is required",
    pattern: REGEX.EMAIL_REGEX,
  }),
  type: t.Enum(VerificationOtpType, {
    error:
      "Invalid type, must be 'email-verification', 'forget-password' or 'sign-in'",
  }),
});

export const verifyEmailValidation = t.Object({
  email: t.String({
    error: "Email is required",
    pattern: REGEX.EMAIL_REGEX,
  }),
  otp: t.String({ error: "Code is required", minLength: 6, maxLength: 6 }),
});

export const forgetPasswordValidation = t.Object({
  email: t.String({
    error: "Email is required",
    pattern: REGEX.EMAIL_REGEX,
  }),
});

export const resetPasswordValidation = t.Object({
  email: t.String({
    error: "Email is required",
    pattern: REGEX.EMAIL_REGEX,
  }),
  otp: t.String({ error: "Code is required", minLength: 6, maxLength: 6 }),
  password: t.String({
    error: "Password is required",
    minLength: 6,
    pattern: REGEX.PASSWORD_REGEX,
  }),
});

export const signInSocialValidation = t.Object({
  provider: t.String({ error: "Provider is required" }),
  callbackURL: t.String({ error: "Callback URL is required" }),
});
