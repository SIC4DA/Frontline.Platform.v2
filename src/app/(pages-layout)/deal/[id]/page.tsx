import Image from "next/image";
import React from "react";

import RequestError from "@/components/shared/RequestError";
import { getDeal } from "@/services/deal";
import { getMe } from "@/services/user";
import { tryCatch } from "@/utils/tryCatch";

import DealSummary from "./components/DealSummary";
import Header from "./components/Header";
import ContractInfo from "./components/contract-info/ContractInfo";
import ProductInfo from "./components/product-info/ProductInfo";
import UserCardWrapper from "./components/user-card/UserCardWrapper";

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [{ data: deal, error }, { data: user }] = await Promise.all([tryCatch(getDeal(id)), tryCatch(getMe())]);

  if (error || !deal) {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  return (
    <section className="relative min-h-dvh max-w-full overflow-x-hidden overflow-y-clip bg-[#F6FAFF] px-8 py-12 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <Image
        src="/images/deal-summary_hero.png"
        alt="Hero Background"
        draggable="false"
        className="absolute -top-52 left-0 h-auto w-full min-w-[1950px]"
        width={10000}
        height={10000}
      />
      <div className="relative z-[1] mx-auto max-w-[1055px]">
        <Header user={user} />
        <DealSummary userCompanyLogo={user?.companyLogo} dealCompanyLogo={deal?.companyLogo} />
        <UserCardWrapper user={user} />
        <ContractInfo deal={deal} />
        <ProductInfo deal={deal} />
        {/* <div className="bg-red-400 h-[2000px]"></div> */}
      </div>
    </section>
  );
}
