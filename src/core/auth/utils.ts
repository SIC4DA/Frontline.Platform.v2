type OAuthProfile = Partial<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  image: string;
  country: string;
  company: string;
  jobTitle: string;
  department: string;
  companyUrl: string;
  emailVerified: boolean;
}>;

export const mapOAuthProfile = (
  profile: OAuthProfile = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    name: "",
    image: "",
    country: "",
    company: "",
    jobTitle: "",
    department: "",
    companyUrl: "",
  },
) => profile;
