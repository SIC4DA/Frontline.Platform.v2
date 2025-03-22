import CompanyEmailValidator from "company-email-validator";

export const validateCompanyEmail = (email: string): boolean => {
  const isEmailValid = CompanyEmailValidator.isCompanyEmail(email);

  return isEmailValid;
};

export const compareEmailsDomain = (email: string, secondEmail: string) => {
  const emailDomain = email.split("@")[1];
  const secondEmailDomain = secondEmail.split("@")[1];
  const isDomainValid = emailDomain === secondEmailDomain;

  return isDomainValid;
};
