"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type SocialLinkOption } from "./OauthOptions";

const SocialLink = ({ option }: { option: SocialLinkOption }) => {
  const router = useRouter();

  const signIn = async () => {
    if (option.isOAuth2) {
      const { data } = await authClient.signIn.oauth2({
        providerId: option.provider,
        callbackURL: "/home",
      });
      if (data?.url) {
        router.push(data.url);
      }
    } else {
      const { data } = await authClient.signIn.social({
        provider: option.provider as Exclude<SocialLinkOption["provider"], "slack">,
        callbackURL: "/home",
      });
      if (data?.url) {
        router.push(data.url);
      }
    }
  };

  return (
    <button
      key={option.name}
      className="border-border bg-background flex size-16 cursor-pointer items-center justify-center rounded-lg border p-2"
      title={option.name}
      onClick={signIn}>
      <Image src={option.image} alt={option.name} width={24} height={24} className="object-cover" />
    </button>
  );
};

export default SocialLink;
