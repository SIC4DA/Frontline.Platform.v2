import Image from "next/image";
import React from "react";

const options = [
  {
    name: "Google",
    image: "/images/google.webp",
  },
  {
    name: "Teams",
    image: "/images/teams.webp",
  },
  {
    name: "Linkedin",
    image: "/images/linkedin.webp",
  },
  {
    name: "Slack",
    image: "/images/slack.webp",
  },
  {
    name: "Office 365",
    image: "/images/office.webp",
  },
];

const OauthOptions = () => {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap mt-14 w-full">
      {options.map((option, i) => (
        <button
          key={i}
          className="rounded-lg border border-border p-2 size-16 flex items-center justify-center bg-background cursor-pointer"
          title={option.name}
        >
          <Image
            src={option.image}
            alt={option.name}
            width={24}
            height={24}
            className="object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default OauthOptions;
