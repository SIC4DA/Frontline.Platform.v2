import { TriangleAlert } from "lucide-react";

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="mb-5 grid grid-cols-[auto_1fr] items-center gap-5 rounded-4xl border-2 border-white bg-gradient-to-b from-[#FFEDEC] to-[#FDFDFD] px-10 py-3 shadow">
      <div className="flex size-16 items-center justify-center rounded-full border-2 border-white shadow">
        <TriangleAlert fill="#FF3A3D" stroke="#fff" size={30} />
      </div>
      <p>{errorMessage}</p>
    </div>
  );
};

export default FormError;
