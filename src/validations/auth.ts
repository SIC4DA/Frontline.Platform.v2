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
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be a string",
    })
    .min(2, {
      message: "Username should be between 2 and 100 characters long",
    })
    .max(100, {
      message: "Username should be between 2 and 100 characters long",
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
  companyName: z
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
  image: z.optional(
    z
      .string({
        invalid_type_error: "Image URL should be a string",
      })
      .url({
        message: "Image URL should be a valid URL",
      }),
  ),
});
