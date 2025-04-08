type OAuthProfile = Partial<{
  id: string;
  email: string;
  name: string;
  username: string;
  image: string;
  company: string;
  emailVerified: boolean;
}>;

export const mapOAuthProfile = (
  profile: OAuthProfile = {
    id: "",
    email: "",
    name: "",
    username: "",
    image: "",
    company: "",
    emailVerified: true,
  },
) => {
  if (!profile.username || profile.username === profile.name) {
    profile.username = profile.username?.split(" ").join("_").toLowerCase();
  }

  return profile;
};
