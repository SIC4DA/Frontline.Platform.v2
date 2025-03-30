import Loader from "@/components/shared/Loader";

export default function VerifyEmailLoading() {
  return (
    <section className="flex w-full flex-grow items-center justify-center">
      <Loader />
    </section>
  );
}
