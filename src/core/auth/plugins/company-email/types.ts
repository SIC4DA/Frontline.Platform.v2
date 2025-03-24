export type CompanyEmailOptions = {
  expiresIn?: number;
  disableCleanup?: boolean;
  allowedEmails?: string[];
  generateToken?: () => Promise<string> | string;
  registerTokenExpiry?: number;
  sendCompanyEmailVerification: (options: {
    email: string;
    url: string;
    token: string;
  }) => Promise<void>;
};
