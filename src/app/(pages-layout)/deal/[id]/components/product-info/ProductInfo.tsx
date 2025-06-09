import LeftCubeLink from "@public/icons/LeftCubeLink";
import MiddleCubeLink from "@public/icons/MiddleCubeLink";
import ProductCube from "@public/icons/ProductCube";
import RightCubeLink from "@public/icons/RightCubeLink";
import Stakeholder from "@public/icons/Stakeholder";
import UseCases from "@public/icons/UseCases";
import Warning from "@public/icons/Warning";
import { useTranslations } from "next-intl";

import type { Deal } from "@/types/deal";

import ProductDataCard from "./ProductDataCard";

const ProductInfo = ({ deal }: { deal: Deal | null | undefined }) => {
  const t = useTranslations("deal");
  const useCases = deal?.productUseCases ? deal?.productUseCases.split(",") : [t("noUseCases")];
  const painPoints = deal?.painPoints ? deal?.painPoints.split(",") : [t("noPainPoints")];
  const keyStakeholders =
    deal?.keyStakeholders && deal?.keyStakeholders.length > 0
      ? deal?.keyStakeholders.map((stakeholder) => `${stakeholder.name}, ${stakeholder.title}`)
      : [t("noKeyStakeholders")];

  return (
    <div className="my-60 mb-80 max-lg:mb-16">
      <h2 className="text-center text-4xl text-[#00326B]">{t("productInfo")}</h2>
      <div className="text-accent mx-auto mt-24 w-fit rounded-full bg-gradient-to-b from-[#3BBBF6] to-[#266DF0] px-14 py-1.5 capitalize">
        {deal?.productName}
      </div>
      <div className="mt-16">
        <div className="relative mx-auto w-fit max-lg:w-full">
          <ProductCube />
          <div className="max-lg:flex max-lg:w-full max-lg:flex-col max-lg:items-center max-lg:gap-10">
            {/* Left cube link */}
            <div className="absolute -bottom-5 -left-full max-xl:-left-1/2 max-lg:static max-lg:w-full">
              <div className="max-lg:hidden">
                <LeftCubeLink />
              </div>
              <div className="absolute -left-[180px] -mt-4 max-lg:static max-lg:mt-0">
                <ProductDataCard title={t("useCases")} data={useCases} icon={<UseCases />} />
              </div>
            </div>
            {/* Middle cube link */}
            <div className="absolute -bottom-[160px] left-1/2 -translate-x-1/2 max-lg:static max-lg:w-full max-lg:translate-x-0">
              <div className="max-lg:hidden">
                <MiddleCubeLink />
              </div>
              <div className="absolute -left-20 max-lg:static">
                <ProductDataCard title={t("painPoints")} data={painPoints} icon={<Warning />} />
              </div>
            </div>
            {/* Right cube link */}
            <div className="absolute -right-full -bottom-5 max-xl:-right-1/2 max-lg:static max-lg:w-full">
              <div className="max-lg:hidden">
                <RightCubeLink />
              </div>
              <div className="absolute -right-[200px] -mt-4 max-lg:static max-lg:mt-0">
                <ProductDataCard title={t("keyStakeholders")} data={keyStakeholders} icon={<Stakeholder />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
