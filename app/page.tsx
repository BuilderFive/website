"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SocialButtons from "@/components/SocialButtons";

export default function Index() {
  return (
    <div className="size-full relative flex flex-col overflow-x-hidden overflow-y-hidden">
      {/* Header */}
      <div style={{ zIndex: 1000 }}>
        <Header />
      </div>
      {/* Background */}
      <div className="bg-cover" style={{ backgroundImage: 'url("/map.jpg")' }}>
        {/* Hero */}
        <Hero />
      </div>
      <SocialButtons />
    </div>
  );
}

/**
 * Header component
 * @returns
 */
const Header = () => {
  const { user, logout } = useSession();
  const [isTop, setIsTop] = useState(true);

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
      className={`w-full fixed top-0 z-10 ${
        isTop ? "transparent" : "bg-primary-300 shadow-lg"
      } h-[64px] flex flex-col justify-center`}
    >
      <div className="flex flex-row justify-between mx-[24px] items-center">
        <h1
          className={`text-3xl font-bold ${
            isTop ? "text-text-100" : "text-primary-100"
          }`}
        >
          {/* Innov8rs.io */} BuilderFive
        </h1>

        {/* Spacer */}
        <div className="flex-grow"></div>
        {/* Button */}
        <a href="/newsletter">
        <button className="text-sm text-primary-100 py-2 px-4 justify-center rounded-md no-underline bg-primary-300 hover:text-primary-200 font-bold">Newsletter</button>
        </a>
      </div>
    </div>
  );
};

const Hero = () => {
  const { supabase, rsvpCount, insertRSVP } = useSession();
  const [email, setEmail] = useState("");

  return (
    <div className="bg-black bg-opacity-70 min-h-screen flex justify-center items-center">
      <div className="text-center text-white flex flex-col items-center mt-[4rem]">
        <h1 className="text-[3rem] font-bold mb-4">
          Share Projects <br />
          Meet Innovators <br />
          Join the Community
        </h1>
        <p className="text-[2rem] max-w-[480px] mb-8">
          Meet with local like-minded innovators on your campus in person
        </p>
        {/* <div className="mb-4 flex flex-col gap-[8px] mx-[24px]">
          <div className="p-[12px] rounded-md bg-white">
            <p className="self-start flex text-lg font-black text-primary-300">
              * {count == 0 ? "loading" : count}/200 spots left
            </p>
            <form action={handleInsert}>
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
                className="bg-primary-300 hover:text-primary-200 rounded-e-md text-white font-bold py-2 px-5 shadow-lg"
              >
                SIGN UP
              </button>
            </form>
          </div> */}

        {/* <div className="mt-[12px]">
            <p className="text-bold">Got invited?</p>
            <input
              type="email"
              className="py-2 px-3 shadow-lg text-black w-64 rounded-s-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your access code"
            />
            <button className="bg-primary-200 hover:text-primary-100 rounded-e-md text-white font-bold py-2 px-5 shadow-lg">
              SUBMIT
            </button>
          </div> */}
        {/* </div> */}
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

  const classes = `transition-opacity duration-1000
      ${isVisible ? "opacity-100" : "opacity-0"}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};
