// import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

import dynamic from "next/dynamic";
// import Confetti from "@/components/shared/Confetti";
// import FadeInView from "@/components/shared/FadeInView";
const Confetti = dynamic(() => import("@/components/shared/Confetti"));
const FadeInView = dynamic(() => import("@/components/shared/FadeInView"));

import RequestError from "@/components/shared/RequestError";
import { getDealWithUserAnalytics } from "@/services/deal";
import { tryCatch } from "@/utils/tryCatch";

// import DealSummary from "./components/DealSummary";
// import Header from "./components/Header";
// import SignupCard from "./components/SignupCard";
// import ContractInfo from "./components/contract-info/ContractInfo";
// import ProductInfo from "./components/product-info/ProductInfo";
// import SalesProcessInfo from "./components/sales-process-info/SalesProcessInfo";
// import UserCard from "./components/user-card/UserCard";
// import UserCardWrapper from "./components/user-card/UserCardWrapper";

const DealSummary = dynamic(() => import("./components/DealSummary"));
const Header = dynamic(() => import("./components/Header"));
const SignupCard = dynamic(() => import("./components/SignupCard"));
const ContractInfo = dynamic(() => import("./components/contract-info/ContractInfo"));
const ProductInfo = dynamic(() => import("./components/product-info/ProductInfo"));
const SalesProcessInfo = dynamic(() => import("./components/sales-process-info/SalesProcessInfo"));
const UserCard = dynamic(() => import("./components/user-card/UserCard"));
const UserCardWrapper = dynamic(() => import("./components/user-card/UserCardWrapper"));

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
    <section className="relative min-h-dvh max-w-full overflow-x-hidden overflow-y-clip bg-[#F6FAFF] px-8 py-16 pb-64 max-md:px-5 max-sm:px-4 max-sm:pb-32">
      <Confetti />
      <Image
        src="/images/deal-summary_hero.svg"
        alt="Hero Background"
        draggable="false"
        className="absolute -top-52 left-0 h-auto w-full min-w-[1950px] select-none"
        width={1920}
        height={1080}
        priority
      />
      <Header user={user} privateId={deal.privateId} />
      <div className="relative z-[1] mx-auto max-w-[1069px]">
        <FadeInView direction="none">
          <DealSummary userCompanyLogo={user?.companyLogo} dealCompanyLogo={deal?.companyLogo} />
        </FadeInView>
        <FadeInView direction="down" movement={50}>
          <UserCardWrapper>
            <UserCard user={user} analytics={analytics} />
          </UserCardWrapper>
        </FadeInView>
        <FadeInView>
          <ContractInfo deal={deal} />
        </FadeInView>
        <FadeInView>
          <ProductInfo deal={deal} />
        </FadeInView>
        <FadeInView>
          <SalesProcessInfo deal={deal} />
        </FadeInView>
        <FadeInView>
          <SignupCard />
        </FadeInView>
      </div>
    </section>
  );
}
