"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserNotFoundModal = () => {
  const session_info: { user: any; session: any; supabase: any } = useSession();

  const { user, session, supabase } = session_info;

  const [accountExists, setAccountExists] = useState(true);
  const [username, setUsername] = useState("");

  async function createAccount() {
    try {
      // grab the username from the modal

      // insert the account into supabase
      const { data, error } = await supabase
        .from("account")
        .insert([{ username, uuid: user.id }]);

      if (error) {
        toast("Only lowercase alphanumeric or username already exists");
      } else {
        toast("Account created successfully");
        setAccountExists(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        // wait for the user to load
        if (!user) {
          return;
        }

        // get the information for the user
        const { data: account, error } = await supabase
          .from("account")
          .select("*")
          .eq("uuid", user.id);

        if (error) {
          throw new Error(error.message);
        }

        console.log(account);

        if (!account || account.length === 0) {
          setAccountExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccount();
  }, [supabase, user]);

  return (
    <div>
      {accountExists ? null : (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex flex-col items-center justify-center h-full text-black">
              <h1 className="text-4xl font-bold">
                Finish Setting Up Your Account
              </h1>
              <p className="text-lg">Give us a username</p>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className="bg-primary-100 px-5 py-2 rounded-md mt-5"
                onClick={() => createAccount()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
