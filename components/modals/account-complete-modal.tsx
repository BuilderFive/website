"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserNotFoundModal = () => {
  const { profile, supabase, user, isLoading } = useSession();
  const [username, setUsername] = useState("");
  const [display_name, setDisplayName] = useState("");

  //this should be a session context method!!!
  async function createAccount() {
    try {
      // grab the username from the modal

      // insert the account into supabase
      const { data, error } = await supabase
        .from("account")
        .insert([{ username, display_name, uuid: user?.id }]).select("*"). single(); 

      if (error) {
        toast.error(error.message);
        toast.error("Only lowercase alphanumeric or username already exists");
      } else {
        toast.success("Account created successfully");
        profile.saveAccount(data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {!isLoading.account ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex flex-col items-center justify-center h-full text-black">
              <h1 className="text-2xl font-bold">
                Finish Setting Up Your Account
              </h1>
              <p className="text-lg">Give us a username</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text-lg">Give us a displayed name</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <button
                className="bg-primary-100 px-5 py-2 rounded-md mt-5"
                onClick={() => createAccount()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
