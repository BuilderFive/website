/**
 * This file contains all of the sidebars (components on the right of the screen)
 */

import { UUID } from "crypto";
import { ReactNode } from "react";
import { JsxElement } from "typescript";
import Biography from "./biography";
import Projects from "./projects";


export const SideBarProfile = () => {
    return (
        <SideBarProfileTemplate>
          <Biography/>
          <Projects/>
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
}

export const profile_other = () => {

}

export const logger = (viewingWork?: UUID, currentWork?: UUID) => {

}

export const logger_other = (viewingWork?: UUID) => {

}

interface RootProps {
    children?: ReactNode
    // any props that come into the component for future
}
export const SideBarRoot = ({children, ...props}: RootProps) => {
    return (
        <div className="z-10 flex flex-col items-center pb-20 bg-primary-300 w-fit h-full min-h-screen" {...props}>
            {children}
        </div>
      );
}

export const SideBarProfileTemplate = ({children, ...props}: RootProps) => {
    return (
        <SideBarRoot>
            <header className="self-stretch w-full bg-neutral-300 h-[150px]"/>

            {/**This needs to be replaced with an actual avatar icon, not an image */}
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c81bfa4d44eebdf16d353193e4476403a48eedc520f2194ae32665b6b7948fa?apiKey=2f9dd5fc40c1433bb238bffdc3e08217&" alt="User Avatar" className="absolute z-10 mt-[48px] aspect-square w-[150px]" />
            
            <div className="p-[12px] items-center flex flex-col space-y-[18px] mt-[54px]" {...props}>
                {children}
            </div>
        </SideBarRoot>
      );
}