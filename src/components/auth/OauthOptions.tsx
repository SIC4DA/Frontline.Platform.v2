import Image from "next/image";

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
    <div className="mt-14 flex w-full flex-wrap items-center justify-around gap-3 sm:justify-between">
      {options.map((option, i) => (
        <button
          key={i}
          className="border-border bg-background flex size-16 cursor-pointer items-center justify-center rounded-lg border p-2"
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
