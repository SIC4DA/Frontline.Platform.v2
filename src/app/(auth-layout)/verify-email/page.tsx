import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/tryCatch";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { token, email } = await searchParams;

  if (!token || !email) {
    return redirect("/register");
  }

  const { error, data } = await tryCatch(
    auth.api.verifyCompanyEmailVerification({
      query: {
        token,
      },
    }),
  );

  if (error) {
    return redirect(`/register?error=${error.message}`);
  }

  redirect(`/onboarding?email=${email}&token=${data.token}`);
}
