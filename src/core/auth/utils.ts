type OAuthProfile = Partial<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  image: string;
  company: string;
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
    company: "",
    emailVerified: true,
  },
) => profile;
