import { z } from "zod";

export const signUpEmailValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(2, {
      message: "Name should be between 2 and 100 characters long",
    })
    .max(100, {
      message: "Name should be between 2 and 100 characters long",
    }),
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name should be a string",
    })
    .min(2, {
      message: "First name should be between 2 and 100 characters long",
    })
    .max(100, {
      message: "First name should be between 2 and 100 characters long",
    }),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name should be a string",
    })
    .min(2, {
      message: "Last name should be between 2 and 100 characters long",
    })
    .max(100, {
      message: "Last name should be between 2 and 100 characters long",
    }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be a string",
    })
    .min(8, {
      message:
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .refine(
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUpperCase && hasLowerCase && hasNumber;
      },
      {
        message:
          "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      },
    ),
  company: z
    .string({
      required_error: "Company name is required",
      invalid_type_error: "Company name should be a string",
    })
    .min(2, {
      message: "Company name should be between 2 and 100 characters long",
    })
    .max(100, {
      message: "Company name should be between 2 and 100 characters long",
    }),
  imageUrl: z.optional(
    z
      .string({
        invalid_type_error: "Image URL should be a string",
      })
      .url({
        message: "Image URL should be a valid URL",
      }),
  ),
});

export const signInEmailValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be a string",
    })
    .min(8, {
      message: "Password should be at least 8 characters long",
    }),
});

export const sendVerificationOtpValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({
      message: "Invalid email",
    }),
  type: z.enum(["email-verification", "forget-password", "sign-in"], {
    required_error: "Type is required",
    invalid_type_error:
      "Type should be one of 'email-verification', 'forget-password' or 'sign-in'",
  }),
});

export const verifyEmailValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({
      message: "Invalid email",
    }),
  otp: z
    .string({
      required_error: "Code is required",
      invalid_type_error: "Code should be a string",
    })
    .min(6, {
      message: "Code should be at least 6 characters long",
    })
    .max(6, {
      message: "Code should be at most 6 characters long",
    }),
});

export const forgetPasswordValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({
      message: "Invalid email",
    }),
});

export const resetPasswordValidation = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({
      message: "Invalid email",
    }),
  otp: z
    .string({
      required_error: "Code is required",
      invalid_type_error: "Code should be a string",
    })
    .min(6, {
      message: "Code should be at least 6 characters long",
    })
    .max(6, {
      message: "Code should be at most 6 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be a string",
    })
    .min(8, {
      message:
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .refine(
      (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        return hasUpperCase && hasLowerCase && hasNumber;
      },
      {
        message:
          "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      },
    ),
});

export const signInSocialValidation = z.object({
  provider: z.string({
    required_error: "Provider is required",
    invalid_type_error: "Provider should be a string",
  }),
  callbackURL: z.string({
    required_error: "Callback URL is required",
    invalid_type_error: "Callback URL should be a string",
  }),
});
