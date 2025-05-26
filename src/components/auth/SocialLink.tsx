"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import type { SocialLinkOption } from "./OauthOptions";
import env from "@/config/env";

const SocialLink = ({ option }: { option: SocialLinkOption }) => {
	const router = useRouter();

	const signIn = async () => {
		if (option.isOAuth2) {
			const { data } = await authClient.signIn.oauth2({
				providerId: option.provider,
				callbackURL: "/home",
				errorCallbackURL: `${env.NEXT_PUBLIC_BASE_URL}/register`
			});
			if (data?.url) {
				router.push(data.url);
			}
			return;
		}

		const { data } = await authClient.signIn.social({
			provider: option.provider as Exclude<
				SocialLinkOption["provider"],
				"slack"
			>,
			callbackURL: "/home",
			errorCallbackURL: `${env.NEXT_PUBLIC_BASE_URL}/register`
		});
		if (data?.url) {
			router.push(data.url);
		}
	};

	return (
		<button
			key={option.name}
			className="border-border bg-background flex size-16 cursor-pointer items-center justify-center rounded-lg border p-2"
			title={option.name}
			onClick={signIn}
			type="button"
		>
			<Image
				src={option.image}
				alt={option.name}
				width={24}
				height={24}
				className="object-cover"
			/>
		</button>
	);
};

export default SocialLink;
