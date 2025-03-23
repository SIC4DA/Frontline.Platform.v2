import { REGEX } from "@/constants/regex";
import { t } from "elysia";

enum VerificationOtpType {
  EmailVerification = "email-verification",
  ForgetPassword = "forget-password",
  SignIn = "sign-in",
}

export const signUpEmailValidation = t.Object({
  name: t.String({
    error: "Name should be between 2 and 100 characters long",
    minLength: 2,
    maxLength: 100,
  }),
  firstName: t.String({
    error: "First name should be between 2 and 100 characters long",
    minLength: 2,
    maxLength: 100,
  }),
  lastName: t.String({
    error: "Last name should be between 2 and 100 characters long",
    minLength: 2,
    maxLength: 100,
  }),
  email: t.String({
    error: "Invalid email",
    pattern: REGEX.EMAIL_REGEX,
  }),
  password: t.String({
    error:
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    minLength: 8,
    pattern: REGEX.PASSWORD_REGEX,
  }),
  company: t.String({
    error: "Company name should be between 2 and 100 characters long",
    minLength: 2,
    maxLength: 100,
  }),
  imageUrl: t.Optional(
    t.String({
      error: "Image URL should be a valid URL",
      pattern: REGEX.URL_REGEX,
    }),
  ),
  // department: t.String({
  //   error: "Department should be between 2 and 100 characters long",
  //   minLength: 2,
  //   maxLength: 100,
  // }),
  // jobTitle: t.String({
  //   error: "Job title should be between 2 and 100 characters long",
  //   minLength: 2,
  //   maxLength: 100,
  // }),
  // companyUrl: t.String({
  //   error: "Company URL should be a valid URL",
  //   pattern: REGEX.URL_REGEX,
  // }),
  // country: t.String({
  //   error: "Country should be between 2 and 100 characters long",
  //   minLength: 2,
  //   maxLength: 100,
  // }),
});

export const signInEmailValidation = t.Object({
  email: t.String({ error: "Invalid email" }),
  password: t.String({ error: "Invalid password" }),
});

export const sendVerificationOtpValidation = t.Object({
  email: t.String({
    error: "Invalid email",
    pattern: REGEX.EMAIL_REGEX,
  }),
  type: t.Enum(VerificationOtpType, {
    error:
      "Invalid type, must be 'email-verification', 'forget-password' or 'sign-in'",
  }),
});

export const verifyEmailValidation = t.Object({
  email: t.String({
    error: "Invalid email",
    pattern: REGEX.EMAIL_REGEX,
  }),
  otp: t.String({ error: "Code is required", minLength: 6, maxLength: 6 }),
});

export const forgetPasswordValidation = t.Object({
  email: t.String({
    error: "Invalid email",
    pattern: REGEX.EMAIL_REGEX,
  }),
});

export const resetPasswordValidation = t.Object({
  email: t.String({
    error: "Invalid email",
    pattern: REGEX.EMAIL_REGEX,
  }),
  otp: t.String({ error: "Code is required", minLength: 6, maxLength: 6 }),
  password: t.String({
    error: "Password should be at least 6 characters long",
    minLength: 6,
    pattern: REGEX.PASSWORD_REGEX,
  }),
});

export const signInSocialValidation = t.Object({
  provider: t.String({ error: "Provider is required" }),
  callbackURL: t.String({ error: "Callback URL is required" }),
});
