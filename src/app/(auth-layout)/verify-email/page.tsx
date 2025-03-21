import Loader from "@/components/shared/Loader";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token, email } = await searchParams;

  if (!token || !email) {
    return redirect("/register");
  }

  // const { error } = await authClient.verifyEmail({
  //   token: token,
  //   email: email,
  // });

  // if (error) {
  //   return redirect(`/register?error=${error.message}`);
  // }

  redirect(`/onboarding?email=${email}`);
}
