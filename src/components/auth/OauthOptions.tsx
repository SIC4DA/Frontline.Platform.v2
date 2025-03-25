"use client";

import SocialLink from "./SocialLink";

export type SocialLinkOption = {
  name: string;
  image: string;
  provider: "google" | "microsoft" | "linkedin" | "slack";
  isOAuth2: boolean;
};

const options: SocialLinkOption[] = [
  {
    name: "Google",
    image: "/images/google.webp",
    provider: "google",
    isOAuth2: false,
  },
  {
    name: "Teams",
    image: "/images/teams.webp",
    provider: "microsoft",
    isOAuth2: false,
  },
  {
    name: "Linkedin",
    image: "/images/linkedin.webp",
    provider: "linkedin",
    isOAuth2: false,
  },
  {
    name: "Slack",
    image: "/images/slack.webp",
    provider: "slack",
    isOAuth2: true,
  },
  {
    name: "Office 365",
    image: "/images/office.webp",
    provider: "microsoft",
    isOAuth2: false,
  },
];

const OauthOptions = () => {
  return (
    <div className="mt-14 flex w-full flex-wrap items-center justify-around gap-3 sm:justify-between">
      {options.map((option) => (
        <SocialLink key={option.name} option={option} />
      ))}
    </div>
  );
};

export default OauthOptions;
