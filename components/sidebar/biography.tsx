"use client";

import React, { Dispatch, SetStateAction, use, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { EditDescription } from "./client/edit-biography";
import { useSession } from "@/utils/hooks/SessionContext";
import Avatar from "react-avatar";

export default function Biography() {
  const { uuid, display_name, username, bio } = useSession().profile.account;

  const Header = () => {
    return (
      <div className="flex flex-row pb-3 border-b border-solid border-primary-300 font-extrabold">
        <div className="flex self-start">
          <Avatar name={username} googleId="118096717852922241760" size="50" />
          <div className="m-1">{display_name}</div>
        </div>
        <div className="mt-1 text-xs font-regular text-text-100">
          {username}
          <div className="justify-end text-xs">
            <span className="text-xxs font-medium">Member Since </span> <br />
            <span className="text-xxs font-light">March 10, 2024</span>
          </div>
        </div>
      </div>
    );
  };
  const Description = () => {
    return (
      <div className="mt-2 font-light text-xs text-text-100">
        <EditDescription bio={bio} />
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
