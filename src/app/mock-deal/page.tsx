import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

// import Confetti from "@/components/shared/Confetti";
// import FadeInView from "@/components/shared/FadeInView";

const FadeInView = dynamic(() => import("@/components/shared/FadeInView"));
const Confetti = dynamic(() => import("@/components/shared/Confetti"));
import { getDealWithUserAnalytics } from "@/services/deal";

// import DealSummary from "../(pages-layout)/deal/[id]/components/DealSummary";
// import Header from "../(pages-layout)/deal/[id]/components/Header";
// import SignupCard from "../(pages-layout)/deal/[id]/components/SignupCard";
// import ContractInfo from "../(pages-layout)/deal/[id]/components/contract-info/ContractInfo";
// import ProductInfo from "../(pages-layout)/deal/[id]/components/product-info/ProductInfo";
// import SalesProcessInfo from "../(pages-layout)/deal/[id]/components/sales-process-info/SalesProcessInfo";
// import UserCard from "../(pages-layout)/deal/[id]/components/user-card/UserCard";
// import UserCardWrapper from "../(pages-layout)/deal/[id]/components/user-card/UserCardWrapper";

const DealSummary = dynamic(() => import("../(pages-layout)/deal/[id]/components/DealSummary"));
const Header = dynamic(() => import("../(pages-layout)/deal/[id]/components/Header"));
const SignupCard = dynamic(() => import("../(pages-layout)/deal/[id]/components/SignupCard"));
const ContractInfo = dynamic(() => import("../(pages-layout)/deal/[id]/components/contract-info/ContractInfo"));
const ProductInfo = dynamic(() => import("../(pages-layout)/deal/[id]/components/product-info/ProductInfo"));
const SalesProcessInfo = dynamic(() => import("../(pages-layout)/deal/[id]/components/sales-process-info/SalesProcessInfo"));
const UserCard = dynamic(() => import("../(pages-layout)/deal/[id]/components/user-card/UserCard"));
const UserCardWrapper = dynamic(() => import("../(pages-layout)/deal/[id]/components/user-card/UserCardWrapper"));


type DealWithUserAnalytics = Awaited<ReturnType<typeof getDealWithUserAnalytics>>;

