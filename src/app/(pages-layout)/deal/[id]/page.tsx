import Image from "next/image";
import React from "react";

import RequestError from "@/components/shared/RequestError";
import { getDealWithUserAnalytics } from "@/services/deal";
import { tryCatch } from "@/utils/tryCatch";

import DealSummary from "./components/DealSummary";
import Header from "./components/Header";
import SignupCard from "./components/SignupCard";
import ContractInfo from "./components/contract-info/ContractInfo";
import ProductInfo from "./components/product-info/ProductInfo";
import SalesProcessInfo from "./components/sales-process-info/SalesProcessInfo";
import UserCard from "./components/user-card/UserCard";
import UserCardWrapper from "./components/user-card/UserCardWrapper";

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await tryCatch(getDealWithUserAnalytics(id));

  if (error || !data || data?.deal?.dealContributors?.at(-1)?.stage !== "Closing") {
    return (
      <section className="flex min-h-dvh items-center justify-center px-8 py-3.5 max-sm:px-2">
        <RequestError />
      </section>
    );
  }

  const { user, deal, analytics } = data;

  return (
    <section className="relative min-h-dvh max-w-full overflow-x-hidden overflow-y-clip bg-[#F6FAFF] px-8 py-12 max-md:px-5 max-sm:px-4 max-sm:pb-24">
      <Image
        src="/images/deal-summary_hero.svg"
        alt="Hero Background"
        draggable="false"
        className="absolute -top-52 left-0 h-auto w-full min-w-[1950px]"
        width={10000}
        height={10000}
        priority
      />
      <div className="relative z-[1] mx-auto max-w-[1055px]">
        <Header user={user} />
        <DealSummary userCompanyLogo={user?.companyLogo} dealCompanyLogo={deal?.companyLogo} />
        <UserCardWrapper>
          <UserCard user={user} analytics={analytics} />
        </UserCardWrapper>
        <ContractInfo deal={deal} />
        <ProductInfo deal={deal} />
        <SalesProcessInfo deal={deal} />
        <SignupCard />
      </div>
    </section>
  );
}
