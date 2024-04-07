// import GoogleForm from "@/components/GoogleForm";
// import React from "react";

// export default function Free() {
//   // Your code here

//   return (
//     <GoogleForm googleLink="https://docs.google.com/forms/d/e/1FAIpQLSeSTAoiEjIi2eBhMZfsMTdSTQoj8xQmI0FsqWCX-0gpW29Ixw/viewform?embedded=true" />
//   );
// }

"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Premium() {
  const { supabase } = useSession();
  const [email, setEmail] = useState("");
  const [count, setRealCount] = useState(0);

  const handleInsert = async () => {
    const verifyEmail = () => {
      if (email === "") {
        toast.error("Email cannot be empty!");
        return false;
      }
      return true;
    };
    if (!verifyEmail()) return;
    try {
      const { data, error } = await supabase.from("rsvp").insert([{ email }]);
      if (error) {
        toast.error("Already registered!");
      } else {
        toast.success("Registered!");
        setEmail("");
      }
    } catch (error) {
      toast.error("Error registering!");
    }
  };

  const fetchRSVPCount = async () => {
    const { error, count } = await supabase
      .from("rsvp")
      .select("*", { count: "exact" });
    if (error) {
      return;
    } else {
      if (count != null) {
        if (count >= 100) {
          setRealCount(0);
        }
        setRealCount(100 - count);
      }
    }
  };
  fetchRSVPCount();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Cohort Full</h1>
          <p className="py-6">
            Put your information here to be on the waiting list. We will notify you when positions open up
          </p>

          <div className="mb-4 flex flex-col gap-[8px] mx-[24px]">
            <p className="self-start flex text-lg font-black text-primary-300">
              {/* * {count == 0 ? "loading" : count}/200 spots left */}
            </p>
            <form action={handleInsert}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                type="email"
                className="py-2 px-3 shadow-lg text-black w-64 rounded-s-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
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
          </div>
          <Link
            href="/free"
            className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
          >
            Also fill out the free version in the meantime (click me)
          </Link>
        </div>
      </div>
    </div>
  );
}