const data: DealWithUserAnalytics = {
  user: {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    name: "youssef khaled m",
    email: "voka5050@gmail.com",
    emailVerified: true,
    image: "https://res.cloudinary.com/dzjto7pvb/image/upload/v1749768568/profile/jeudl5b3xujsos6au9gc.jpg",
    createdAt: new Date("2025-05-15T10:00:00.000Z"),
    updatedAt: new Date("2025-05-15T10:00:00.000Z"),
    role: "user",
    banned: null,
    banReason: null,
    banExpires: null,
    username: "mockuser",
    displayUsername: "Mock User",
    bio: "I enjoy solving complex problems and collaborating with innovative teams.",
    jobTitle: "Senior Account Manager",
    companyName: "Mastercard",
    companyLogo:
      "https://cdn.brandfetch.io/idFw8DodCr/w/128/h/128/fallback/lettermark/icon.webp?c=1ax1749599271862bfumLaCV7mfQ4ZuGdd",
    userAccountProviders: ["credential"],
  },
  deal: {
    id: "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
    chatId: "098fe7d6-c5b4-a321-0fed-cba987654321",
    userId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    privateId: "mock-deal-12345",
    companyName: "Accenture",
    companyLogo:
      "https://cdn.brandfetch.io/idGJDqQ72Q/w/128/h/128/fallback/lettermark/icon.webp?c=1ax1749599426641bfumLaCV7mV5yHeWlI",
    companySummary:
      "Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries, they offer Strategy and Consulting, Technology and Operations services, and Accenture Song—all powered by the world’s largest network of Advanced Technology and Intelligent Operations centers.",
    companyIndustry: "Consulting",
    employeeHeadcount: 730000,
    companyWebsite: "https://www.accenture.com",
    contractValue: 5000000,
    contractTerm: "5 years",
    contractStartDate: "08-01-2025",
    contractEndDate: "08-01-2030",
    contractSigner: "Jane Doe",
    paymentTerms: "annual",
    productName: "Software Solutions Suite",
    productUseCases: ["Process Automation", "Data Analytics", "Cloud Migration"],
    painPoints: ["Inefficient manual processes", "Lack of data-driven insights", "Outdated infrastructure"],
    keyStakeholders: [
      {
        name: "John Smith",
        title: "Chief Technology Officer",
      },
      {
        name: "Sarah Chen",
        title: "Head of Operations",
      },
    ],
    salesSource: "inbound lead",
    salesCycleLength: "9 months",
    dealContributors: [
      {
        stage: "Prospecting",
        contributors: [
          {
            name: "Alice Johnson",
            title: "Sales Development Representative",
            shoutout: "For identifying and qualifying high-potential leads!",
          },
          {
            name: "Bob Smith",
            title: "Marketing Specialist",
            shoutout: "For creating compelling content that attracted initial interest.",
          },
          {
            name: "David Lee",
            title: "Data Analyst",
            shoutout: "For providing valuable insights from lead scoring and segmentation.",
          },
        ],
      },
      {
        stage: "Discovery",
        contributors: [
          {
            name: "Charlie Brown",
            title: "Account Executive",
            shoutout: "For conducting thorough needs analysis and understanding client pain points.",
          },
          {
            name: "Diana Prince",
            title: "Solutions Engineer",
            shoutout: "For providing initial technical insights and answering complex questions.",
          },
        ],
      },
      {
        stage: "Demo",
        contributors: [
          {
            name: "Eve Adams",
            title: "Product Manager",
            shoutout: "For crafting an engaging and relevant product demonstration.",
          },
          {
            name: "Frank White",
            title: "UX Designer",
            shoutout: "For ensuring the demo environment was intuitive and visually appealing.",
          },
          {
            name: "George King",
            title: "Technical Sales Specialist",
            shoutout: "For flawlessly handling complex technical demonstrations and Q&A.",
          },
          {
            name: "Hannah Miller",
            title: "Content Strategist",
            shoutout: "For developing supporting materials that enhanced the demo experience.",
          },
        ],
      },
      {
        stage: "Negotiation",
        contributors: [
          {
            name: "Grace Lee",
            title: "Sales Manager",
            shoutout: "For expertly guiding the pricing and terms discussions.",
          },
          {
            name: "Henry Green",
            title: "Legal Counsel",
            shoutout: "For ensuring all contractual agreements were robust and fair.",
          },
        ],
      },
      {
        stage: "Contracting",
        contributors: [
          {
            name: "Ivy Black",
            title: "Contracts Specialist",
            shoutout: "For diligently preparing and processing all necessary paperwork.",
          },
          {
            name: "Jack Taylor",
            title: "Operations Coordinator",
            shoutout: "For streamlining the internal approval process.",
          },
        ],
      },
      {
        stage: "Closing",
        contributors: [
          {
            name: "Karen Chen",
            title: "VP of Sales",
            shoutout: "For providing strategic oversight and securing the final commitment!",
          },
          {
            name: "Liam Scott",
            title: "Customer Success Manager",
            shoutout: "For laying the groundwork for a successful client onboarding experience.",
          },
          {
            name: "Mia Rodriguez",
            title: "Financial Analyst",
            shoutout: "For meticulously reviewing financial terms and ensuring profitability.",
          },
          {
            name: "Noah Davis",
            title: "Executive Sponsor",
            shoutout: "For stepping in to provide high-level assurance and close the deal!",
          },
        ],
      },
    ],
    createdAt: new Date("2025-05-20T14:30:00.000Z"),
    updatedAt: new Date("2025-05-20T14:30:00.000Z"),
  },
  analytics: {
    closedDealsCount: 3,
    totalEarned: 10000000,
    averageDealSize: 3333333,
    averageDealCycle: 8,
  },
};

export default function MockDealPage() {
  if (!data) return null;

  const { user, deal, analytics } = data;

  return (
    <section className="relative min-h-dvh max-w-full overflow-x-hidden overflow-y-clip bg-[#F6FAFF] px-8 py-16 max-md:px-5 max-sm:px-4 max-sm:pb-24">
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
      <Header user={user} isShared />
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
