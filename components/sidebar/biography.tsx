"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { EditDescription } from "./client/edit-biography";
import { useSession } from "@/utils/hooks/SessionContext";
import Avatar from "react-avatar";

interface Person {
  avatar_url: string | null;
  bio: string;
  created_at: string;
  display_name: string;
  email: string | null;
  first_name: string | null;
  last_joined: string;
  last_name: string | null;
  updated_at: string | null;
  username: string;
  uuid: string;
}

export default function Biography() {
  const [person, setPerson] = useState(
    useSession().profile.account as unknown as Person[]
  );

  console.log(person);

  const Header = () => {
    return (
      <div className="flex flex-row font-extrabold">
        <div className="flex self-start">
          <Avatar
            name={person[0].username}
            src={person[0].avatar_url || ""}
            size="50"
          />
        </div>
        <div className="mt-1 text-xxs font-regular text-text-100 px-2">
          {person[0].username}
          <div className="">
            {person[0].first_name + " " + person[0].last_name}
          </div>
          {/* <div className="justify-end text-xs">
            <span className="text-xxxs font-medium">Member Since </span> <br />
            <span className="text-xxs font-light">March 10, 2024</span>
          </div> */}
        </div>
      </div>
    );
  };
  const Description = () => {
    return (
      <div className="mt-2 font-light text-xs text-text-100">
        <EditDescription bio={person[0].bio} />
      </div>
    );
  };

  return (
    <section className="flex flex-col px-2 py-2 w-full text-text-100 bg-primary-200 rounded-lg max-w-[180px]">
      <Header />
      <Description />
    </section>
  );
}
