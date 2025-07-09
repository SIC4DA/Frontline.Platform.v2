import Image from "next/image";
import React from "react";

import type { DealContributors } from "@/types/deal";

import ContributorsList from "./ContributorsList";

// const stages = [
//   {
//     stage: "Prospecting",
//     contributors: [
//       {
//         name: "Alice Johnson",
//         title: "Sales Development Representative",
//         shoutout: "For identifying and qualifying high-potential leads!",
//       },
//       {
//         name: "Bob Smith",
//         title: "Marketing Specialist",
//         shoutout: "For creating compelling content that attracted initial interest.",
//       },
//       {
//         name: "David Lee",
//         title: "Data Analyst",
//         shoutout: "For providing valuable insights from lead scoring and segmentation.",
//       },
//     ],
//   },
//   {
//     stage: "Discovery",
//     contributors: [
//       {
//         name: "Charlie Brown",
//         title: "Account Executive",
//         shoutout: "For conducting thorough needs analysis and understanding client pain points.",
//       },
//       {
//         name: "Diana Prince",
//         title: "Solutions Engineer",
//         shoutout: "For providing initial technical insights and answering complex questions.",
//       },
//     ],
//   },
//   {
//     stage: "Demo",
//     contributors: [
//       {
//         name: "Eve Adams",
//         title: "Product Manager",
//         shoutout: "For crafting an engaging and relevant product demonstration.",
//       },
//       {
//         name: "Frank White",
//         title: "UX Designer",
//         shoutout: "For ensuring the demo environment was intuitive and visually appealing.",
//       },
//       {
//         name: "George King",
//         title: "Technical Sales Specialist",
//         shoutout: "For flawlessly handling complex technical demonstrations and Q&A.",
//       },
//       {
//         name: "Hannah Miller",
//         title: "Content Strategist",
//         shoutout: "For developing supporting materials that enhanced the demo experience.",
//       },
//     ],
//   },
//   {
//     stage: "Negotiation",
//     contributors: [
//       {
//         name: "Grace Lee",
//         title: "Sales Manager",
//         shoutout: "For expertly guiding the pricing and terms discussions.",
//       },
//       {
//         name: "Henry Green",
//         title: "Legal Counsel",
//         shoutout: "For ensuring all contractual agreements were robust and fair.",
//       },
//     ],
//   },
//   {
//     stage: "Contracting",
//     contributors: [
//       {
//         name: "Ivy Black",
//         title: "Contracts Specialist",
//         shoutout: "For diligently preparing and processing all necessary paperwork.",
//       },
//       {
//         name: "Jack Taylor",
//         title: "Operations Coordinator",
//         shoutout: "For streamlining the internal approval process.",
//       },
//     ],
//   },
//   {
//     stage: "Closing",
//     contributors: [
//       {
//         name: "Karen Chen",
//         title: "VP of Sales",
//         shoutout: "For providing strategic oversight and securing the final commitment!",
//       },
//       {
//         name: "Liam Scott",
//         title: "Customer Success Manager",
//         shoutout: "For laying the groundwork for a successful client onboarding experience.",
//       },
//       {
//         name: "Mia Rodriguez",
//         title: "Financial Analyst",
//         shoutout: "For meticulously reviewing financial terms and ensuring profitability.",
//       },
//       {
//         name: "Noah Davis",
//         title: "Executive Sponsor",
//         shoutout: "For stepping in to provide high-level assurance and close the deal!",
//       },
//     ],
//   },
// ];

// const StagesList = ({ stages }: { stages: DealContributors }) => {
const StagesList = ({ stages }: { stages: DealContributors }) => {
  return (
    <div className="mt-64 flex flex-col px-10 max-lg:mt-40 max-lg:px-5">
      {stages.map((stage, index) => (
        <div dir={index % 2 === 0 ? "ltr" : "rtl"} key={stage.stage} className="relative">
          <div className="text-accent absolute -top-20 w-fit rounded-full bg-[#3ba3ee] px-10 py-2 capitalize">
            <h3>{stage.stage}</h3>
          </div>
          <ContributorsList contributors={stage.contributors} />
          {index !== stages.length - 1 && (
            <Image
              src="/images/process-link.svg"
              alt="Stage Divider"
              style={{
                transform: index % 2 === 0 ? "scaleX(1)" : "scaleX(-1)",
              }}
              className="mx-auto h-auto w-auto px-10"
              width={1000}
              height={1000}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StagesList;
