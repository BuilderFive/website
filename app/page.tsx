"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SocialButtons from "@/components/SocialButtons";
import { Router } from "next/router";
import { FaHome } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { FaRocket } from "react-icons/fa";
import { useIsMobile } from "@/utils/hooks/Helper";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Index() {
  return (
    <div className="size-full relative flex flex-col">
      
      <Header />

      <Background>
        <Hero />
      </Background>

      <SocialButtons />
    </div>
  );
}

/**
 * Header component
 * @returns
 */
const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const [menuOpened, setOpenMenu] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full fixed top-0 z-10 ${!isTop && "shadow-md bg-background"} h-[64px] flex flex-col justify-center`}>
      <div className="flex flex-row justify-between mx-[24px] items-center">
        <h1 className={`text-3xl font-bold ${isTop ? "text-text-100" : "text-primary-100"} ${isMobile && "text-xl"}`}>
          BuilderFive
        </h1>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {isMobile ? (
          <div className="flex flex-row items-center gap-x-[2rem]">
            <button onClick={()=>router.push("/events")} type="button" className="text-lg py-[2px] px-[4px] justify-center rounded-md no-underline text-text-100 hover:text-text-200 font-bold items-center"><MdEvent/></button>
            <button onClick={()=>router.push("/features")} type="button" className="text-lg py-[2px] px-[4px] justify-center rounded-md no-underline text-text-100 hover:text-text-200 font-bold items-center"><FaRocket/></button>
          </div>
        ) : (
          <div className="flex gap-x-[2rem]">
            <button onClick={()=>router.push("/events")} type="button" className="text-lg py-[2px] px-[4px] justify-center rounded-md no-underline text-text-100 hover:text-text-200 font-bold gap-x-[8px] flex flex-row items-center"><MdEvent/>Events</button>
            <button onClick={()=>router.push("/features")} type="button" className="text-lg py-[2px] px-[4px] justify-center rounded-md no-underline text-text-100 hover:text-text-200 font-bold gap-x-[8px] flex flex-row items-center"><FaRocket/>Features</button>
          </div>
        )}
        
      </div>
    </div>
  );
};

/**
 * Opaque picture of a group of people networking and animated background
 */
const Background = ({ children }: any) => {
  return (
    <div className="bg-cover bg-no-repeat bg-[url('/wave.svg')]">
        {children}        
    </div>
  );
}

const Hero = () => {
  const { supabase, rsvpCount, insertRSVP } = useSession();
  const [email, setEmail] = useState("");
  const isMobile = useIsMobile();

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center mt-[4rem]">
      <div className="text-center flex flex-col items-center px-[2rem]">
        <h1 className={`text-[3rem] font-bold mb-4 ${isMobile && "text-[30px]"}`}>
          Connect with local <br />
          Entrereneurs on campus <br />
        </h1>
        <p className={`text-[2rem] max-w-[560px] mb-8 ${isMobile && "text-[24px]"}`}>
          Attend weekly networking events and mark your project's updates by location on your campus map
        </p>
        <div className="mb-4 flex flex-col gap-[8px] mx-[24px]">
          <div className="p-[12px] rounded-md bg-white">
            <p className="self-start flex text-lg font-black text-primary-300">
              {rsvpCount}/200 spots left
            </p>
            <form action={()=>insertRSVP(email)}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                type="email"
                className="py-2 px-3 shadow-lg text-black w-64 rounded-s-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="bg-primary-300 hover:text-primary-200 rounded-e-md text-text-1 font-bold py-2 px-5 shadow-lg"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevealOnScroll = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onWindScroll = () => {
      const element = ref.current;
      if (element) {
        const { top } = element.getBoundingClientRect();
        const isVisible = top < window.innerHeight;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", onWindScroll);
    return () => {
      window.removeEventListener("scroll", onWindScroll);
    };
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
};
