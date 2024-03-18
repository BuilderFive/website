"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthProvider from "./auth/auth-provider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Index() {
  const { supabase } = useSession();
  const [email, setEmail] = useState("");

  const handleInsert = async () => {
    const verifyEmail = () => {
      if (email === "") {
        toast.error("Email cannot be empty!");
        return false;
      }
      return true;
    }
    if (!verifyEmail()) return;
    try {
      const { data, error } = await supabase.from("rsvp").insert([{ email }]);
      if (error) {
        toast.error("Already registered!");
      } else {
        toast.success("Registered!");
      }
    } catch (error) {
      toast.error("Error registering!");
    }
  };

  return (
    <div className="size-full relative flex flex-col">
      {/* Header */}
      <Header/>

      {/* Background */}
      <div className="bg-cover"
        style={{ backgroundImage: 'url("/map.jpg")' }}>

        {/* Hero */}
        <Hero/>
      </div>
      
      <Detials/>
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


  /**
   * Logic for what to display in the header
   * @returns 
   */
  const AccountComponent = () => {
    return user ? (
      <AuthProvider>
        <div className="flex flex-row gap-[12px]">
          {/* Signed in */}
          <Link
            href="/test"
            className="text-sm text-primary-200 py-2 px-4 justify-center rounded-md no-underline bg-transparent border-primary-200 border hover:text-primary-100">
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="text-sm text-primary-300 py-2 px-4 justify-center rounded-md no-underline bg-primary-200 hover:text-primary-100">
            Logout
          </button>
        </div>
      </AuthProvider>
    ) : (
      <div>
        {/* Signed Out */}
        <Link href="/login"
          className="text-sm text-primary-100 top-8 py-2 px-4 justify-center rounded-md no-underline bg-primary-300 border border-white border-[2px] hover:border-primary-200">
          Login
        </Link>
      </div>
    )
  }

  
  return <div className={`w-full fixed top-0 z-10 ${isTop ? "transparent" : "bg-primary-300 shadow-lg"} h-[64px] flex flex-col justify-center`}>
    <div className="flex flex-row justify-between mx-[24px] items-center">
      <h1 className={`text-3xl font-bold ${isTop ? "text-primary-200" : "text-primary-100"}`}>Innov8rs.io</h1>
      <AccountComponent/>
    </div>
    
  </div>
}

const Hero = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex justify-center items-center">
      <div className="text-center text-white flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-4">Innov8rs.io</h1>
        <p className="text-2xl mb-8 max-w-[70%]">
          Pioneering the way for the next generation of innovators
        </p>
        <div className="mb-4">
          <input
            type="email"
            className="py-2 px-3 shadow-lg text-black w-64 rounded-s-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your email"
          />
          <button className="bg-primary-300 hover:text-primary-200 rounded-e-md text-white font-bold py-2 px-5 shadow-lg">
            SIGN UP
          </button>
        </div>
        <p className="text-2xl font-black text-primary-100">
          * FIRST 100 EMAILS GET ACCESS
        </p>
      </div>
    </div>
  );
}

const Detials = () => {
    return (
      <div id="details-root" className="w-full px-[128px] py-[64px]">
        <div id="details-container" className="mx-auto border">
          <div id="details-students" className="">

          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Students */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Students</h2>
              <ul>
                <li>Student 1</li>
                <li>Student 2</li>
                <li>Student 3</li>
                {/* Add more students here */}
              </ul>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Departments</h2>
              <ul>
                <li>Department 1</li>
                <li>Department 2</li>
                <li>Department 3</li>
                {/* Add more departments here */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}