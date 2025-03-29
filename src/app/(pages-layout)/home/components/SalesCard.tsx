import { Sale } from "@/types/sales";
import { CircleCheck, Crosshair, User, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ConfidenceProgress from "./ConfidenceProgress";
import StageChip from "./StageChip";

const SalesCard = ({ sale }: { sale: Sale }) => {
  const t = useTranslations("home");

  const salesData = [
    {
      title: t("stage"),
      value: <StageChip stage={sale.stage} />,
      icon: <Crosshair size={20} className="text-foreground-secondary" />,
    },
    {
      title: t("contactPerson"),
      value: sale.contactPerson,
      icon: <User size={20} className="text-foreground-secondary" />,
    },
    {
      title: t("contract"),
      value: `$${sale.contract}`,
      icon: <Wallet size={20} className="text-foreground-secondary" />,
    },
    {
      title: t("confidence"),
      value: <ConfidenceProgress confidence={sale.confidence} />,
      icon: <CircleCheck size={20} className="text-foreground-secondary" />,
    },
  ];

  return (
    <div className="border-border rounded-lg border px-5 py-6 max-sm:px-4">
      <div className="mb-10 flex items-center gap-3">
        <Image
          src="/images/google.webp"
          alt="google"
          width={34}
          height={34}
          className="aspect-square w-8 object-cover"
        />
        <div>
          <h4 className="text-sm font-medium capitalize">{sale.company}</h4>
          <p className="text-foreground-secondary text-xs">{sale.field}</p>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        {salesData.map((data) => (
          <div
            className="flex items-center justify-between gap-1 text-sm"
            key={data.title}
          >
            <div className="flex items-center gap-2">
              {data.icon}
              <p className="text-foreground-secondary capitalize">
                {data.title}
              </p>
            </div>
            <div className="flex w-full max-w-32 items-center justify-center text-center font-medium">
              {data.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesCard;
