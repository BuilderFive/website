import React from "react";
import Biography from "./biography";
import { SideBarProfileTemplate } from "./sidebars";

interface ProjectCardProps {
  imgSrc: string;
  altText: string;
  title: string;
  updates: number;
}

const ProjectCard = ({ imgSrc, altText, title, updates }: ProjectCardProps) => (
  <div className="flex gap-1 py-2.5 pr-14 mt-2 whitespace-nowrap bg-primary-100 rounded-lg shadow-sm">
    <img loading="lazy" src={imgSrc} alt={altText} className="shrink-0 my-auto w-4 aspect-square" />
    <div className="flex flex-col flex-1 justify-center">
      <div className="text-xs font-semibold">{title}</div>
      <div className="mt-1 text-xs">Updated {updates} times</div>
    </div>
  </div>
);

const UserProfile = () => {
  const projects = [
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/598177ccaf8683fb4afec7ade358481407f58390dec016067eb6b3341f227ed9?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&", title: "Campus Project", updates: 12, altText: "Project Thumbnail" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7bc2356001db94bbc33030ce7cfe555dbbb838b8a0dda81b537a23563131a4c?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&", title: "Menumizer App", updates: 71, altText: "Menumizer App Thumbnail" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c058ca46b2e9d0db3725cbb9050dc3793fc6a0505e594185eafcde692cdddb8?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&", title: "GoalTac", updates: 329, altText: "GoalTac Thumbnail" },
  ];

  return (
    <SideBarProfileTemplate>
      <Biography/>
      <section className="flex flex-col px-1.5 pt-4 pb-2 mt-5 w-full bg-primary-200 rounded-lg max-w-[180px] text-slate-500">
        <div className="self-start text-base font-extrabold text-white whitespace-nowrap"> Projects & Ideas </div>
        <div className="self-start mt-1 text-xs text-white">Active: {projects.length}</div>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
        <div className="justify-center px-5 py-5 mt-1 text-xs font-medium whitespace-nowrap bg-primary-100 rounded-lg shadow-sm">
          Type here to create...
        </div>
      </section>
      <section className="flex flex-col px-2 pt-4 pb-2 mt-5 w-full text-white whitespace-nowrap bg-primary-200 rounded-lg max-w-[180px]">
        <div className="text-base font-extrabold">Options</div>
        <div className="flex gap-1 py-1 mt-2 text-xs font-semibold rounded-lg shadow-sm">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c68c1d0dddf6eb53555cd71f2ee7919c0dc77559a0ca0b3db559d97156219e6?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&" alt="Settings Icon" className="shrink-0 w-4 aspect-square" />
          <div className="flex gap-1 self-start">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e971a656a8cb5bc9190e79073d09f45b51ead171fc7c877f3df9046a91f6f9?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&" alt="Online Status" className="shrink-0 my-auto w-3 aspect-square fill-activity-online stroke-[1px] stroke-slate-500" />
            <div className="flex-auto">Online</div>
          </div>
        </div>
      </section>
    </SideBarProfileTemplate>
  );
};

export default UserProfile;