import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

const columns = [
  {
    title: "Helpdesk features",
    links: [
      "Inbox",
      "Copilot",
      "Tickets",
      "Omnichannel",
      "Help center",
      "Apps & integrations",
      "Reporting",
      "Knowledge hub",
      "Outbound",
    ],
  },
  {
    title: "Fin features",
    links: ["Fin overview", "Capabilities", "AI engine"],
  },
  {
    title: "Learn",
    links: ["Events", "Intercom blog", "Academy", "YouTube"],
  },
  {
    title: "Support",
    links: ["Changes", "Help center", "Developer hub", "Intercom community"],
  },
  {
    title: "Partner programs",
    links: ["Solution partner", "Technology partner"],
  },
  {
    title: "Pricing",
    links: ["Intercom Suite pricing", "Fin pricing"],
  },
  {
    title: "Evaluate",
    links: ["Why choose Intercom", "Safety & security", "ROI calculator", "Customer case studies"],
  },
  {
    title: "Company size",
    links: ["Early stage"],
  },
];

const Footer = () => (
  <footer className="w-full flex justify-center items-end py-4 px-2 bg-transparent animate-fade-in">
    <div className="w-full max-w-screen-xl rounded-xl backdrop-blur-md bg-white/80 md:bg-white/60 shadow-lg p-4 md:p-8 flex flex-col gap-6 border border-white/30">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 w-full max-w-full">
        {columns.slice(0, 6).map((col, i) => (
          <div key={col.title} className="col-span-1 min-w-[140px]">
            <div className="font-bold text-gray-900 mb-2">{col.title}</div>
            <ul className="space-y-1">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-800 md:text-gray-700 hover:underline text-sm transition-transform duration-150 flex items-center gap-1 hover:scale-105">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer; 