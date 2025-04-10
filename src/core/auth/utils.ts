type OAuthProfile = Partial<{
  id: string;
  email: string;
  name: string;
  username: string;
  image: string;
  companyName: string;
  companyLogo: string;
  emailVerified: boolean;
}>;

export const mapOAuthProfile = (profile: OAuthProfile) => ({
  id: "",
  email: "",
  name: "",
  username: "",
  image: "",
  companyName: "",
  companyLogo: "",
  emailVerified: true,
  ...profile,
});
