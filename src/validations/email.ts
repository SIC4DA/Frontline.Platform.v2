import CompanyEmailValidator from "company-email-validator";

const ALLOWED_EMAILS = [
  "technozone019@gmail.com",
  "voka5050@gmail.com",
  "abdelsalammohamed31@outlook.com",
  "dhyon06@gmail.com",
];

export const validateCompanyEmail = (email: string): boolean => {
  if (ALLOWED_EMAILS.includes(email)) {
    return true;
  }

  const isEmailValid = CompanyEmailValidator.isCompanyEmail(email);

  return isEmailValid;
};

export const compareEmailsDomain = (email: string, secondEmail: string) => {
  if (ALLOWED_EMAILS.includes(email)) {
    return true;
  }

  const emailDomain = email.split("@")[1];
  const secondEmailDomain = secondEmail.split("@")[1];
  const isDomainValid = emailDomain === secondEmailDomain;

  return isDomainValid;
};
