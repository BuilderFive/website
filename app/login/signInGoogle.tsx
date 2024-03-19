"use client";

import { useSession } from "@/utils/hooks/SessionContext";
import React, { use } from "react";
import { toast } from "react-toastify";

export default function SignInGoogle() {
  const { user, session, supabase } = useSession();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: {
      //   queryParams: {
      //     access_type: "offline",
      //     prompt: "consent",
      //   },
      // },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Success");
    }

    // use the token to get more information about the user
    // https://supabase.com/docs/guides/auth/social-login/auth-google
  }

  return (
    <div
      className="flex items-center justify-center dark:bg-gray-800"
      onClick={signInWithGoogle}
    >
      <button className="px-4 py-3 flex gap-2 text-slate-700 dark:text-slate-200">
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
}
