import React from "react";

const ProductDataCard = ({ title, data, icon }: { title: string; data: string[]; icon: React.ReactNode }) => {
  return (
    <div className="rounded-lg bg-gradient-to-b from-[#FFFFFF] to-[#D2E6FF] p-6 px-8">
      <div className="mx-auto mb-9 flex w-max items-center justify-center gap-2">
        <span>{icon}</span>
        <h3 className="font-medium text-[#00326B]">{title}</h3>
      </div>
      <div className="flex w-max flex-col gap-6 text-center">
        {data.map((item) => (
          <p className="text-[15px] text-[#2A87F7]" key={item}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductDataCard;
