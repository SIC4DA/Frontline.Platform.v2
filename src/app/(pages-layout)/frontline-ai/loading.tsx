import Loader from "@/components/shared/Loader";


export default function loading() {
  return (
    <section className="flex h-dvh items-center justify-center px-8 py-3.5 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <Loader />
    </section>
  );
}
