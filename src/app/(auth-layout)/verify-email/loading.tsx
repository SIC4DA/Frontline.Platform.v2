import Loader from '@/components/shared/Loader';


export default function VerifyEmailLoading() {
  return (
    <section className="w-full flex items-center justify-center flex-grow">
      <Loader />
    </section>
  );
}
